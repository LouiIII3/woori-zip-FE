"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // useRouter 훅 사용
import { useFormStatus } from "react-dom";
import styles from './LoginPage.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();  // useRouter 훅 사용

  // useEffect를 사용하여 클라이언트에서만 실행되도록 처리
  useEffect(() => {
    setIsClient(true);  // 클라이언트에서만 실행되도록 설정
  }, []);

  const handleLoginClick = async () => {
    if (isClient) {
      console.log("로그인 버튼 클릭");

      // 페이지 이동
      router.push('/');  // 루트 페이지로 이동

      // 페이지 이동 후 새로 고침을 추가 (setTimeout을 사용하여 1초 뒤에 새로 고침)
      setTimeout(() => {
        window.location.reload();  // 1초 뒤에 새로 고침
      }, 1000);  // 페이지 이동 후 새로 고침을 지연시킴
     
      //router.push('/'); 
    }
  };

  return (
    <button
      disabled={pending}
      type="submit"
      className={styles.loginButton}
      onClick={handleLoginClick}
    >
      로그인하기
    </button>
  );
}

export default SubmitButton;
