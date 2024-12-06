'use client';

import styles from './AnalysisResult.module.css';
import { useSession } from "next-auth/react";

const AnalysisResult = ({ category }) => {
    const { data: sessionData, status } = useSession();
    
    const userName = sessionData?.user?.name || '회원';
    
    const categoryNameMap = {
        'CLOTH': '의류',
        'BOOK': '서적/문구',
        'GROCERY': '음식료품',
        'CULTURE': '문화/취미',
        'FOOD': '식당/카페',
        'CAR': '자동차정비/유지'
    };

    if (status === 'loading') {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className={styles.container}>
                <div className={styles.analysisResult}>
                    <p className={styles.resultText}>
                        로그인이 필요한 서비스입니다.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.analysisResult}>
                <p className={styles.resultText}>
                    <span className={styles.highlight}>최종 분석 결과, </span>
                    <span className={`${styles.highlight} ${styles.underline}`}>{userName}</span>
                    <span className={styles.highlight}> 님과 가장 잘 어울리는 소비 카테고리는 </span>
                    <span className={`${styles.highlight} ${styles.underline}`}>{categoryNameMap[category]}</span>
                    <span className={styles.highlight}> 입니다.</span>
                </p>
            </div>
        </div>
    );
};

export default AnalysisResult;