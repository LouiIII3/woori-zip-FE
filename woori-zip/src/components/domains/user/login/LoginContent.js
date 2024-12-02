'use client';

import { handleCredentialsSignin } from '@/app/actions/authActions';
import LoginIntro from './LoginIntro';
import React, { useEffect, useState } from 'react';

function LoginContent() {
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleWooriBankLogin = async (e) => {
    e.preventDefault();
    const responseType = process.env.NEXT_PUBLIC_RESPONSE_TYPE;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL;

    const params = new URLSearchParams({
      responseType,
      clientId,
      redirectUri,
    });

    setRedirectUrl(`http://localhost:8082/woori-bank/auth?${params.toString()}`);
  };

  const handleWoorizipLogin = async (username, password) => {
    return await handleCredentialsSignin({ username, password });
  };

  useEffect(() => {
    if (redirectUrl) {
      console.log('Redirecting to:', redirectUrl);
      window.location.href = redirectUrl; // 리다이렉트
    }
  }, [redirectUrl]);

  return (
    <LoginIntro
      handleWooriBankLogin={handleWooriBankLogin}
      handleWoorizipLogin={handleWoorizipLogin}
    />
  );
}

export default LoginContent;
