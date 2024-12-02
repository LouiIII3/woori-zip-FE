'use client';

class AnalysisService {
    constructor() {
        this.categoryMap = {
            'BOOK': '서적/문구',
            'CAR': '자동차정비/유지',
            'CLOTH': '의류',
            'CULTURE': '문화/취미',
            'FOOD': '식당/카페',
            'GROCERY': '음식료품'
        };
    }

    getBestCategoryName(category) {
        return this.categoryMap[category] || category;
    }
}

export default new AnalysisService();