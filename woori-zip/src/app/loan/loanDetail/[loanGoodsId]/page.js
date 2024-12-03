"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Details from '@/components/domains/loan/loanDetail/Detail';
import WebViewLoanDetail from '@/components/domains/loan/loanDetail/WebViewLoanDetail';

export default function LoanDetail() {
  const { loanGoodsId } = useParams();
  const [loanDetails, setLoanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!loanGoodsId) return;  

    const fetchLoanDetails = async () => {
      console.log('API 호출 시작', loanGoodsId);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loans/${loanGoodsId}`);
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setLoanDetails(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);  
    fetchLoanDetails();  
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

