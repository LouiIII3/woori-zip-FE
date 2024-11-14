import { NextResponse } from 'next/server';


// API 라우트는 서버 컴포넌트로 동작하며, NextResponse를 통해 응답을 반환할 수 있습니다.
export async function POST(request) {
  const { username, password } = await request.json();

  try {
    // 백엔드 로그인 API 호출
    const response = await fetch('http://localhost:8080/api/v1/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: '로그인 실패. 아이디와 비밀번호를 확인해주세요.' }, { status: 401 });
    }

    const data = await response.json();
    const { accessToken } = data;

    // Next.js의 NextResponse를 사용하여 서버 측 쿠키 설정
    const res = NextResponse.json({ message: '로그인 성공!' });
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
