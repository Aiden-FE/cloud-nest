import { NextRequest, NextResponse } from 'next/server';
import authGuard from '@/utils/auth-guard';
import MinIOService from '@/services/minio.service';
import { OSS_ADMIN_BUCKET_NAME, PERMISSIONS } from '@/config';

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest) {
  authGuard(req, PERMISSIONS.OSS_MANAGE);
  const respBody = await new Promise((resolve) => {
    const result = [] as any[];
    MinIOService.client
      .listObjectsV2(OSS_ADMIN_BUCKET_NAME, 'images', true)
      .on('data', async (data) => {
        result.push(data);
      })
      .on('end', () => {
        resolve({
          code: 200,
          data: result,
          message: 'success',
        });
      })
      .on('error', (err) => {
        resolve({
          code: 500,
          data: null,
          message: err.message,
        });
      });
  });
  return Response.json(respBody);
}
