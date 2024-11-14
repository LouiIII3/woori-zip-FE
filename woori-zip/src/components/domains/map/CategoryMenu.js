// components/CategoryMenu.js
import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from '../map/CategoryMenu.module.css';

export default function CategoryMenu({ isVisible, onClose, buttonRef }) {
    const menuRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
  
    useLayoutEffect(() => {
      if (buttonRef?.current && isVisible) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: buttonRect.bottom + 5, // 버튼 바로 아래 위치, 약간 간격 추가
          left: buttonRect.left -150,   // 버튼과 수평 정렬
        });
      }
    }, [isVisible, buttonRef]);
  
    if (!isVisible) return null;
  
    return (
      <div
        ref={menuRef}
        className={styles.menu}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h4 className={styles.menuTitle}>카테고리</h4>
          <span className={styles.menuDescription}>카테고리는 1가지만 선택 가능합니다.</span>
        </div>
        <div className={styles.options}>
          <button className={styles.optionButton}>선택하지 않음</button>
          <button className={styles.optionButton}>자동차정비/유지</button>
          <button className={styles.optionButton}>문화/취미</button>
          <button className={styles.optionButton}>서적/문구</button>
          <button className={styles.optionButton}>의류</button>
          <button className={styles.optionButton}>음식료품</button>
          <button className={styles.optionButton}>식당/카페</button>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>집에서부터 도보 거리</label>
          <div className={styles.inputFieldWrapper}>
            <input type="number" defaultValue="10" className={styles.inputField} />
            <span className={styles.unitLabel}>분</span>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>카테고리 시설 개수</label>
          <div className={styles.inputFieldWrapper}>
            <input type="number" defaultValue="3" className={styles.inputField} />
            <span className={styles.unitLabel}>개</span>
          </div>
        </div>
        <button className={styles.applyButton} onClick={onClose}>적용</button>
      </div>
    );
  }
