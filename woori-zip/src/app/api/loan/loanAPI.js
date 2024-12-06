'use client';
import { instance } from '@/app/api/instance';



export const fetchLoanRecommendations = async (houseId,loanCheckListRequest) => {
    console.log("fetched1");
    loanCheckListRequest = loanCheckListRequest || {};

    const {
        annualIncome = 0, 
        totalAssets = 0, 
        marriageStatus = "NONE_MARRIAGE",  
        contract = "",  
        workStatus = "NONE_WORK_STATUS",  
        workTerm = "NONE_TERM" 
      } = loanCheckListRequest;

    try {
        const params = new URLSearchParams({
            annualIncome,
            totalAssets,
            marriageStatus,
            contract,
            workStatus,
            workTerm
          });
    
      const response = await instance(`loangoods/recommend/${houseId}?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      });
      console.log("fetched2");
      return response.data; 
    } catch (error) {
      console.error("Error fetching loan recommend:", error);
      throw error;
    }
  };


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