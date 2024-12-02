"use client";
import React, { useState } from 'react'
import styles from './WebViewLoanDetail.module.css';
import Link from "next/link"; 


export default function WebViewLoanDetail({loanDetails}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.productContainer}>
      
      <div  className={styles.cardItem}>
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
            </div>
        </div>
  

      <div className={styles.productInfoSection}>
                <div 
                    className={styles.infoHeader} 
                    onClick={() => setIsExpanded(!isExpanded)}
                >   
                    <span>상품안내</span>
                    <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
                        ▼
                    </span>
                </div>
                <hr className ={styles.line}></hr>
                <div className={`${styles.infoContent} ${isExpanded ? styles.show : ''}`}>
                    <div className={styles.contentInner}>
                      {loanDetails.content}
                    </div>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.callBtn}>상담시 연결</button>
                <Link href={`/loan/loanCheckList?loanGoodsType=${loanDetails.loanGoodsType}`}>
                  <button className={styles.goToChecklistButton}>대출 자격 요건 확인</button>
                </Link>
            </div>
        
    </div>
  );
};

