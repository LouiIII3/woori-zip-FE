'use client';

import { useState, useEffect } from "react";
import { fetchRecentlyLoan } from "@/app/api/mypage/RecentlyLoanListAPI";

export const useLoan = () => {
    const [loanData, setLoanData] = useState({
        hasNext: false,
        recentlyLoanGoods: [],
        numberOfElements: 0,
    });

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchRecentlyLoan(0);

                console.log("Initial fetchRecentlyLoan response:", data);

                setLoanData(data?.data || {
                    hasNext: false,
                    recentlyLoanGoods: [],
                    numberOfElements: 0,
                });
            } catch (err) {
                console.error("Error fetching initial data:", err);
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
            if (!loanData.hasNext) return;

            try {
                setIsLoading(true);
                const data = await fetchRecentlyLoan(page);

                console.log("Next page fetchRecentlyLoan response:", data);

                setLoanData(prevData => ({
                    ...prevData,
                    hasNext: data?.data?.hasNext || false,
                    recentlyLoanGoods: [
                        ...prevData.recentlyLoanGoods,
                        ...(data?.data?.recentlyLoanGoods || [])
                    ],
                }));
            } catch (err) {
                console.error("Error fetching next page:", err);
                setError(err.message || "다음 페이지를 불러오는 중 에러가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        if (loanData.hasNext && page > 0) {
            fetchNextPage();
        }
    }, [page, loanData.hasNext]);

    const loadMore = () => {
        if (loanData.hasNext) {
            console.log("Load more triggered. Waiting for timer...");
            setShowLoadingMessage(true);
            setTimeout(() => {
                console.log("Timer complete. Loading more data.");
                setPage(prevPage => prevPage + 1);
            }, 2000); // 2초 대기 후 페이지 증가
        }
    };
    

    return {
        loanData,
        isLoading,
        showLoadingMessage,
        error,
        loadMore,
    };
}