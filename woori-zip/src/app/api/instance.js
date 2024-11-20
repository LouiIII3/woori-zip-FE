'use server';

import { auth } from "@/auth";
import { cookies } from 'next/headers'; // 서버 사이드에서 쿠키를 처리하기 위한 내장 모듈

// interface RequestOptions {
//   headers?: Record<string, string>;
//   isMultipart?: boolean; // 멀티파트 여부를 나타내는 속성 추가
//   body?: any; // 요청 본문에 대한 타입 정의
//   [key: string]: any; // 다른 속성 허용
// }

const fetchInstance = async (url, options) => {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  const headers = {
    ...options.headers,
  };

  // FormData인 경우 Content-Type 설정 제거
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 403) {
        console.error('Token Expired');
      }
      console.error('Fetch Error:', errorResponse);
      return response;
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;