import React, { useState } from "react";
import styles from "../map/PropertyList.module.css";

const data = {
  houses: [
    { houseId: 1, latitude: 37.5815199, longitude: 126.8860032 },
    { houseId: 4, latitude: 37.581872, longitude: 126.885509 },
    { houseId: 5, latitude: 37.579324, longitude: 126.893571 },
    { houseId: 6, latitude: 37.580123, longitude: 126.882456 },
    { houseId: 7, latitude: 37.582456, longitude: 126.887654 },
    { houseId: 8, latitude: 37.583789, longitude: 126.889123 },
    { houseId: 9, latitude: 37.578654, longitude: 126.884321 },
    { houseId: 10, latitude: 37.576789, longitude: 126.881234 },
    { houseId: 11, latitude: 37.577456, longitude: 126.883789 },
    { houseId: 12, latitude: 37.578123, longitude: 126.886987 },
    { houseId: 13, latitude: 37.584321, longitude: 126.890123 },
    { houseId: 14, latitude: 37.585654, longitude: 126.892789 },
    { houseId: 15, latitude: 37.586123, longitude: 126.888456 },
    { houseId: 16, latitude: 37.587789, longitude: 126.889987 },
    { houseId: 17, latitude: 37.588654, longitude: 126.891234 },
  ],
  houseContents: [
    {
      houseId: 1,
      housingExpenses: "전세",
      deposit: 70000000,
      monthlyRentFee: 0,
      houseType: "아파트",
      gu: "마포구",
      dong: "상암동",
      maintenanceFee: 50000,
      comment: "10층 중 3층. 신축 풀옵션.........................",
      isbookmark: false,
      image: "/images/home.jpg",
    },
    {
      houseId: 4,
      housingExpenses: "월세",
      deposit: 30000000,
      monthlyRentFee: 1000000,
      houseType: "아파트",
      gu: "마포구",
      dong: "상암동",
      maintenanceFee: 150000,
      comment: "10층 중 7층. 올리모델링",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 5,
      housingExpenses: "전세",
      deposit: 80000000,
      monthlyRentFee: 0,
      houseType: "아파트",
      gu: "마포구",
      dong: "성산동",
      maintenanceFee: 80000,
      comment: "6층 중 2층. 생활편의시설 가까움",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 6,
      housingExpenses: "월세",
      deposit: 20000000,
      monthlyRentFee: 500000,
      houseType: "빌라",
      gu: "강남구",
      dong: "역삼동",
      maintenanceFee: 100000,
      comment: "5층 중 2층. 채광 좋음",
      isbookmark: false,
      image: "/images/home.jpg",
    },
    {
      houseId: 7,
      housingExpenses: "전세",
      deposit: 90000000,
      monthlyRentFee: 0,
      houseType: "오피스텔",
      gu: "서초구",
      dong: "서초동",
      maintenanceFee: 120000,
      comment: "8층 중 4층. 강남역 도보 5분",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 8,
      housingExpenses: "월세",
      deposit: 40000000,
      monthlyRentFee: 800000,
      houseType: "아파트",
      gu: "마포구",
      dong: "합정동",
      maintenanceFee: 70000,
      comment: "10층 중 5층. 교통 편리",
      isbookmark: false,
      image: "/images/home.jpg",
    },
    {
      houseId: 9,
      housingExpenses: "전세",
      deposit: 60000000,
      monthlyRentFee: 0,
      houseType: "투룸",
      gu: "송파구",
      dong: "잠실동",
      maintenanceFee: 50000,
      comment: "3층 중 1층. 조용한 주택가",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 10,
      housingExpenses: "월세",
      deposit: 10000000,
      monthlyRentFee: 300000,
      houseType: "원룸",
      gu: "광진구",
      dong: "건대입구",
      maintenanceFee: 30000,
      comment: "4층 중 2층. 대학가 근처",
      isbookmark: false,
      image: "/images/home.jpg",
    },
    {
      houseId: 11,
      housingExpenses: "전세",
      deposit: 75000000,
      monthlyRentFee: 0,
      houseType: "빌라",
      gu: "노원구",
      dong: "공릉동",
      maintenanceFee: 45000,
      comment: "5층 중 3층. 리모델링 완",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 12,
      housingExpenses: "월세",
      deposit: 5000000,
      monthlyRentFee: 250000,
      houseType: "원룸",
      gu: "강북구",
      dong: "미아동",
      maintenanceFee: 20000,
      comment: "3층 중 1층. 시장 근처",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 13,
      housingExpenses: "전세",
      deposit: 85000000,
      monthlyRentFee: 0,
      houseType: "아파트",
      gu: "종로구",
      dong: "혜화동",
      maintenanceFee: 40000,
      comment: "12층 중 8층. 서울대입구역 도보 10분",
      isbookmark: false,
      image: "/images/home.jpg",
    },
    {
      houseId: 14,
      housingExpenses: "월세",
      deposit: 35000000,
      monthlyRentFee: 550000,
      houseType: "투룸",
      gu: "용산구",
      dong: "이태원동",
      maintenanceFee: 60000,
      comment: "3층 중 2층. 외국인 거리 근처",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 15,
      housingExpenses: "전세",
      deposit: 95000000,
      monthlyRentFee: 0,
      houseType: "오피스텔",
      gu: "성동구",
      dong: "성수동",
      maintenanceFee: 65000,
      comment: "10층 중 6층. 카페 거리 뷰",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 16,
      housingExpenses: "월세",
      deposit: 20000000,
      monthlyRentFee: 400000,
      houseType: "원룸",
      gu: "동작구",
      dong: "사당동",
      maintenanceFee: 35000,
      comment: "6층 중 1층. 대형 마트 근처",
      isbookmark: true,
      image: "/images/home.jpg",
    },
    {
      houseId: 17,
      housingExpenses: "전세",
      deposit: 100000000,
      monthlyRentFee: 0,
      houseType: "아파트",
      gu: "강남구",
      dong: "압구정동",
      maintenanceFee: 90000,
      comment: "20층 중 10층. 강남역 도보 15분",
      isbookmark: true,
      image: "/images/home.jpg",
    },
  ],
};


