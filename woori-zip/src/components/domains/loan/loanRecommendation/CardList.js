"use client";
import React, { useState } from "react";
import "./CardList.css";

const dummyData = [
  { id: 1, image: "/api/placeholder/300/200?text=Item+1" },
  { id: 2, image: "/api/placeholder/300/200?text=Item+2" },
  { id: 3, image: "/api/placeholder/300/200?text=Item+3" },
  { id: 4, image: "/api/placeholder/300/200?text=Item+4" },
  { id: 5, image: "/api/placeholder/300/200?text=Item+5" },
  { id: 6, image: "/api/placeholder/300/200?text=Item+6" },
];

const CardList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
      Math.min(dummyData.length - 2, prevIndex + 2)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  // 총 슬라이드 수 계산
  const totalSlides = Math.ceil(dummyData.length / 2);

  // 현재 보여줄 카드들만 선택
  const visibleCards = dummyData.slice(currentIndex, currentIndex + 2);

  return (
    <div className="card-container">
      <div
        className="card-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {visibleCards.map((item) => (
          <div key={item.id} className="card-item">
            <div className="image-container">
              <img
                className="card-image"
                src={item.image}
                alt={`Item ${item.id}`}
              />
            </div>
            <div className="card-content">
              <button className="detail-button">상세보기</button>
            </div>
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="nav-button prev"
          aria-label="이전 슬라이드"
        >
          ←
        </button>
      )}
      
      {currentIndex < dummyData.length - 2 && (
        <button
          onClick={handleNext}
          className="nav-button next"
          aria-label="다음 슬라이드"
        >
          →
        </button>
      )}

      <div className="pagination">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 2)}
            className={`dot-button ${currentIndex / 2 === index ? 'active' : ''}`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;