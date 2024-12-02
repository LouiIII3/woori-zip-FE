'use client';

import React, { useState, useEffect } from 'react';
import styles from './LoanView.module.css';

const LoanView = () => {
  const [recentLoans, setRecentLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadedLoans = JSON.parse(localStorage.getItem('recentLoans')) || [];
    if (loadedLoans.length > 0) {
      setRecentLoans(loadedLoans);
    } else {
      const dummyData = Array.from({ length: 19 }, (_, i) => ({
        id: i + 1,
        title: `대출 상품 ${i + 1}`,
        description: `이것은 대출 상품 ${i + 1}의 설명입니다.`,
        link: `https://example.com/loan/${i + 1}`,
      }));
      setRecentLoans(dummyData);
      localStorage.setItem('recentLoans', JSON.stringify(dummyData));
    }
  }, []);

  const totalPages = Math.ceil(recentLoans.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLoanClick = (link) => {
    window.location.href = link; // 대출 상세 페이지로 이동
  };

  const displayedLoans = recentLoans.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.gridContainer}>
          {displayedLoans.map((loan) => (
            <div
              key={loan.id}
              className={styles.loanCard}
              onClick={() => handleLoanClick(loan.link)}
            >
              <div className={styles.contentContainer}>
                <img
                  className={styles.loanImage}
                  src="https://via.placeholder.com/100"
                  alt="Loan Thumbnail"
                />
                <div className={styles.loanInfo}>
                  <h3 className={styles.title}>{loan.title}</h3>
                  <p className={styles.description}>{loan.description}</p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={`${styles.button} ${styles.modifyButton}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 이벤트 전파 방지
                    console.log(`수정: ${loan.id}`);
                  }}
                >
                  수정
                </button>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 이벤트 전파 방지
                    setRecentLoans((prevLoans) =>
                      prevLoans.filter((item) => item.id !== loan.id)
                    );
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.paginationBox}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`${styles.paginationButton} ${
              currentPage === index ? styles.active : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          disabled={currentPage >= totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default LoanView;