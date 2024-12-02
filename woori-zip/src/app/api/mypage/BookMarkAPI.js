'use server';
import { instance } from "../instance";

export const fetchBookmarks = async (page = 0, size = 8) => {
    return await instance(`bookmarks?page=${page}&size=${size}`, {
      method: 'GET',
      credentials: 'include',
    });
};

export const addBookmark = async (propertyId) => {
  return await instance(`houses/${propertyId}/bookmark`, {
    method: 'POST',
    credentials: 'include',
  });
};

// 북마크 삭제 요청
export const removeBookmark = async (propertyId) => {
  return await instance(`houses/${propertyId}/bookmark`, {
    method: 'DELETE',
    credentials: 'include',
  });
};