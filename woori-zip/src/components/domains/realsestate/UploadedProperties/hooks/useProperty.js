'use client';

import { useState, useEffect } from "react";
import { fetchUploadedProperty } from "@/app/api/agent/UploadedPropertiesAPI";

export const useProperty = () => {
    const [propertyData, setPropertyData] = useState({
        hasNext: false,
        houses: [],
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
                const data = await fetchUploadedProperty(0);

                console.log("Initial fetchUploadedProperty response:", data);

                setPropertyData(data?.data || {
                    hasNext: false,
                    houses: [],
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
            if (!propertyData.hasNext) return;

            try {
                setIsLoading(true);
                const data = await fetchUploadedProperty(page);

                console.log("Next page fetchUploadedProperty response:", data);

                setPropertyData(prevData => ({
                    ...prevData,
                    hasNext: data?.data?.hasNext || false,
                    houses: [
                        ...prevData.houses,
                        ...(data?.data?.houses || [])
                    ],
                }));
            } catch (err) {
                console.error("Error fetching next page:", err);
                setError(err.message || "다음 페이지를 불러오는 중 에러가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        if (propertyData.hasNext && page > 0) {
            fetchNextPage();
        }
    }, [page, propertyData.hasNext]);

    const loadMore = () => {
        if (isLoading || !propertyData.hasNext) return
        //console.log("Load more triggered. Waiting for timer...");
        setShowLoadingMessage(true);
        setTimeout(() => {
            console.log("Timer complete. Loading more data.");
            setPage(Page => Page + 1);
        }, 2000); // 2초 대기 후 페이지 증가
    }



    return {
        propertyData,
        isLoading,
        showLoadingMessage,
        error,
        loadMore,
    };
}