'use client';

import { useAuthStore } from "@/providers/auth-store";
import { getCasdoorSDK } from "@/stores/auth";
import { setCookie } from "@/utils";
import { useEffect } from "react"

export default function LoginCallback() {
  const { setToken, setUserInfo } = useAuthStore((state) => state);

  useEffect(() => {
    getCasdoorSDK().exchangeForAccessToken().then(async (res: any) => {
      if (res && res.access_token) {
        const userInfo = await getCasdoorSDK().getUserInfo(res.access_token);
        setCookie('access_token', res.access_token, {
          expiresIn: res.expires_in - 1000 * 30,
        });
        setCookie('refresh_token', res.refresh_token, {
          expiresIn: res.expires_in - 1000 * 30,
        });
        setToken({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
        setUserInfo(userInfo);
        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
          localStorage.removeItem('redirectPath');
          window.location.href = redirectPath;
        } else {
          window.location.href = '/';
        }
      }
    });
  }, []);

  return (
    <>
    waiting...
    </>
  )
}
