import { NextRequest, NextResponse } from 'next/server';
import { Languages } from '@/config';
import { MiddlewareCallback } from '@/interfaces';

const OPEN_ROUTES = ['/login', '/login-callback', '/app-status'];

export default async function authMiddleware(req: NextRequest): Promise<MiddlewareCallback> {
  const accessToken = req.cookies.get('access_token');
  let pathName = req.nextUrl.pathname;
  Languages.forEach((lng) => {
    pathName = pathName.replace(`/${lng}`, '');
  });
  // 认证功能
  if (!accessToken?.value && !OPEN_ROUTES.includes(pathName)) {
    const url = new URL('/login', req.url);
    url.searchParams.set('redirectPath', req.url);
    return () => NextResponse.redirect(url);
  }

  return undefined;
}
