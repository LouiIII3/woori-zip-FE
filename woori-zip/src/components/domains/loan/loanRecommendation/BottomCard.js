"use client";
import React from 'react';
import styles from './BottomCard.module.css'; // CSS 모듈 임포트
import CardList from './CardList';

const BottomCard = () => {
  return (
    <div className={styles.fullBottomCard}>
      <div className={styles.bottomCard}>
        <h1 id={styles.bottomText}>OOO 님을 위한 다른 대출 상품이에요</h1>
        <CardList />
      </div>
    </div>
  );
};

export default BottomCard;
