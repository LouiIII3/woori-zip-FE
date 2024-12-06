"use client";
import React, { useEffect, useState } from "react";
import styles from "./BottomCard.module.css";
import Link from "next/link";

const BottomCard = ({ loanRecommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    console.log('loanRecommendations:', loanRecommendations); 
  }, [loanRecommendations]);


  const convertLoanType = (type) => {
    switch(type) {
      case 'NATIONAL_HOUSING_URBAN_FUND':
        return '주택도시기금';
      case 'LEASE_LOAN':
        return '전세자금대출';
      default:
        return type;
    }
  };

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
  console.log(totalSlides);


  return (
    <div className={styles.fullBottomCard}>
    <div className={styles.bottomCard}>
      <h1 id={styles.bottomText}>
        {loanRecommendations && loanRecommendations.length > 0
          ? `추천하는 대출 상품 입니다.`
          : `적합한 대출 상품을 찾지 못했습니다.`}
      </h1>
      
      {loanRecommendations && loanRecommendations.length > 0 ? (
          <div className={styles.cardContainer}>
            {/* 슬라이드 표시 영역 */}
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
                      <div className={styles.loanType}>
                        {convertLoanType(visibleCard.loanType)}
                      </div>
                      <div className={styles.loanName}>{visibleCard.name}</div>
                      <div className={styles.loanSummary}>
                        <div className={styles.loanTextBox1}>
                          <span className={styles.loanTarget}>대출대상</span>
                          <div
                            className={styles.loanTargetText}
                            title={visibleCard.target}
                          >
                            {visibleCard.target}
                          </div>
                        </div>
                        <div className={styles.loanTextBox2}>
                          <span className={styles.loanDate}>대출기간</span>
                          <div
                            className={styles.loanDateText}
                            title={visibleCard.term}
                          >
                            {visibleCard.term}
                          </div>
                        </div>
                        <div className={styles.loanTextBox3}>
                          <span className={styles.loanLimitAmount}>
                            대출한도
                          </span>
                          <div
                            className={styles.loanLimitTextAmount}
                            title={visibleCard.limitAmount}
                          >
                            {visibleCard.limitAmount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.cardImage}
                        src={visibleCard.imageUrl || "https://via.placeholder.com/150"}
                        alt={`${visibleCard.name} 대출 상품`}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* 내비게이션 버튼 */}
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

            {/* 슬라이드 페이지네이션 */}
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
        ) : (
          <div className={styles.emptyState}>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomCard;
