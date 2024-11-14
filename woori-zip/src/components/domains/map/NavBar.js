// components/NavBar.js
import React, { useRef, useState } from 'react';
import CategoryMenu from './CategoryMenu';
import styles from '../map/NavBar.module.css';

export default function NavBar() {
    const [isCategoryVisible, setCategoryVisible] = useState(false); // 카테고리 메뉴 상태
    const categoryButtonRef = useRef(null);

    const toggleCategoryVisibility = () => {
        setCategoryVisible((prev) => !prev);
    };

    return (
        <div className={styles.navBar}>
            {/* 웹 버전: 필터 드롭다운 메뉴와 카테고리 버튼 */}
            <div className={styles.webNav}>
                <select className={styles.filterSelect}>
                    <option>월세, 전세</option>
                </select>
                <select className={styles.filterSelect}>
                    <option>거래 금액</option>
                </select>
                <select className={styles.filterSelect}>
                    <option>관리비</option>
                </select>
                <button
                    ref={categoryButtonRef}
                    onClick={toggleCategoryVisibility} // 카테고리 버튼 클릭 시 상태 변경
                    className={styles.categoryButton}
                >
                    카테고리 ▼
                </button>
                <button className={styles.applyButton}>적용</button>
            </div>

            {/* 모바일 버전: 필터 설정 버튼 */}
            <button className={styles.mobileFilterButton} onClick={toggleCategoryVisibility}>
                필터 설정하기
            </button>

            {/* 모바일과 웹 모두에서 카테고리 메뉴를 한 번만 렌더링 */}
            {isCategoryVisible && (
                <CategoryMenu
                    isVisible={isCategoryVisible}
                    onClose={toggleCategoryVisibility} // 카테고리 메뉴의 닫기 버튼 핸들러
                    buttonRef={categoryButtonRef}
                />
            )}
        </div>
    );
}
