import { NextRequest } from 'next/server';
import pick from 'lodash-es/pick';
import { AppResponse } from '@/utils/app-response';
import authGuard from '@/utils/auth-guard';
import { PERMISSIONS } from '@/config';

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest) {
  const [resp, userInfo] = await authGuard(req, PERMISSIONS.OSS_MANAGE);
  if (resp) return resp.json();
  return new AppResponse(
    pick(userInfo, ['name', 'id', 'createdTime', 'displayName', 'avatar', 'homepage', 'gender', 'exp']),
  ).json();
}
