'use client';

import { useState } from 'react';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property, hasNext }) => {

  console.log("property: ", property);
  console.log("hasNexthoohoh: ", hasNext);

  return (
    <ul className={styles.cardList}>
      {property.map((data, i) => (
        <li key={`property${i}`} className={styles.cardItem}>
          <div className={styles.containBox}>
            <div className={styles.imageBox}>
              <img src={data?.imageUrl} alt="집 이미지" />
            </div>
            <div className={styles.textBox}>
              <div className={styles.textTitle}>
                <p>{data?.name}</p>
                <p>{data?.address}</p>
                <p>{data?.gu}</p>
                <p>{data?.dong}</p>
              </div>
              <div className={styles.textInfo}>
                <p>보증금 : {data?.deposit}원</p>
                <p>월세 : {data?.monthlyRentFee}원</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PropertyCard;
