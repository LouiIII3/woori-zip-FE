"use client"
import React, { useState } from 'react';
import styles from './WebViewMyPageLoan.module.css';



export default function WebViewMyPageLoan ({item}) {
 

  const items = [
    {
      id: 1,
      title: '전세',
      image : "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/loanPage/images__20__360.jpg",
      description: '이 전세대출은'
    },
    {
      id: 2,
      title: '월세',
      image : "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/loanPage/images__20__360.jpg",
      description: '이 월세대출은'
    },
    {
      id: 3,
      title: '전월세',
      image : "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/loanPage/images__20__360.jpg",
      description: '이 전월세는 '
    }
  ];

  return (
    // 없을 때 최근 본 대출 상품이 존재하지 않습니다 추가
    <div className={styles.full}>
      <p className={styles.categoryLoan}>최근 본 대출 상품</p>
      <div className={styles.line}></div>
      <div className={styles.loanContainer}>
        <div className={styles.loanList}>
          {items.map((item) => (
            <div key={item.id} className={styles.loanItem}>
              <div className={styles.loanContent}>
                  <img className={styles.loanImage} src={item.image} alt={item.title}/>
              
                <div className={styles.loanText}>
                  <h3 className={styles.loanTitle}>{item.title}</h3>
                  <p className={styles.loanDescription}>{item.description}</p>
                </div>

              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

