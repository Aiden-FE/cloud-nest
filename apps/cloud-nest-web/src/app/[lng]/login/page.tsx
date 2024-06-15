'use client';

import { PageProps } from "@/interfaces";
import { getCasdoorSDK } from "@/stores/auth";
import { useEffect } from "react";

export default function Login({ params: { lng } }: PageProps) {
  useEffect(() => {
    getCasdoorSDK({
      redirectPath: `/${lng}/login-callback`,
    }).signin_redirect();
  }, []);

  return (
    <>
    </>
  )
}
