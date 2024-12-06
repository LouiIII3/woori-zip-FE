'use client';

import styles from './InfrastructureSelector.module.css';

export default function InfrastructureSelector({ selectedData, onCategoryChange }) {
    const categories = [
        { id: 'CLOTH', label: '의류' },
        { id: 'BOOK', label: '서적/문구' },
        { id: 'GROCERY', label: '음식료품' },
        { id: 'CULTURE', label: '문화/취미' },
        { id: 'FOOD', label: '식당/카페' },
        { id: 'CAR', label: '자동차정비/유지' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>
                    원하시는 인프라 카테고리를 선택하세요!
                </h3>
                <div className={styles.categoryGrid}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                selectedData.category === category.id ? styles.selected : ''
                            }`}
                            onClick={() => onCategoryChange(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}