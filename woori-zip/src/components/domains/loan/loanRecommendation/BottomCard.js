"use client";
import React, { useEffect, useState } from 'react';
import styles from './BottomCard.module.css'; 
import Link from "next/link"; 

const BottomCard = ({loanRecommendations}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!loanRecommendations || !Array.isArray(loanRecommendations)) {
    return <p>아이템이 비어있습니다</p>;
  }


  // 터치 이벤트 핸들러들
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    }
    if (distance < -50) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // 다음/이전 슬라이드 핸들러
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(loanRecommendations.length - 1, prevIndex + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  // 총 슬라이드 수 계산
  const totalSlides = loanRecommendations.length;

  // 현재 보여줄 카드만 선택
  const visibleCard = loanRecommendations[currentIndex];

  return (
    <div className={styles.fullBottomCard}>
      <div className={styles.bottomCard}>
        <h1 id={styles.bottomText}>OOO 님을 위한 다른 대출 상품이에요</h1>
        <div className={styles.cardContainer}>
          <div
            className={styles.cardSlider}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
        <div key={visibleCard.id} className={styles.cardItem}>
          <Link href={`/loan/loanDetail/${visibleCard.id}`}>
          <div className={styles.cardTopContent}>
            <div className={styles.cardContent}>
              <div className={styles.loanType}>전세자금대출</div>
              <div className={styles.loanName}>우리 청년 맞춤형 월세대출</div>
              <div className={styles.loanSummary}>
                <div className={styles.loanTextBox1}>
                  <span className={styles.loanTarget}>대출대상</span>
                  <div className={styles.loanTargetText} title="보증신청일 기준 민법상 성년으로 만 34세 이하인 무주택 세대주 또는 예비세대주 (월세보증금액이 1억원 이하, 월세금 70만원 이하)">
                    보증신청일 기준 민법상 성년으로 만 34세 이하인 무주택 세대주 또는 예비세대주 (월세보증금액이 1억원 이하, 월세금 70만원 이하)
                  </div>
                </div>
                <p></p>
                <div className={styles.loanTextBox2}>
                  <span className={styles.loanDate}>대출기간</span>
                  <div className={styles.loanDateText} title="최대 13년(거치기간 : 최대 8년, 분할상환기간 : 3년 또는 5년)">
                    최대 13년(거치기간 : 최대 8년, 분할상환기간 : 3년 또는 5년)
                  </div>
                </div>
                <p></p>
                <div className={styles.loanTextBox3}>
                  <span className={styles.loanLimit}>대출한도</span>
                  <div className={styles.loanLimitText} title="최대 12백만원(월 최대 50만원 이내 월세금 지급 예정금액 및 대환대출 금액 이내)">
                    최대 12백만원(월 최대 50만원 이내 월세금 지급 예정금액 및 대환대출 금액 이내)
                  </div >
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img
                className={styles.cardImage}
                src={visibleCard.image}
                alt={`Item ${visibleCard.id}`}
              />
            </div>
            </div>
          </Link>
        </div>
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className={`${styles.navButton} ${styles.prev}`}
              aria-label="이전 슬라이드"
            >
              ←
            </button>
          )}

          {currentIndex < loanRecommendations.length - 1 && (
            <button
              onClick={handleNext}
              className={`${styles.navButton} ${styles.next}`}
              aria-label="다음 슬라이드"
            >
              →
            </button>
          )}

          <div className={styles.pagination}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`${styles.dotButton} ${
                  currentIndex === index ? styles.active : ""
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCard;