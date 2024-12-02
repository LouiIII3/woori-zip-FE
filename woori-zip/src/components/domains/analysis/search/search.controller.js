'use client';

import SearchService from './search.service';
import { processSearchData } from '../utils/searchDataHelper';

class SearchController {
    constructor() {
        this.service = new SearchService();
    }

    getCategories() {
        return this.service.getCategoryList();
    }

    getDistricts() {
        return this.service.getDistrictList();
    }

    getDongsByDistrict(district) {
        return this.service.getDongList(district);
    }

    processSearchData(data) {
        return processSearchData(data);
    }
}

export default SearchController;