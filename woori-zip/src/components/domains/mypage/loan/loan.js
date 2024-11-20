'use client';

import { useState, useEffect } from 'react';
import styles from './loan.module.css';

export default function Loan() {
  const [recentLoans, setRecentLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const dummyData = Array(4).fill().map((_, index) => ({
        id: index + 1,
        title: 'iTouch 전세론 (주택금융보증)',
        description: '주택금융공사 주택신용보증서 담보(90% 보증)로 영업점 방문없이 인터넷 상담 및 대출 실행이 가능한 전세 대출',
        badge: index === 0 ? '혜택' : null
      }));
      
      setRecentLoans(dummyData);
    } catch (error) {
      console.error('Error loading recent loans:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      {recentLoans.map((loan) => (
        <div key={loan.id} className={styles.loanCard}>
          <div className={styles.leftContent}>
            <div className={styles.imageContainer}>
              <div className={styles.loanImage} />
            </div>
            <div className={styles.loanInfo}>
              <div className={styles.titleContainer}>
                <h3 className={styles.title}>{loan.title}</h3>
                {loan.badge && <span className={styles.badge}>{loan.badge}</span>}
              </div>
              <p className={styles.description}>{loan.description}</p>
            </div>
          </div>
          <div className={styles.buttonStack}>
            <button className={styles.button}>대출 자가진단</button>
            <button className={styles.button}>대출 상세보기</button>
          </div>
        </div>
      ))}
    </div>
  );
}