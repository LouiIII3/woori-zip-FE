"use client";
import React from 'react';
import styles from './Detail.module.css'; 
import CardList from '../loanRecommendation/CardList';

const Details = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
      </div>
      <div className={styles.bottomBox}>
        <div>내용 1</div>
        <div>내용 2</div>
        <div>내용 3</div>
        <div>내용 4</div>
        <div>내용 5</div>
        <div>내용 6</div>
        <div>내용 7</div>
        <div>내용 8</div>
        <div>내용 9</div>
        <div>내용 10</div>
        <div>내용 11</div>
        <div>내용 12</div>
        <div>내용 13</div>
        <div>내용 14</div>
        <div>내용 15</div>
      </div>
      <button className={styles.goToChecklistButton}>
        대출 자격 요건 확인
      </button>
    </div>
  );
};

export default Details;
