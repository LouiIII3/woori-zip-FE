import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* 왼쪽 끝에 로고 배치 */}
      <div className={styles.header_left}>
        <Link href="/" className={styles.header_title}>
          WOORI ZIP
        </Link>
      </div>
      
      {/* 오른쪽 끝에 회원가입 링크와 로그인 버튼 배치 */}
      <div>
        <Link href="/signup" className={styles.signup_link}>
          회원가입
        </Link>
        <button className={styles.login_button}>로그인</button>
      </div>
    </header>
  );
}