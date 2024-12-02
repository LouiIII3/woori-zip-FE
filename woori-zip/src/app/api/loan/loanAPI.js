'use client';
import { instance } from '@/app/api/instance';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// export const loanChecklistApi = {
//     getChecklistQuestions: async (loanGoodsType) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/v1/loanchecklists?loanGoodsType=${loanGoodsType}`);
//             if (!response.ok) throw new Error('Failed to fetch questions');
//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching checklist questions:', error);
//             throw error;
//         }
//     },   
   
// };

export const loanRecommendationApi = {
    getLoanRecommendations: async () => {
        try {
            const response = await instance(`loans/recommendation`,{
                method:'GET'
            });
            return response;
        } catch (error) {
            console.error('Error fetching loan recommendation:', error);
            throw error;
        }
}
};