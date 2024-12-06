'use server';

import { instance } from "../instance";

export const getConsumptionData = async () => {
    try {
        const response = await instance('consumption', {
            method: 'GET',
            credentials: 'include',
        });
        
        if (!response.success) {
            throw new Error(response?.data?.message || '데이터를 불러오는데 실패했습니다');
        }
        
        return response;
    } catch (error) {
        console.error('Consumption Data Error:', error);
        throw error;
    }
};