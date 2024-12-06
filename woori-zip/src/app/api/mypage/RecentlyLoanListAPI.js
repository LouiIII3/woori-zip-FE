
'use server';
import { instance } from "../instance";
export const fetchRecentlyLoan = async (page = 0, size = 8) => {
  console.log(page);
  console.log("fetxhRecentlyLoan");
  
    return await instance(`loan/recently?page=${page}&size=${size}`, {
      method: 'GET',
      credentials: 'include',
    });
};