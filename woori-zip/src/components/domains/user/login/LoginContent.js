'use client'

import React, { useState } from 'react';
import { handleCredentialsSignin } from '@/app/actions/authActions';

function LoginContent({ setRedirectUrl }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleWooriBankLogin = (e) => {
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

  const handleWoorizipLogin = async () => {
    try {
      await handleCredentialsSignin({ username, password });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div>
        <h3>WooriBank Login</h3>
        <button onClick={handleWooriBankLogin}>Login with WooriBank</button>
      </div>
      <div>
        <h3>Woorizip Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleWoorizipLogin}>Login with Woorizip</button>
      </div>
    </div>
  );
}

export default LoginContent;
