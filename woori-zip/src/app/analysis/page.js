'use server';

import AnalysisDataLoader from '@/components/domains/analysis/analysis/AnalysisDataLoader';

export default async function AnalysisPage() {
    return (
        <div>
            <h1>소비 분석</h1>
            <AnalysisDataLoader />
        </div>
    );
}
