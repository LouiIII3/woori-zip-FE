import React from 'react';
import styles from './WideCardButton.module.css'; 

const WideCardButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <button className={`${styles.button} ${styles.detailButton}`}>상세보기</button>
      <button className={`${styles.button} ${styles.consultButton}`}>상담사 연결</button>
    </div>
  );
};

export default WideCardButton;
