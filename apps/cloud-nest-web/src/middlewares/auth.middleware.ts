import { Languages } from "@/config";
import { MiddlewareCallback } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

const open_routes = ['/login', '/login-callback'];

export default function authMiddleware(req: NextRequest): MiddlewareCallback {
  const access_token = req.cookies.get('access_token');
  let pathName = req.nextUrl.pathname;
  Languages.forEach((lng) => {
    pathName = pathName.replace(`/${lng}`, '');
  })
  //认证功能
  if (!access_token && !open_routes.includes(pathName)) {
    const url = new URL('/login', req.url);
    url.searchParams.set('redirectPath', req.url);
    return () => NextResponse.redirect(url);
  }
  return undefined;
}
