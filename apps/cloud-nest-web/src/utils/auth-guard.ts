import { NextRequest } from 'next/server';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';
import { PERMISSIONS, REDIS_PREFIX } from '@/config';
import { casdoorServerSDK } from '@/stores/auth';
import RedisService from '@/services/redis.service';
import { AppResponse, ResponseCode } from './app-response';

// 路由守卫
export default async function authGuard(
  req: NextRequest,
  requiredPermissions: PERMISSIONS | PERMISSIONS[],
  mode: 'all' | 'any' = 'all',
): Promise<[AppResponse?, User?]> {
  const accessToken = req.cookies.get('access_token');
  if (!accessToken?.value) {
    return [new AppResponse(null, ResponseCode.UNAUTHORIZED)];
  }
  const userInfo = casdoorServerSDK.parseJwtToken(accessToken.value);
  const unixTime = Math.floor(Date.now() / 1000);
  // token 过期
  if (unixTime >= userInfo.exp) {
    req.cookies.delete('access_token');
    return [new AppResponse(null, ResponseCode.UNAUTHORIZED)];
  }
  let userPermissions: PERMISSIONS[] = [];
  // 从redis缓存中读取用户权限 五分钟有效期
  const cachePermissions = await RedisService.client.get(
    `${REDIS_PREFIX}PermissionsByUser:${userInfo.name}-${userInfo.id}`,
  );
  if (!cachePermissions) {
    const targetUserResp = await casdoorServerSDK.getUser(userInfo.name);
    // 找不到用户信息
    if (targetUserResp.status !== 200 || !targetUserResp.data?.data?.permissions?.length) {
      return [new AppResponse(null, ResponseCode.FORBIDDEN)];
    }
    userPermissions = targetUserResp.data.data.permissions
      .filter((item) => item.isEnabled && item.effect === 'Allow' && item.state === 'Approved')
      .map((item) => item.name);
    await RedisService.client.set(
      `${REDIS_PREFIX}PermissionsByUser:${userInfo.name}-${userInfo.id}`,
      JSON.stringify(userPermissions),
      'PX',
      1000 * 60 * 5,
    );
  } else {
    userPermissions = JSON.parse(cachePermissions);
  }
  if (!userPermissions || !userPermissions.length) {
    return [new AppResponse(null, ResponseCode.FORBIDDEN)];
  }
  const permissions: PERMISSIONS[] = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  let valid = false;
  if (mode === 'all') {
    valid = userPermissions.every((permission) => permissions.includes(permission));
  } else {
    valid = userPermissions.some((permission) => permissions.includes(permission));
  }
  return valid ? [undefined, userInfo] : [new AppResponse(null, ResponseCode.FORBIDDEN)];
}
