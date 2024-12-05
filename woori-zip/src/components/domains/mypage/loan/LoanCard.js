'use client';

import React from 'react';
import styles from './LoanCard.module.css'; // 스타일 파일 추가
import Link from 'next/link';

const LoanCard = ({ property, hasNext }) => {

    console.log("property: ", property);
    console.log("hasNexthoohoh: ", hasNext);

    return (
        <ul className={styles.cardList}>
            {property.map((data, i) => (
                <li key={`property${i}`} className={styles.cardItem}>
                    <div className={styles.containBox}>
                        <div className={styles.imageBox}>
                            <img src={data?.imageUrl} alt="대출 이미지" />
                        </div>
                        <div className={styles.textBox}>
                            <div className={styles.textTitle}>
                                <p>{data?.loanType}</p>
                                <p>{data?.name}</p>
                            </div>
                            <div className={styles.textInfo}>
                                <p>대출 대상 : {data?.target}</p>
                                <p>대출 기간 : {data?.term}</p>
                                <p>대출 조건 : {data?.limitAmount}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonStack}>
                        <button>
                            <Link href={`/loan/loanDetail/${data?.id}`} className={styles.button}>
                                대출 상세보기
                            </Link>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LoanCard;
