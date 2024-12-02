import React from 'react';
import styles from './WideCardButton.module.css'; 
import Link from "next/link"; 

const WideCardButton = () => {
  return (
    <div className={styles.buttonContainer}>
      {/* <Link href = {`/loan/loanDetail/${loanGoodsId}`}> */}
        <button className={`${styles.button} ${styles.detailButton}`}>조회</button>
      {/* </Link> */}
    </div>
  );
};

export default WideCardButton;
