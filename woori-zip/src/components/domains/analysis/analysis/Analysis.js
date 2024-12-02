'use client';

import { useState, useEffect } from 'react';
import styles from './Analysis.module.css';
import Chart from '../chat/Chat';
import AnalysisController from './analysis.controller';
import Link from 'next/link';

export default function Analysis({ similarChartData, memberChartData, bestCategory }) {
    const [userName, setUserName] = useState('회원');
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDong, setSelectedDong] = useState('');
    const [districtData, setDistrictData] = useState({});
    const [selectedData, setSelectedData] = useState({
        district: '',
        dong: '',
        category: '',
        southWestLatitude: '',
        southWestLongitude: '',
        northEastLatitude: '',
        northEastLongitude: ''
    });

    const categories = [
        { id: '의류', label: '의류' },
        { id: '서적/문구', label: '서적/문구' },
        { id: '음식료품', label: '음식료품' },
        { id: '문화/취미', label: '문화/취미' },
        { id: '식당/카페', label: '식당/카페' },
        { id: '자동차정비/유지', label: '자동차정비/유지' },
    ];

    const bestCategoryKorean = bestCategory
        ? AnalysisController.getBestCategoryName(bestCategory)
        : '서적/문구';

    const normalizeString = (str) => str.trim().toLowerCase();

    useEffect(() => {
        fetch('/data/seoul_districts_dong_data.json')
            .then((response) => response.json())
            .then((data) => {
                console.log("Loaded district data:", data);
                setDistrictData(data);
            })
            .catch((error) => console.error('Error loading data:', error));

        const storedUserName = window.localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleCategoryChange = (category) => {
        if (!category) return;
        setActiveCategory(category);
        setSelectedData((prev) => ({
            ...prev,
            category
        }));
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setSelectedDong('');
        setSelectedData((prev) => ({
            ...prev,
            district,
            dong: '', // Reset dong
            southWestLatitude: '',
            southWestLongitude: '',
            northEastLatitude: '',
            northEastLongitude: ''
        }));
    };

    const handleDongSelect = (dong) => {
        const normalizedDistrict = normalizeString(selectedDistrict);
        const normalizedDong = normalizeString(dong);

        console.log("Selected district:", selectedDistrict); // 디버깅 로그
        console.log("Selected dong:", dong); // 디버깅 로그

        const selectedDongData = districtData[normalizedDistrict]?.find(
            (item) => normalizeString(item.읍면동명) === normalizedDong
        );

        if (!selectedDongData) {
            console.error("No data found for selected district and dong");
            return;
        }

        setSelectedDong(dong);
        const updatedData = {
            ...selectedData,
            dong,
            southWestLatitude: selectedDongData.southWestLatitude,
            southWestLongitude: selectedDongData.southWestLongitude,
            northEastLatitude: selectedDongData.northEastLatitude,
            northEastLongitude: selectedDongData.northEastLongitude
        };
        setSelectedData(updatedData);

        console.log("Updated selected data:", updatedData);
    };

    const filterRequestParams = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userName}님의 소비 패턴 분석 결과</h1>

            <div className={styles.chartSection}>
                <div className={styles.chartBox}>
                    <Chart
                        data={similarChartData || { items: [] }}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님과 비슷한 유형의 카테고리 별 평균 소비량
                    </h2>
                </div>

                <div className={styles.chartBox}>
                    <Chart
                        data={memberChartData || { items: [] }}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님의 카테고리 별 평균 소비량
                    </h2>
                </div>
            </div>

            <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>원하시는 인프라 카테고리를 선택하세요!</h3>
                <div className={styles.categoryGrid}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.id ? styles.selected : ''
                            }`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.locationSection}>
                <div className={styles.locationHeader}>
                    <h4 className={styles.locationTitle}>지역 선택</h4>
                    <div className={styles.districtWrapper}>
                        <select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            className={styles.districtSelect}
                        >
                            <option value="">구 선택</option>
                            {Object.keys(districtData).map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedDistrict && (
                    <div className={styles.dongGrid}>
                        {districtData[normalizeString(selectedDistrict)]?.map((dong) => (
                            <button
                                key={dong.읍면동명}
                                onClick={() => handleDongSelect(dong.읍면동명)}
                                className={`${styles.dongButton} ${
                                    selectedDong === dong.읍면동명 ? styles.selected : ''
                                }`}
                            >
                                {dong.읍면동명}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.buttonGroup}>
                <Link
                    href={{
                        pathname: '/map',
                        query: filterRequestParams(selectedData)
                    }}
                    className={styles.primaryButton}
                >
                    지도 보기
                </Link>
            </div>
        </div>
    );
}
