import { NextRequest } from 'next/server';
import { AppResponse, ResponseCode } from '@/utils/app-response';
import MinIOService from '@/services/minio.service';
import { OSS_ADMIN_BUCKET_NAME } from '@/config';

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name');
  if (!name) {
    return new AppResponse(null, ResponseCode.ERROR, 'name is required').json();
  }
  const pUrl = await MinIOService.client.presignedGetObject(OSS_ADMIN_BUCKET_NAME, name);
  return Response.redirect(pUrl);
}
