import React, { useState, useEffect } from 'react';
import styles from './LoanView.module.css';

const LoanView = () => {
  const [recentLoans, setRecentLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 로드
    const loadedLoans = JSON.parse(localStorage.getItem('recentLoans')) || [];
    if (loadedLoans.length > 0) {
      setRecentLoans(loadedLoans);
    } else {
      // 로컬 스토리지에 데이터가 없으면 더미 데이터 생성
      const dummyData = Array(6).fill().map((_, index) => ({
        id: index + 1,
        title: 'iTouch 전세론 (주택금융보증)',
        description: '주택금융공사 주택신용보증서 담보(90% 보증)로 영업점 방문 없이 인터넷 상담 및 대출 실행이 가능한 전세 대출',
        link: `https://example.com/loan/${index + 1}`,
      }));
      setRecentLoans(dummyData);
      // 더미 데이터를 로컬 스토리지에 저장
      localStorage.setItem('recentLoans', JSON.stringify(dummyData));
    }
    setIsLoading(false);
  }, []);

  const saveLoan = (newLoan) => {
    const updatedLoans = [...recentLoans, newLoan];
    setRecentLoans(updatedLoans);
    localStorage.setItem('recentLoans', JSON.stringify(updatedLoans));
  };

  const deleteLoan = (id) => {
    const updatedLoans = recentLoans.filter(loan => loan.id !== id);
    setRecentLoans(updatedLoans);
    localStorage.setItem('recentLoans', JSON.stringify(updatedLoans));
  };

  const handleCardClick = (link) => {
    window.location.href = link;
  };

  const handleButtonClick = (e, action, id) => {
    e.stopPropagation();
    if (action === 'delete') {
      deleteLoan(id);
    } else if (action === 'modify') {
      // 수정 로직 구현
      console.log(`Modify loan with id: ${id}`);
    }
  };

  if (isLoading) return null;

  if (!recentLoans || recentLoans.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          최근 본 대출 상품이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {recentLoans.map((loan) => (
          <div 
            key={loan.id} 
            className={styles.loanCard}
            onClick={() => handleCardClick(loan.link)}
          >
            <div className={styles.buttonContainer}>
              <button 
                className={`${styles.button} ${styles.modifyButton}`}
                onClick={(e) => handleButtonClick(e, 'modify', loan.id)}
              >
                수정
              </button>
              <button 
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={(e) => handleButtonClick(e, 'delete', loan.id)}
              >
                삭제
              </button>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.imageContainer}>
                <div className={styles.loanImage} />
              </div>
              <div className={styles.loanInfo}>
                <h3 className={styles.title}>{loan.title}</h3>
                <p className={styles.description}>{loan.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanView;