'use client'

import React, { useEffect, useState } from 'react';
import LoginIntro from '@/components/domains/user/login/LoginIntro';
import LoginContent from '@/components/domains/user/login/LoginContent';

function LoginPage() {
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    if (redirectUrl) {
      console.log('Redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <LoginIntro>
      <LoginContent setRedirectUrl={setRedirectUrl} />
    </LoginIntro>
  );
}

export default LoginPage;
