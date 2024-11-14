"use client";

import Image from 'next/image';
import styles from './BankLoginPage.module.css';

function BankLoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Image className={styles.Image}
          src="/images/bankLogo.png" alt="Logo" width={110} height={30}
        />
        <p className=''>금융 데이터 분석을 위해<br />우리은행 데이터와 간편 연결하기</p>
        <button className={styles.loginButton}>우리은행으로 로그인</button>
      </div>
    </div>
  )
}

export default BankLoginPage
