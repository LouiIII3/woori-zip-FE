'use server';

import AnalysisDataLoader from '@/components/domains/analysis/analysis/AnalysisDataLoader';

export default async function AnalysisPage() {
    return (
        <div>
            <AnalysisDataLoader />
        </div>
    );
}
