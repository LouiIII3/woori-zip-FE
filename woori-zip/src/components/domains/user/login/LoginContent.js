'use client';

import React, { useEffect, useState } from 'react';
import LoginIntro from './LoginIntro';
import { useSearchParams } from 'next/navigation';
import { handleCredentialsSignin } from '@/app/actions/authActions';

function LoginContent() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const searchParams = useSearchParams();

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

    setRedirectUrl(`${process.env.NEXT_PUBLIC_API_BANK_URL}/auth?${params.toString()}`);
  };

  const handleWoorizipLogin = async (username, password) => {
    return await handleCredentialsSignin({username, password});
  };

  useEffect(() => {
    if (redirectUrl) {
      console.log('Redirecting to:', redirectUrl);
      window.location.href = redirectUrl; 
    }
  }, [redirectUrl]);

  return (
      <LoginIntro
        handleWooriBankLogin={handleWooriBankLogin}
        handleWoorizipLogin={handleWoorizipLogin}
        role={searchParams.get('role') || null}
      />
  );
}

export default LoginContent;
