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
        setCookie('access_token', res.access_token);
        setCookie('refresh_token', res.refresh_token);
        setToken({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
        setUserInfo(userInfo);
      }
    });
  }, []);

  return (
    <>
    waiting...
    </>
  )
}
