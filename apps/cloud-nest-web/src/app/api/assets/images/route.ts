import { NextRequest } from 'next/server';
import MinIOService from '@/services/minio.service';
import { OSS_ADMIN_BUCKET_NAME, PERMISSIONS } from '@/config';
import { AppResponse, ResponseCode } from '@/utils/app-response';
import authGuard from '@/utils/auth-guard';

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest) {
  const [errResp] = await authGuard(req, [PERMISSIONS.OSS_MANAGE]);
  if (errResp) return errResp.json();
  const respBody = await new Promise((resolve) => {
    const result = [] as any[];
    MinIOService.client
      .listObjectsV2(OSS_ADMIN_BUCKET_NAME, 'images', true)
      .on('data', async (data) => {
        result.push(data);
      })
      .on('end', async () => {
        const promiseTask = result.map(async (item) => {
          const url = await MinIOService.client.presignedGetObject(OSS_ADMIN_BUCKET_NAME, item.name);
          return {
            ...item,
            url,
          };
        });
        resolve(new AppResponse(await Promise.all(promiseTask)).toJson());
      })
      .on('error', (err) => {
        resolve(new AppResponse(null, ResponseCode.ERROR, err.message).toJson());
      });
  });
  return Response.json(respBody);
}
