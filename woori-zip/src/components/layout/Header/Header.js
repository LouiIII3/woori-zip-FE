'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useSession, signOut, signIn } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut();
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  const handleProfileClick = () => {
    router.push('/mypage');
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('로그인 상태 확인:', data);
    }
  }, [status, data]);

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link href="/" className={styles.header_title}>
          WOORI ZIP
        </Link>
      </div>
      <div className={styles.header_right}>
        {status === 'loading' ? (
          <div></div>
        ) : data?.user ? (
          <div className={styles.profile_menu}>
            <img
              src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/profile.png"
              alt="Profile"
              className={styles.profile_image}
              onClick={toggleDropdown} // Toggle dropdown on click
            />
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdown_header}>
                  <img
                    src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/profile.png"
                    alt="Profile"
                    className={styles.dropdown_profile_image}
                  />
                  <span className={styles.dropdown_user_name}>
                    {data.user.name} 님
                  </span>
                </div>
                <hr className={styles.dropdown_divider} />
                <div
                  className={styles.dropdown_item}
                  onClick={handleProfileClick}
                >
                  마이페이지
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={handleLogout}
                >
                  로그아웃
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link href="/user/signup" className={styles.signup_link}>
              회원가입
            </Link>
            <button
              className={styles.login_button}
              onClick={() => {
                signIn().then(() => router.push('/')); // 로그인 후 세션 갱신 및 이동
              }}
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
