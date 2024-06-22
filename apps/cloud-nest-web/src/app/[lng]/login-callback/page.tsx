'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLoading from '@/components/app-loading/app-loading';
import { useAuthStore } from '@/providers/auth-store';
import { getCasdoorSDK } from '@/stores/auth';
import { setCookie } from '@/utils';
import { PageProps } from '@/interfaces';

export default function LoginCallback({ params: { lng } }: PageProps) {
  const { setToken, setUserInfo } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    getCasdoorSDK()
      .exchangeForAccessToken()
      .then(async (res: any) => {
        if (res?.access_token) {
          const userInfo = await getCasdoorSDK().getUserInfo(res.access_token);
          setCookie('access_token', res.access_token, {
            expiresIn: 1000 * 60 * 60 * 24 * 7 - 1000 * 30,
          });
          setCookie('refresh_token', res.refresh_token, {
            expiresIn: 1000 * 60 * 60 * 24 * 7 - 1000 * 30,
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
        } else if (res?.error) {
          router.push(
            `/${lng}/app-status?title=${encodeURIComponent(res.error)}&description=${encodeURIComponent(res.error_description || res.error)}`,
          );
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Debug: ', err);
      });
  }, [lng, router, setToken, setUserInfo]);

  return (
    <div className="w-full h-full">
      <AppLoading loadingProps={{ label: 'Login...' }} />
    </div>
  );
}
