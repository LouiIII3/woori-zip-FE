'use client';

import { processChartDataHelper } from '../utils/chartDataHelper';
import analysisService from './analysis.service';

class AnalysisController {
    constructor() {
        this.service = analysisService;
    }

    processChartData(data, type) {
        if (!data || !type) return null;
        return processChartDataHelper(data, type);
    }

    getBestCategoryName(category) {
        return this.service.getBestCategoryName(category);
    }
}

export default new AnalysisController();