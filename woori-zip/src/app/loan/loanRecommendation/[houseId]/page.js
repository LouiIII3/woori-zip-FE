"use client"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import WideCard from '@/components/domains/loan/loanRecommendation/WideCard';
import BottomCard from '@/components/domains/loan/loanRecommendation/BottomCard';
import { fetchLoanRecommendations } from '@/app/api/loan/loanAPI';

export default function LoanRecommendation() {
  const { houseId } = useParams();
  const [loanRecommendations, setLoanRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
 

  useEffect(() => {
    const fetchData = async () => {
    if (!houseId) return;
      try {
        const data = await fetchLoanRecommendations(houseId); 
        setLoanRecommendations(data);
      } catch (err) {
        console.error("Error fetching initial loan recommendations:", err);
        setError("대출 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [houseId]); 

  const handleDataChange = (newData) => {
    setLoanRecommendations(newData); 
  };

  if (isLoading) return <p>로딩 중...</p>;

  if (error) return <p>{error}</p>;


  return (
    <>
          <WideCard onDataChange={handleDataChange} houseId={houseId}/>
          <BottomCard loanRecommendations={loanRecommendations}   />

    </>
  );
}