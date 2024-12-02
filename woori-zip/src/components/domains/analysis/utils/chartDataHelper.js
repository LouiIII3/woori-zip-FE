'use client';

const CHART_COLORS = {
    'book': '#5778A3',       // 파란색 (서적/문구)
    'car': '#A3A3A3',        // 회색 (자동차정비/유지)
    'cloth': '#E6A972',      // 주황/갈색 (의류)
    'culture': '#E6C9B3',    // 연한 살구색 (문화/취미)
    'food': '#7FA347',       // 진한 초록 (식당/카페)
    'grocery': '#9FD067'     // 연한 초록 (음식료품)
};

export const processChartDataHelper = (data, type) => {
    if (!data) {
        console.warn('No data provided');
        return {
            labels: [],
            data: [],
            colors: [],
            items: []
        };
    }

    // 데이터 매핑
    const items = [
        { key: 'book', label: '서적/문구', value: Number(data.book) || 0 },
        { key: 'car', label: '자동차정비/유지', value: Number(data.car) || 0 },
        { key: 'cloth', label: '의류', value: Number(data.cloth) || 0 },
        { key: 'culture', label: '문화/취미', value: Number(data.culture) || 0 },
        { key: 'food', label: '식당/카페', value: Number(data.food) || 0 },
        { key: 'grocery', label: '음식료품', value: Number(data.grocery) || 0 }
    ].map(item => ({
        ...item,
        color: CHART_COLORS[item.key]
    }));

    // 값을 기준으로 정렬
    const sortedItems = items.sort((a, b) => b.value - a.value);

    return {
        labels: sortedItems.map(item => item.label),
        data: sortedItems.map(item => item.value),
        colors: sortedItems.map(item => item.color),
        items: sortedItems
    };
};