'use server'

import { instance } from "./instance";

export const signIn = async ({ username, password }) => {
    const response = await instance('sign-in', {
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      method: 'POST',
    });
  
    if (response.error) {
      console.error('SignIn error:', response.error);
      throw new Error('Failed to SignIn');
    }
  
    const { accessToken, cookie } = response;
    // const refreshToken = cookie.split(';')[0].split('=')[1];

    const refreshToken = 'refreshToken';
    return { accessToken, refreshToken };
};

export const reissueToken = async (refresh_token) => {
  const response = await fetch(`http://localhost:8080/api/v1/reissue`, {
    headers: {
      Cookie: `refresh_token=${refresh_token}`,
    },
    method: 'POST',
  });

  if (!response.ok) {
    console.error('Token Expired');
    console.error('Fetch Error:', await response.json());
    console.error(response.status);
    return { error: 'Token Expired' };
  }

  const cookie = response.headers.get('Set-Cookie');
  const { accessToken } = await response.json();
  console.log('cookie', cookie);
  // const refreshToken = cookie?.split(';')[0].split('=')[1];

  return { accessToken, refreshToken };
};
