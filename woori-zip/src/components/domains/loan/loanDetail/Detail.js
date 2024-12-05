"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './Detail.module.css'; 
import Link from "next/link"; 


const Details = ({loanDetails}) => {

  const bottomFields = [
    { key: 'target', label: '대출 대상' },
    { key: 'limitAmount', label: '대출 한도' },
    { key: 'term', label: '대출 기간' },
    { key: 'normalRate', label: '기본금리' },
    { key: 'specialRate', label: '우대금리' },
    { key: 'repayType', label: '상환 방식' },
    { key: 'guarantee', label: '담보' },
    { key: 'targetHouse', label: '대상 주택' },
    { key: 'customerCost', label: '고객 부담 비용' },
    { key: 'interestMethod', label: '이자 계산방법' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cardItem}>
        <div className={styles.cardTopContent}>
          <div className={styles.cardContent}>
            <div className={styles.loanType}>{loanDetails.loanType === "NATIONAL_HOUSING_URBAN_FUND"
                                                        ? "주택도시기금":"전세자금대출"}</div>
            <div className={styles.loanName}>{loanDetails.name}</div>
            <div className={styles.loanSummary}>
              <div className={styles.loanTextBox1}>
                <span className={styles.loanTarget}>대출대상</span>
                <div className={styles.loanTargetText} title={loanDetails.target}>
                  {loanDetails.target}
                </div>
              </div>
              <p></p>
              <div className={styles.loanTextBox2}>
                <span className={styles.loanDate}>대출기간</span>
                <div className={styles.loanDateText} title={loanDetails.term}>
                  {loanDetails.term}
                </div>
              </div>
              <p></p>
              <div className={styles.loanTextBox3}>
                <span className={styles.loanLimit}>대출한도</span>
                <div className={styles.loanLimitText} title={loanDetails.limitAmount}>
                  {loanDetails.limitAmount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.cardImage}
              src={loanDetails.imageUrl || "https://via.placeholder.com/100"}
              alt="Loan Product"
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomBox}>
        {bottomFields.map((field) => {
          const value = loanDetails[field.key];
          return value ? (
            <div key={field.key}>
              <div className={styles.bottomBoxLabel}>{field.label}</div>
              <div className={styles.bottomBoxValue}>{value}</div>
            </div>
          ) : null;
        })}

{loanDetails.rateList && loanDetails.rateList.length > 0 && (
          <table className={styles.rateTable}>
            <thead>
            <div className={styles.label}>금리</div>
              <tr>
                <th className={styles.rateTableHeader}>대출 유형</th>
                <th className={styles.rateTableHeader}>기본 금리</th>
                <th className={styles.rateTableHeader}>우대 금리 추가</th>
                <th className={styles.rateTableHeader}>정상 금리</th>
                <th className={styles.rateTableHeader}>우대 금리</th>
                <th className={styles.rateTableHeader}>최저 금리</th>
              </tr>
            </thead>
            <tbody>
              {loanDetails.rateList.map((rate, index) => (
                <tr key={index}>
                <td className={styles.rateTableCell}>
                    {(() => {
                      switch (rate.rateType) {
                        case "FIXED":
                          return "고정금리(2년)[고정금리]";
                        case "NEW_COFIX_SIX_MONTH":
                          return "신규COFIX기준금리(6개월)[변동금리]";
                        case "NEW_COFIX_ONE_YEAR":
                          return "신규COFIX기준금리(1년)[변동금리]";
                        case "COFIX_SIX_MONTH":
                          return "신잔액COFIX기준금리(6개월)[변동금리]";
                        case "COFIX_ONE_YEAR":
                          return "신잔액COFIX기준금리(1년)[변동금리]";
                        default:
                          return "알 수 없는 금리 유형";
                      }
                    })()}
                  </td>
                  <td className={styles.rateTableCell}>{rate.basicRate}</td>
                  <td className={styles.rateTableCell}>{rate.addRate}</td>
                  <td className={styles.rateTableCell}>{rate.normalRate}</td>
                  <td className={styles.rateTableCell}>{rate.specialRate}</td>
                  <td className={styles.rateTableCell}>{rate.minRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        
      </div>

    
    </div>
  );
};

export default Details;