"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Details from '@/components/domains/loan/loanDetail/Detail';
import WebViewLoanDetail from '@/components/domains/loan/loanDetail/WebViewLoanDetail';
import { fetchLoanDetails } from '@/app/api/loan/loanAPI';

export default function LoanDetail() {
  const { loanGoodsId } = useParams();
  const [loanDetails, setLoanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!loanGoodsId) return;  

    const showLoanDetails = async () => {
      try {
        setIsLoading(true);  
        const data = await fetchLoanDetails(loanGoodsId); 
        setLoanDetails(data); 
      } catch (err) {
        console.error("Error fetching loan details:", err);
        setError("대출 정보를 불러오는 데 실패했습니다."); 
      } finally {
        setIsLoading(false); 
      }
    };

    setIsLoading(true);  
    showLoanDetails();  
  }, [loanGoodsId]);  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  if (isLoading) return <p>로딩 중...</p>; 

  if (error) return <p>{error}</p>; 
  
  return (
    <>
    {isMobile ? (
        <WebViewLoanDetail loanDetails={loanDetails} />
      ) : (<Details loanDetails={loanDetails}/>    

    )}
    </>
  );
};

