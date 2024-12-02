'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchBookmarks, removeBookmark as removeBookmarkAPI } from '../../../../../app/api/mypage/BookMarkAPI';

export const useBookmarks = () => {
  const [bookmarkData, setBookmarkData] = useState({
    bookmarks: [],
    hasNext: false,
    numberOfElements: 0
  });
  
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
        try {
            setIsLoading(true);
        const data = await fetchBookmarks(0);
        setBookmarkData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // 추가 데이터 로드
  const loadMore = async () => {
    if (isLoading || !bookmarkData.hasNext) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const newData = await fetchBookmarks(nextPage);
      
      setBookmarkData(prev => ({
        bookmarks: [...prev.bookmarks, ...newData.bookmarks],
        hasNext: newData.hasNext,
        numberOfElements: prev.numberOfElements + newData.numberOfElements
      }));
      
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer 콜백
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && bookmarkData.hasNext && !isLoading) {
      loadMore();
    }
  }, [bookmarkData.hasNext, isLoading, page, loadMore]);

  // Intersection Observer 설정
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '50px',
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const removeBookmark = async (houseId) => {
    try {
      await removeBookmarkAPI(houseId);
      
      setBookmarkData(prev => ({
        ...prev,
        bookmarks: prev.bookmarks.filter(bookmark => bookmark.houseId !== houseId),
        numberOfElements: prev.numberOfElements - 1
      }));
      
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return {
    bookmarkData,
    isLoading,
    error,
    loadMoreRef,
    removeBookmark
  };
};