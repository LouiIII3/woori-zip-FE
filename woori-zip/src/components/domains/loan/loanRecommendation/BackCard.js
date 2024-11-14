"use client";
import React from 'react';
import styles from './BackCard.module.css'; 
import WideCard from './WideCard';

const BackCard = () => {
  return (
    <div className={styles.backCard}>
      <WideCard />
    </div>
  );
};

export default BackCard;
