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
      <div className={styles.cardItem}>

{/* 5개 페이지네이션 */}
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
                src="https://via.placeholder.com/100"
              />
            </div>
            <div className={styles.buttonStack}>
              <button className={styles.button}>대출 상세보기</button>
            </div>
            </div>
     
      
          
        </div>
    </div>
  );
}