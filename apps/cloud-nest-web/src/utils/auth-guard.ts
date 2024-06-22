import { NextRequest } from 'next/server';
import RedisService from '@/services/redis.service';
import { PERMISSIONS } from '@/config';

// 路由守卫
export default async function authGuard(
  req: NextRequest,
  permissions: PERMISSIONS | PERMISSIONS[],
  mode: 'all' | 'any' = 'all',
) {
  const accessToken = req.cookies.get('access_token');
  const userInfoCache = await RedisService.client.get(`token:${accessToken?.value}`);
  let userInfo;
  if (!userInfoCache) {
    // 根据token查询用户信息
  } else {
    userInfo = JSON.parse(userInfoCache);
  }
  const userPermissions = userInfo?.permissions || [];
  console.log('Debug: ', permissions, mode, userPermissions);
}
