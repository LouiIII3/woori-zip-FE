'use client';

import { useState, useEffect } from 'react';
import styles from './Analysis.module.css';
import Chart from '../chat/Chat';
import AnalysisController from './analysis.controller';
import AnalysisResult from '../../../domains/analysis/search/AnalysisResult';
import InfrastructureSelector from '../../../domains/analysis/search/InfrastructureSelector';
import RegionSelector from '../../../domains/analysis/search/RegionSelector';
import Link from 'next/link';

export default function Analysis({ similarChartData, memberChartData, bestCategory }) {
    const [userName, setUserName] = useState('회원');
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

    useEffect(() => {
        fetch('/data/seoul_districts_dong_data.json')
            .then((response) => response.json())
            .then((data) => setDistrictData(data))
            .catch((error) => console.error('Error loading data:', error));

        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) setUserName(storedUserName);
    }, []);

    const handleCategoryChange = (category) => {
        if (!category) return;
        setSelectedData(prev => ({ ...prev, category }));
    };

    const handleDistrictChange = (district) => {
        setSelectedData(prev => ({
            ...prev,
            district,
            dong: '',
            southWestLatitude: '',
            southWestLongitude: '',
            northEastLatitude: '',
            northEastLongitude: ''
        }));
    };

    const handleDongSelect = (dong) => {
        const dongData = districtData[selectedData.district?.toLowerCase()]?.find(
            item => item.읍면동명.toLowerCase() === dong.toLowerCase()
        );

        if (dongData) {
            setSelectedData(prev => ({
                ...prev,
                dong,
                southWestLatitude: dongData.southWestLatitude,
                southWestLongitude: dongData.southWestLongitude,
                northEastLatitude: dongData.northEastLatitude,
                northEastLongitude: dongData.northEastLongitude
            }));
        }
    };

    const filterRequestParams = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== null && v !== undefined && v !== '')
        );
    };

    const handleMapClick = () => {
        const filteredData = filterRequestParams(selectedData);
        console.log('===== 지도보기 버튼 클릭 =====');
        console.log('지도로 전달되는 데이터:', {
            선택카테고리: filteredData.category,
            선택구: filteredData.district,
            선택동: filteredData.dong,
            좌표: {
                남서: {
                    위도: filteredData.southWestLatitude,
                    경도: filteredData.southWestLongitude
                },
                북동: {
                    위도: filteredData.northEastLatitude,
                    경도: filteredData.northEastLongitude
                }
            }
        });
        console.log('================================');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userName}님의 소비 패턴 분석 결과</h1>
            
            <div className={styles.chartSection}>
                <div className={styles.chartBox}>
                    <Chart 
                        data={similarChartData} 
                        activeCategory={selectedData.category}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님과 비슷한 유형의 카테고리 별 평균 소비량
                    </h2>
                </div>
                <div className={styles.chartBox}>
                    <Chart 
                        data={memberChartData} 
                        activeCategory={selectedData.category}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님의 카테고리 별 평균 소비량
                    </h2>
                </div>
            </div>

            <AnalysisResult category={bestCategory} />
            
            <InfrastructureSelector 
                selectedData={selectedData}
                onCategoryChange={handleCategoryChange}
            />
            
            <RegionSelector 
                selectedData={selectedData}
                districtData={districtData}
                onDistrictChange={handleDistrictChange}
                onDongSelect={handleDongSelect}
            />

            <div className={styles.buttonGroup}>
                <Link
                    href={{
                        pathname: '/map',
                        query: filterRequestParams(selectedData)
                    }}
                    className={styles.primaryButton}
                    onClick={handleMapClick}
                >
                    지도 보기
                </Link>
            </div>
        </div>
    );
}