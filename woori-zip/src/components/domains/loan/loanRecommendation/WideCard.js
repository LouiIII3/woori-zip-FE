import React from 'react'
import styles from './WideCard.module.css';
import WideCardButton from './WideCardButton';

const WideCard = () => {
    return (
      <div>
        <h1 id ={styles.topText}>ooo님께 추천하는 대출 상품이에요</h1>
        <div className={styles.wideCard}>
          <p className={styles.loanName}>ITOUCH 전세론</p>
          <WideCardButton/>
        </div>
      </div>
    );
  };
  
  export default WideCard;