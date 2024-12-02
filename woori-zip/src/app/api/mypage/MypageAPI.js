'use server';
import { instance } from "../instance";

export const fetchMemberInfo = async () => {
    return await instance(`members/info`, {
      method: 'GET',
      credentials: 'include',
    });
};