'use server';

import { instance } from "../instance";

export const fetchUploadedProperty = async (page = 0, size = 8) => {
  try {
      const response = await instance(`agent/houses?page=${page}&size=${size}`, {
          method: 'GET',
          credentials: 'include',
      });
      console.log("fetchUploadedProperty response:", response);
      console.log(page);
      
      return response; // 여기서 반환 데이터 구조를 확인하세요.
  } catch (error) {
      console.error("Error in fetchUploadedProperty:", error);
      throw error;
  }
};

