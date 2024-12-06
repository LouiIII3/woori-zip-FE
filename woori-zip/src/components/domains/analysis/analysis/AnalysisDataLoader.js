'use client';

import { useState, useEffect } from 'react';  // React hooks import 추가
import Analysis from '@/components/domains/analysis/analysis/Analysis';
import { getConsumptionData } from '@/app/api/analysis/analysisAPI';

export default function AnalysisDataLoader() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsumptionData();
                if (!response?.data) {
                    throw new Error('응답 데이터가 없습니다');
                }

                const responseData = response.data.data || response.data;
                
                if (!responseData) {
                    throw new Error('데이터 구조가 올바르지 않습니다');
                }

                setData(responseData);
            } catch (err) {
                setError(err.message);
                console.error('Data fetching error:', err);
            }
        };

        fetchData();
    }, []);

    const processChartData = (inputData, type) => {
        if (!inputData) return null;

        // 소비 데이터 선택 (회원 또는 유사 그룹)
        const consumptionData = type === 'similar' ? 
            (inputData.otherConsumption || inputData) : 
            (inputData.memberConsumption || inputData);

        if (!consumptionData) return null;

        // 색상 정의
        const colors = [
            '#3257cc',
            '#5d9eff',
            '#87c4ff',
            '#b6e2ff',
            '#e0f7ff',
            '#0d47a1'
        ];

        // 실제 데이터로 아이템 생성
        const items = [
            { key: 'BOOK', label: '서적/문구', value: parseFloat(consumptionData.book) || 0 },
            { key: 'CAR', label: '자동차정비/유지', value: parseFloat(consumptionData.car) || 0 },
            { key: 'CLOTH', label: '의류', value: parseFloat(consumptionData.cloth) || 0 },
            { key: 'CULTURE', label: '문화/취미', value: parseFloat(consumptionData.culture) || 0 },
            { key: 'FOOD', label: '식당/카페', value: parseFloat(consumptionData.food) || 0 },
            { key: 'GROCERY', label: '음식료품', value: parseFloat(consumptionData.grocery) || 0 }
        ].filter(item => item.value > 0); // 0인 값 제외

        // 값을 기준으로 내림차순 정렬
        const sortedItems = items.sort((a, b) => b.value - a.value);
        
        // 정렬된 순서대로 색상 할당
        sortedItems.forEach((item, index) => {
            item.color = colors[index];
        });

        return {
            items: sortedItems
        };
    };

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">데이터를 불러오는 중 오류가 발생했습니다: {error}</p>
                <button 
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    다시 시도
                </button>
            </div>
        );
    }

    if (!data) {
        return <div className="loading">로딩 중...</div>;
    }

    // 데이터 처리
    const similarChartData = processChartData(data, 'similar');
    const memberChartData = processChartData(data, 'member');
    const bestCategory = data.bestCategory?.category || 'BOOK';

    return (
        <Analysis
            similarChartData={similarChartData}
            memberChartData={memberChartData}
            bestCategory={bestCategory}
        />
    );
}