import { Languages } from "@/config";
import { MiddlewareCallback } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

const open_routes = ['/login', '/login-callback'];

export default function authMiddleware(req: NextRequest): MiddlewareCallback {
  const casdoorUserCookie = req.cookies.get('casdoorUser');
  let pathName = req.nextUrl.pathname;
  Languages.forEach((lng) => {
    pathName = pathName.replace(`/${lng}`, '');
  })
  //认证功能
  if (!casdoorUserCookie && !open_routes.includes(pathName)) {
    return () => NextResponse.redirect(new URL('/login', req.url));
  }
  return undefined;
}
