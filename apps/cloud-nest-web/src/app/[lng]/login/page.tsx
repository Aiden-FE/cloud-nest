'use client';

import { PageProps } from "@/interfaces";
import { getCasdoorSDK } from "@/stores/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
  }, []);

  return (
    <>
    </>
  )
}
