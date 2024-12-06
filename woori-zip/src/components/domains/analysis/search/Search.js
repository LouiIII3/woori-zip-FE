'use client';

import { useEffect } from 'react';
import InfrastructureSelector from './InfrastructureSelector';
import RegionSelector from './RegionSelector';
import AnalysisResult from './AnalysisResult';
import styles from './Search.module.css';

export default function Search({
    selectedData,
    districtData = {},
    userData,
    consumptionData,
    onDataChange,
    onDistrictChange,
    onDongSelect,
    onCategoryChange
}) {
    // selectedData의 변화 감지
    useEffect(() => {
        console.log('===== 지도보기 데이터 변화 감지 =====');
        console.log('현재 선택된 데이터:', {
            category: selectedData?.category,
            district: selectedData?.district,
            dong: selectedData?.dong,
            coordinates: {
                southWest: {
                    latitude: selectedData?.southWestLatitude,
                    longitude: selectedData?.southWestLongitude
                },
                northEast: {
                    latitude: selectedData?.northEastLatitude,
                    longitude: selectedData?.northEastLongitude
                }
            }
        });
        console.log('================================');
    }, [selectedData]);

    const getBestCategory = (data) => {
        if (!data?.memberConsumption) return 'FOOD';

        const consumption = data.memberConsumption;
        const categories = {
            FOOD: consumption.food || 0,
            CULTURE: consumption.culture || 0,
            GROCERY: consumption.grocery || 0,
            CLOTH: consumption.cloth || 0,
            BOOK: consumption.book || 0,
            CAR: consumption.car || 0
        };

        return Object.entries(categories)
            .sort(([,a], [,b]) => b - a)[0][0];
    };

    const bestCategory = getBestCategory(consumptionData);

    // 차트 데이터 로깅
    console.log('===== 소비패턴분석 페이지 데이터 =====');
    console.log('[1] 차트 데이터:', {
        회원소비: consumptionData?.memberConsumption,
        유사그룹소비: consumptionData?.otherConsumption
    });
    
    // 최종 분석 결과 로깅
    console.log('[2] 최종 분석 결과:', {
        최적소비카테고리: bestCategory,
        회원명: userData?.name
    });
    
    console.log('[3] 지도로 전달되는 데이터:', {
        선택카테고리: selectedData.category,
        선택구: selectedData.district,
        선택동: selectedData.dong,
        좌표: {
            남서: {
                위도: selectedData.southWestLatitude,
                경도: selectedData.southWestLongitude
            },
            북동: {
                위도: selectedData.northEastLatitude,
                경도: selectedData.northEastLongitude
            }
        }
    });
    console.log('================================');

    return (
        <div className={styles.searchWrapper}>
            <AnalysisResult 
                category={bestCategory}
            />
            <InfrastructureSelector 
                selectedData={selectedData}
                onCategoryChange={onCategoryChange}
            />
            <RegionSelector 
                selectedData={selectedData}
                districtData={districtData}
                onDistrictChange={onDistrictChange}
                onDongSelect={onDongSelect}
            />
        </div>
    );
}