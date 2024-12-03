'use client';

import React, { useEffect, useState } from 'react';
import LoginIntro from './LoginIntro';
import { useSearchParams } from 'next/navigation';

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

    setRedirectUrl(`http://localhost:8082/woori-bank/auth?${params.toString()}`);
  };

  const handleWoorizipLogin = async (username, password) => {
    // 가상의 로그인 API 호출 (리플레이스 필요)
    return { username, password };
  };

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // 리다이렉트
    }
  }, [redirectUrl]);

  return (
      <LoginIntro
        handleWooriBankLogin={handleWooriBankLogin}
        handleWoorizipLogin={handleWoorizipLogin}
        role={searchParams.get('role') || null} // role을 props로 전달
      />
  );
}

export default LoginContent;
