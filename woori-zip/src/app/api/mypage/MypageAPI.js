'use server';
import { instance } from "../instance";

export const fetchMemberInfo = async () => {
    return await instance(`members/profile`, {
      method: 'GET',
      credentials: 'include',
    });
};