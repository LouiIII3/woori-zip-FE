'use client';

class SearchService {
    getCategoryList() {
        return [
            { id: 'CLOTH', label: '의류' },
            { id: 'BOOK', label: '서적/문구' },
            { id: 'GROCERY', label: '음식료품' },
            { id: 'CULTURE', label: '문화/취미' },
            { id: 'FOOD', label: '식당/카페' },
            { id: 'CAR', label: '자동차정비/유지' }
        ];
    }

    getDistrictList() {
        // 임시 데이터
        return ['강서구', '강동구', '강남구', '마포구'];
    }

    getDongList(district) {
        // 임시 데이터
        const dongMap = {
            '강서구': ['화곡동', '발산동', '우장산동'],
            '강동구': ['천호동', '성내동', '둔촌동'],
            '강남구': ['삼성동', '청담동', '역삼동'],
            '마포구': ['합정동', '상수동', '망원동']
        };
        return dongMap[district] || [];
    }
}

export default SearchService;
