"use client";

import { useState, useEffect } from "react";
import styles from "./PropertyGrid.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PropertyGrid() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedHouseType, setSelectedHouseType] = useState("아파트");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (houseType) => {
    if (houseType !== selectedHouseType) {
      sessionStorage.setItem("selectedHouseType", houseType); // 세션 저장
      setSelectedHouseType(houseType); // 상태 업데이트
    }
  };
  

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
          {/* 카드 1 */}
          <Link href="/map" className={styles.property_card} onClick={() => handleCardClick("원/투룸")}>
            <div>
              <h2>원/투룸</h2>
              <p>
                주택/빌라, 오피스텔, 아파트까지
                <br />
                모~든 전월세 매물을 한 번에!
              </p>
              <img
                src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/oneroom.png"
                alt="원룸 이미지"
              />
            </div>
          </Link>

          {/* 카드 2 */}
          <Link href="/map" className={styles.property_card} onClick={() => handleCardClick("오피스텔")}>
            <div>
              <h2>오피스텔</h2>
              <p>
                다양한 정보와 다양한 매물!
                <br />
                최신 실거래가 알림과 풍부한 오피스텔 정보!
                <br />
              </p>
              <img
                src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/officetel.png"
                alt="오피스텔 이미지"
              />
            </div>
          </Link>

          {/* 카드 3 */}
          <Link href="/map" className={styles.property_card} onClick={() => handleCardClick("주택/빌라")}>
            <div>
              <h2>주택/빌라</h2>
              <p>
                전월세부터 매매까지
                <br />
                모~든 매물!
              </p>
              <img
                src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/house.png"
                alt="주택 이미지"
              />
            </div>
          </Link>

          {/* 카드 4 */}
          <Link href="/map" className={styles.property_card} onClick={() => handleCardClick("아파트")}>
            <div>
              <h2>아파트</h2>
              <p>
                가장 빠른 실거래가 알림!
                <br />
                풍부한 단지정보 및 실시간 랭킹까지!
              </p>
              <img
                src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/apartment.png"
                alt="아파트 이미지"
              />
            </div>
          </Link>
        </div>

        <div className={styles.info_banner}>
          <Link href="/analysis">
            <div>
              <h2>
                <span className={styles.blue_text}>소비 패턴 분석</span>
                <span className={styles.black_text}>
                  을 통한 <br />
                  맞춤형 카테고리 별 집 추천
                </span>
              </h2>
              <div className={styles.info_graph_text}>
                <p>소비 패턴을 분석하여,</p>
                <p>개인이 선호하는 인프라가 형성된</p>
                <p>맞춤형 매물을 추천하는 서비스</p>
              </div>
              <div className={styles.Image_big}>
                <Image
                  src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mainpage/bar-chart.png"
                  width={isMobile ? 80 : 150}
                  height={isMobile ? 80 : 150}
                  alt="Graph"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
