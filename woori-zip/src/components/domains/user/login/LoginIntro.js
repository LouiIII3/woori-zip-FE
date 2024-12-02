'use client';

import React from 'react';
import styles from './LoginIntro.module.css';
import LoginAdminPage from './LoginAdminPage';

export default function LoginIntro({ handleWooriBankLogin, handleWoorizipLogin, role }) {
  const renderContent = () => {
    if (!role) {
      return <div>로딩 중...</div>; // role이 아직 설정되지 않은 경우 로딩 화면 표시
    }

    switch (role) {
      case '0': // 회원
        return (
          <div className={styles.loginContent}>
            <img
              className={styles.image}
              src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/bankLogo.png"
              alt="Logo"
              width={110}
              height={30}
            />
            <p className={styles.text}>
              금융 데이터 분석을 위해
              <br />
              우리은행 데이터와 간편 연결하기
            </p>
            <button className={styles.loginButton} onClick={handleWooriBankLogin}>
              우리은행으로 로그인
            </button>
          </div>
        );
      case '1': // 중개자
      case '2': // 관리자
        return (
          <div className={styles.loginContent}>
            <LoginAdminPage onLogin={handleWoorizipLogin} />
          </div>
        );
      default:
        return <div>유효하지 않은 역할입니다.</div>; // 유효하지 않은 role 값 처리
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.componentBox}>
        <div className={styles.disignSpace}></div>
        {renderContent()}
      </div>
    </div>
  );
}
