'use client';
import { instance } from '@/app/api/instance';


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

// export const loanRecommendationApi = {
//     getLoanRecommendations: async () => {
//         try {
//             const response = await instance(`loans/recommendation`,{
//                 method:'GET'
//             });
//             return response;
//         } catch (error) {
//             console.error('Error fetching loan recommendation:', error);
//             throw error;
//         }
// }
// };


export const fetchLoanDetails = async (loanGoodsId) => {
    try {
      const response = await instance(`loangoods/${loanGoodsId}`, {
        method: 'GET',
        credentials: 'include',
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching loan details:", error);
      throw error;
    }
  };