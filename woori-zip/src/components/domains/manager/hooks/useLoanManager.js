'use client';

import { useState, useEffect } from "react";
import { getLoanProducts } from "../../../../app/api/manager/managerAPI";

export function useLoanManager() {
  const [loanData, setLoanData] = useState({
    hasNext: false,
    loans: [],
    numberOfElements: 0,
  });
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('[loadInitialData] Loading initial data...');
        setIsLoading(true);
        const response = await getLoanProducts(0);
        console.log('[loadInitialData] Raw API Response:', response);

        const processedData = {
          hasNext: response?.data?.hasNext || false,
          loans: response?.data?.recentlyLoanGoods || [],
          numberOfElements: response?.data?.numberOfElements || 0,
        };

        console.log('[loadInitialData] Processed Data:', processedData);
        setLoanData(processedData);
      } catch (err) {
        console.error('[loadInitialData] Error:', err);
        setError(err.message || "데이터를 불러오는 중 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
        setShowLoadingMessage(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchNextPage = async () => {
      if (!loanData.hasNext) {
        console.log('[fetchNextPage] No more data to fetch');
        return;
      }

      try {
        setIsLoading(true);
        console.log(`[fetchNextPage] Fetching page ${page}...`);
        const response = await getLoanProducts(page);
        console.log('[fetchNextPage] Raw API Response:', response);

        setLoanData(prevData => {
          const newData = {
            ...prevData,
            hasNext: response?.data?.hasNext || false,
            loans: [
              ...prevData.loans,
              ...(response?.data?.recentlyLoanGoods || [])
            ],
            numberOfElements: response?.data?.numberOfElements || 0,
          };
          console.log('[fetchNextPage] Updated Data:', newData);
          return newData;
        });
      } catch (err) {
        console.error('[fetchNextPage] Error:', err);
        setError(err.message || "다음 페이지를 불러오는 중 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (loanData.hasNext && page > 0) {
      console.log(`[useEffect] Triggering fetchNextPage for page ${page}`);
      fetchNextPage();
    }
  }, [page, loanData.hasNext]);

  const loadMore = () => {
    if (loanData.hasNext && !isLoading) {
      console.log('[loadMore] Load more triggered, current page:', page);
      setShowLoadingMessage(true);
      setTimeout(() => {
        console.log('[loadMore] Incrementing page number');
        setPage(prevPage => prevPage + 1);
      }, 1000);
    }
  };

  return {
    loanData,
    setLoanData, // 추가: 상태를 업데이트하기 위한 setter 반환
    isLoading,
    showLoadingMessage,
    error,
    loadMore,
  };
}