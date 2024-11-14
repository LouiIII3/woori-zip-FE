import React from 'react'
import BackCard from '@/components/domains/loan/loanRecommendation/BackCard';
import BottomCard from '@/components/domains/loan/loanRecommendation/BottomCard';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function LoanRecommendation() {
  return (
    <>
      <Header></Header>
      <BackCard/>
      <BottomCard/>
      <Footer></Footer>
    </>
  );
};

