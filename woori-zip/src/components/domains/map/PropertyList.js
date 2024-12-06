import React, { useState, useEffect } from "react";
import styles from "../map/PropertyList.module.css";
import { addBookmark, deleteBookmark } from "@/app/api/map/houseApi";

const PropertyList = ({ data = [], onPropertyClick }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // 데이터 변경 시 북마크 ID 초기화
  useEffect(() => {
    if (Array.isArray(data)) {
      const bookmarked = data
        .filter((property) => property && property.bookmark)
        .map((property) => Number(property.houseId)); // ID를 숫자로 변환
      setBookmarkedIds(bookmarked);
    }
  }, [data]);

  // 북마크 토글 처리
  const toggleBookmark = async (propertyId) => {
    try {
      const numericId = Number(propertyId);

      if (bookmarkedIds.includes(numericId)) {
        // 북마크 삭제 요청
        await deleteBookmark(numericId);
        setBookmarkedIds((prev) => prev.filter((id) => id !== numericId));
      } else {
        // 북마크 추가 요청
        await addBookmark(numericId);
        setBookmarkedIds((prev) => [...prev, numericId]);
      }
    } catch (error) {
      if (error.status === 409) {
        console.warn("이미 존재하는 북마크입니다. UI를 동기화합니다.");
        setBookmarkedIds((prev) => [...prev, Number(propertyId)]);
      } else {
        console.error("북마크 처리 실패:", error);
      }
    }
  };

  // 북마크 아이콘 렌더링
  const renderBookmarkIcon = (houseId) => {
    const numericId = Number(houseId); // ID를 숫자로 변환
    return bookmarkedIds.includes(numericId) ? (
      <span style={{ color: "yellow", fontSize: "20px" }}>★</span>
    ) : (
      <span style={{ color: "gray", fontSize: "20px" }}>★</span>
    );
  };

  // 렌더링
  return (
    <div className={styles.listContainer}>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((property) => (
          <div
            key={property.houseId}
            className={styles.propertyItem}
            onClick={() => onPropertyClick(Number(property.houseId))}
          >
            {/* 북마크 아이콘 */}
            <div
              className={styles.bookmarkWrapper}
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(property.houseId);
              }}
            >
              {renderBookmarkIcon(property.houseId)}
            </div>
            {/* 이미지 */}
            <div className={styles.imageWrapper}>
              <img
                src={property.representativeImage || "/images/home.jpg"}
                alt={property.houseType || "property"}
                className={styles.propertyImage}
              />
            </div>
            {/* 상세 정보 */}
            <div className={styles.propertyDetails}>
            <h2 className={styles.title}>
              {property.housingExpenses === "JEONSE"
                ? "전세"
                : property.housingExpenses === "MONTHLY_RENT"
                ? "월세"
                : property.housingExpenses}{" "}
              {`${(property.deposit / 10000).toLocaleString()}만원`}
              {property.housingExpenses === "월세" ||
                property.housingExpenses === "MONTHLY_RENT" &&
                ` / ${(property.monthlyRentFee / 10000).toLocaleString()}만원`}
            </h2>
              <p className={styles.location}>
                {property.gu || ""} {property.dong || ""}
              </p>
              <p className={styles.maintenance}>
                관리비: {(property.maintenanceFee || 0).toLocaleString()}원
              </p>
              <p className={styles.description}>
                {property.comment?.length > 17
                  ? `${property.comment.substring(0, 17)}...`
                  : property.comment || "설명 없음"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noData}>표시할 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default PropertyList;
