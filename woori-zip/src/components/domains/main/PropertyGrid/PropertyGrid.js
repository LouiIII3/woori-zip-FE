"use client";

import { useState, useEffect } from 'react';
import styles from './PropertyGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyGrid() {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
   const handleResize = () => {
     setIsMobile(window.innerWidth <= 393);
   };
   handleResize();
   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 return (
   <div className={styles.container}>
     <div className={styles.top_text}>
       <h1>어떤 집을 찾고 계신가요?</h1>
       <h2>
         <span className={styles.blue_text}>우리집</span>에서, 원하는 집으로 편리한 입주하기
       </h2>
     </div>

     <div className={styles.property_grid}>
       <div className={styles.property_section}>
         <div className={styles.property_card}>
           <Link href="/map">
             <h2>원/투룸</h2>
             <img src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/home-svgrepo-com+2+(1).png" alt="원룸 이미지" />
           </Link>
         </div>
         <div className={styles.property_card}>
           <Link href="/map">
             <h2>오피스텔</h2>
             <img src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/buildings-3-svgrepo-com+2+(1).png" alt="오피스텔 이미지" />
           </Link>
         </div>
         <div className={styles.property_card}>
           <Link href="/map">
             <h2>주택/빌라</h2>
             <img src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/Frame+224+(1).png" alt="주택 이미지" />
           </Link>
         </div>
         <div className={styles.property_card}>
           <Link href="/map">
             <h2>아파트</h2>
             <img src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/buildings-svgrepo-com+(2)+1+(1).png" alt="아파트 이미지" />
           </Link>
         </div>
       </div>

       <div className={styles.info_banner}>
         <Link href="/">
           <h2>
             <span className={styles.blue_text}>소비 패턴 분석을 통한</span>
             <span className={styles.black_text}>맞춤형 카테고리 별 집 추천</span>
           </h2>
           <div className={styles.info_graph_text}>
             <p>소비 패턴을 분석하여,</p>
             <p>개인이 선호하는 인프라가 형성된</p>
             <p>맞춤형 매물을 추천하는 서비스</p>
           </div>
           <div className={styles.Image_big}>
             <Image 
               src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/bar-chart+1.png" 
               width={isMobile ? 80 : 150} 
               height={isMobile ? 80 : 150} 
               alt="Graph" 
             />
           </div>
         </Link>
       </div>
     </div>
   </div>
 );
}