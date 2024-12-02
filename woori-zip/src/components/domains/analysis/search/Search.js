'use client';

import { useState, useEffect } from 'react';
import styles from './Search.module.css';
import SearchController from './search.controller';

export default function Search({ onChartClick, chartItems }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [walkingDistance, setWalkingDistance] = useState('');
    const [facilitiesCount, setFacilitiesCount] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDong, setSelectedDong] = useState('');
    const controller = new SearchController();

    useEffect(() => {
        if (onChartClick) {
            setSelectedCategory(onChartClick);
        }
    }, [onChartClick]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        if (chartItems) {
            const chartItem = chartItems.find(item => item.key === categoryId);
            if (chartItem) {
                // 차트 항목 클릭 효과
            }
        }
    };

    const handleSubmit = () => {
        const searchData = controller.processSearchData({
            category: selectedCategory,
            walkingDistance: walkingDistance,
            facilitiesCount: facilitiesCount,
            district: selectedDistrict,
            dong: selectedDong
        });
        localStorage.setItem('searchData', JSON.stringify(searchData));
        window.location.href = '/search/result';
    };

    return (
        <div className={styles.searchWrapper}>
            <h3 className={styles.searchTitle}>
                원하시는 인프라 카테고리를 선택하세요!
            </h3>
            
            <div className={styles.mainContent}>
                <div className={styles.categoryGrid}>
                    {controller.getCategories().map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                selectedCategory === category.id ? styles.selected : ''
                            }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className={styles.inputSection}>
                    <div className={styles.inputGroup}>
                        <label>집에서부터 도보 거리</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                value={walkingDistance}
                                onChange={(e) => setWalkingDistance(e.target.value)}
                                className={styles.numberInput}
                            />
                            <span className={styles.unit}>분</span>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>카테고리 시설 개수</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                value={facilitiesCount}
                                onChange={(e) => setFacilitiesCount(e.target.value)}
                                className={styles.numberInput}
                            />
                            <span className={styles.unit}>개</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.locationSection}>
                <h4>지역 선택</h4>
                <div className={styles.locationSelector}>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className={styles.districtSelect}
                    >
                        <option value="">구 선택</option>
                        {controller.getDistricts().map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>

                    {selectedDistrict && (
                        <div className={styles.dongButtons}>
                            {controller.getDongsByDistrict(selectedDistrict).map((dong) => (
                                <button
                                    key={dong}
                                    className={`${styles.dongButton} ${
                                        selectedDong === dong ? styles.selected : ''
                                    }`}
                                    onClick={() => setSelectedDong(dong)}
                                >
                                    {dong}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.actionButtons}>
                <button 
                    className={styles.searchButton}
                    onClick={handleSubmit}
                >
                    집 검색하기
                </button>
                <button 
                    className={styles.mainButton}
                    onClick={() => window.location.href = '/'}
                >
                    메인으로
                </button>
            </div>
        </div>
    );
}