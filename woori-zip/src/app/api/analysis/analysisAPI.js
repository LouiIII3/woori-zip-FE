'use server';

import { instance } from "../instance";

export const getConsumptionData = async () => {
    return await instance(`consumption`, {
        method: 'GET',
        credentials: 'include',
    });
};