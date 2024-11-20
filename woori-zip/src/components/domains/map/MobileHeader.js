import React, { useState } from "react";
import styles from "../map/MobileHeader.module.css";
import Link from "next/link";
import Image from "next/image";

export default function MobileHeader({ onFilterClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.mobileHeader}>
      {/* 왼쪽 영역: 필터 버튼 */}
      <div className={styles.filterContainer}>
        <button className={styles.filterButton} onClick={onFilterClick}>
          필터 설정하기
        </button>
      </div>

      {/* 오른쪽 영역: 햄버거 버튼과 드롭다운 메뉴 */}
      <div className={styles.menuContainer}>
        <button
          className={`${styles.hamburgerButton} ${
            isMenuOpen ? styles.active : ""
          }`}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* 드롭다운 메뉴 */}
        {isMenuOpen && (
          <div className={`${styles.dropdownMenu} ${styles.menuOpen}`}>
            <ul>
              <li>
                <Link href="/user/login" onClick={toggleMenu}>
                  <Image
                    src="/images/map/product-icon.png"
                    alt="로그인"
                    width={16}
                    height={16}
                  />
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/user/register" onClick={toggleMenu}>
                  <Image
                    src="/images/map/product-icon.png"
                    alt="회원가입"
                    width={16}
                    height={16}
                  />
                  회원가입
                </Link>
              </li>
              <li>
                <Link href="/mypage/bookmark" onClick={toggleMenu}>
                  <Image
                    src="/images/map/bookmark-icon.png"
                    alt="북마크 페이지"
                    width={16}
                    height={16}
                  />
                  북마크 페이지
                </Link>
              </li>
              <li>
                <Link href="/" onClick={toggleMenu}>
                  <Image
                    src="/images/map/bookmark-icon.png"
                    alt="메인 화면 가기"
                    width={16}
                    height={16}
                  />
                  메인 화면 가기
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
