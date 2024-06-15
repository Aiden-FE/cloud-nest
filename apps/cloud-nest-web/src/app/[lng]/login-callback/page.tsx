'use client';

import { getCasdoorSDK } from "@/stores/auth";
import { setCookie } from "@/utils";
import { useEffect } from "react"

export default function LoginCallback() {
  useEffect(() => {
    getCasdoorSDK().exchangeForAccessToken().then(async (res: any) => {
      if (res && res.access_token) {
        const userInfo = await getCasdoorSDK().getUserInfo(res.access_token);
        console.log('Debug user info: ', userInfo);
        setCookie('casdoorUser', JSON.stringify(userInfo));
      }
    });
  }, []);

  return (
    <>
      登录成功
    </>
  )
}
