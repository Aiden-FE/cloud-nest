'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import AppLoading from '@/components/app-loading/app-loading';
import { PageProps } from '@/interfaces';
import { getCasdoorSDK } from '@/stores/auth';

export default function Login({ params: { lng } }: PageProps) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirectPath');

  useEffect(() => {
    if (redirectPath) {
      localStorage.setItem('redirectPath', redirectPath);
    }
    getCasdoorSDK({
      redirectPath: `/${lng}/login-callback`,
    }).signin_redirect();
  }, [lng, redirectPath]);

  return (
    <div className="w-full h-full">
      <AppLoading loadingProps={{ label: 'Login...' }} />
    </div>
  );
}
