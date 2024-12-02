"use client";
import React from 'react';
import { useState } from 'react';
import styles from './AgreementPage.module.css';
import { useRouter } from 'next/navigation';


export default function Agreement() {
    const router = useRouter();

    const handleSignupClick = (e) => {
      e.preventDefault();
      router.push('/user/signup');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <div className={styles.agreementBox}>
                    <div className={styles.agreementItem}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>전체 동의하기</span>
                        </label>
                        <p className={styles.description}>
                            필수항목과 선택항목에 대한 동의를 포함합니다.<br />
                            선택항목에는 동의하지 않으셔도 됩니다.
                        </p>
                    </div>
                    <div className={styles.agreementItemSub}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>개인정보 수집/이용동의</span>
                        </label>
                        <div>
                            <div className={styles.lsc}>
                                <p className={styles.descriptionSub}>
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.agreementItemSub}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>개인정보 수집/이용동의</span>
                        </label>
                        <div>
                            <div className={styles.lsc}>
                                <p className={styles.descriptionSub}>
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className={styles.submitButton} onClick={handleSignupClick}>
                        약관 동의하기
                    </button>
                </div>
            </div>
        </div>
    );
}