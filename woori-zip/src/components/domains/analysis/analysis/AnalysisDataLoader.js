'use client';

import { useEffect, useState } from 'react';
import Analysis from '@/components/domains/analysis/analysis/Analysis';
import { getConsumptionData } from '@/app/api/analysis/analysisAPI';

export default function AnalysisDataLoader() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsumptionData();
                setData(response);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다: {error}</div>;
    }

    if (!data) {
        return <div>로딩 중...</div>;
    }

    const processChartData = (data, type) => {
        if (!data || !type) return null;

        const consumptionData =
            type === 'similar' ? data.otherConsumption : data.memberConsumption;

        const items = [
            { key: 'BOOK', label: '서적/문구', value: Number(consumptionData.book), color: '#5778A3' },
            { key: 'CAR', label: '자동차정비/유지', value: Number(consumptionData.car), color: '#A8C9E5' },
            { key: 'CLOTH', label: '의류', value: Number(consumptionData.cloth), color: '#E49343' },
            { key: 'CULTURE', label: '문화/취미', value: Number(consumptionData.culture), color: '#F5C086' },
            { key: 'FOOD', label: '식당/카페', value: Number(consumptionData.food), color: '#6B9F59' },
            { key: 'GROCERY', label: '음식료품', value: Number(consumptionData.grocery), color: '#9CCF85' },
        ];

        const sortedItems = items.sort((a, b) => b.value - a.value);

        return {
            labels: sortedItems.map(item => item.label),
            data: sortedItems.map(item => item.value),
            colors: sortedItems.map(item => item.color),
            items: sortedItems,
        };
    };

    const similarChartData = processChartData(data, 'similar');
    const memberChartData = processChartData(data, 'member');
    const bestCategory = data.bestCategory?.category;

    return (
        <Analysis
            similarChartData={similarChartData}
            memberChartData={memberChartData}
            bestCategory={bestCategory}
        />
    );
}
