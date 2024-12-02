'use client';

export const processSearchData = (data) => {
    return {
        ...data,
        timestamp: new Date().toISOString()
    };
};