const PropertyList = ({ onPropertyClick }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState(
    data.houseContents.filter((property) => property.isbookmark).map((property) => property.houseId)
  );

  const toggleBookmark = (propertyId) => {
    if (bookmarkedIds.includes(propertyId)) {
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== propertyId));
    } else {
      setBookmarkedIds([...bookmarkedIds, propertyId]);
    }
  };

  return (
    <div className={styles.listContainer}>
      {data.houseContents.map((property) => (
        <div
          key={property.houseId}
          className={styles.propertyItem}
          onClick={() => {
            if (onPropertyClick) onPropertyClick(property.houseId);
          }}
        >
          {/* 북마크 아이콘 */}
          <div
            className={styles.bookmarkWrapper}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(property.houseId);
            }}
          >
            {bookmarkedIds.includes(property.houseId) ? (
              <span style={{ color: "red", fontSize: "20px" }}>❤️</span>
            ) : (
              <span style={{ color: "gray", fontSize: "20px" }}>🤍</span>
            )}
          </div>
          {/* 이미지 */}
          <div className={styles.imageWrapper}>
            <img src={property.image} alt={property.houseType} className={styles.propertyImage} />
          </div>
          {/* 상세 정보 */}
          <div className={styles.propertyDetails}>
            <h2 className={styles.title}>
              {property.housingExpenses}{" "}
              {`${(property.deposit / 10000).toLocaleString()}`}
              {property.housingExpenses === "월세" &&
                `/${(property.monthlyRentFee / 10000).toLocaleString()}`}
            </h2>
            <p className={styles.location}>
              {property.gu} {property.dong}
            </p>
            <p className={styles.maintenance}>관리비: {property.maintenanceFee.toLocaleString()}원</p>
            <p className={styles.description}>
              {property.comment.length > 22
                ? `${property.comment.substring(0, 22)}...`
                : property.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;