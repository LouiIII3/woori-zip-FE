'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/user/login'); // user/login 경로로 이동
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <Link href="/" className={styles.header_title}>
          WOORI ZIP
        </Link>
      </div>
      <div>
        <Link href="/user/register" className={styles.signup_link}>
          회원가입
        </Link>
        <button className={styles.login_button} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </header>
  );
}
