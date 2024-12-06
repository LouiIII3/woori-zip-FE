'use server';

import { instance } from "../instance";
export const fetchRecentlyLoan = async (page) => {
  console.log(page);
  console.log("fetxhRecentlyLoan");
  
    return await instance(`loan/recently?page=${page}`, {
      method: 'GET',
      credentials: 'include',
    });
};