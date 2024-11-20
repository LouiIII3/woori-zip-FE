import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../map/CategoryMenu.module.css";
import RangeSlider from "./RangeSlider";

export default function CategoryMenu({
  isVisible,
  onClose,
  buttonRef,
  onApply,
  mapState,
  houseType,
}) {
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [depositRange, setDepositRange] = useState([0, 2000000]); // 보증금 범위
  const [monthlyRentRange, setMonthlyRentRange] = useState([0, 400000]); // 월세 범위
  const [maintenanceRange, setMaintenanceRange] = useState([0, 50000]); // 관리비 범위

  const [selectedTransactionType, setSelectedTransactionType] = useState(""); // 거래 유형
  const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리
  const [walkingDistance, setWalkingDistance] = useState(10); // 도보 거리
  const [facilityCount, setFacilityCount] = useState(3); // 시설 개수

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393); // 모바일 화면 너비 설정
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (buttonRef?.current && isVisible && !isMobile) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.left - 150,
      });
    }
  }, [isVisible, buttonRef, isMobile]);

  const handleApply = () => {
    if (isMobile) {
        // URLSearchParams 객체 생성
        const params = new URLSearchParams();

        // 조건부로 매개변수를 추가
        if (mapState.zoomLevel) params.append("level", mapState.zoomLevel);
        if (mapState.southWestLatitude) params.append("southWestLatitude", mapState.southWestLatitude);
        if (mapState.southWestLongitude) params.append("southWestLongitude", mapState.southWestLongitude);
        if (mapState.northEastLatitude) params.append("northEastLatitude", mapState.northEastLatitude);
        if (mapState.northEastLongitude) params.append("northEastLongitude", mapState.northEastLongitude);
        if (houseType) params.append("houseType", houseType);
        if (selectedTransactionType && selectedTransactionType !== "모두") {
            params.append("housingExpenses", selectedTransactionType);
        }
        if (depositRange[0] || depositRange[1]) {
            params.append("minDeposit", depositRange[0]);
            params.append("maxDeposit", depositRange[1]);
        }
        if (monthlyRentRange[0] || monthlyRentRange[1]) {
            params.append("minMonthlyRentFee", monthlyRentRange[0]);
            params.append("maxMonthlyRentFee", monthlyRentRange[1]);
        }
        if (maintenanceRange[0] || maintenanceRange[1]) {
            params.append("minMaintenanceFee", maintenanceRange[0]);
            params.append("maxMaintenanceFee", maintenanceRange[1]);
        }
        if (selectedCategory && selectedCategory !== "선택하지 않음") {
            params.append("category", selectedCategory);
        }
        if (walkingDistance) params.append("walking", walkingDistance);
        if (facilityCount) params.append("facilityCount", facilityCount);

        const apiUrl = `http://localhost:8080/api/v1/houses?${params.toString()}`;
        console.log(`요청 URL: ${apiUrl}`);

        fetch(apiUrl, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("네트워크 응답에 문제가 있습니다.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("API 응답 데이터:", data);
            })
            .catch((error) => {
                console.error("API 호출 오류:", error);
            });
    }
    onApply({
      selectedCategory,
      walkingDistance,
      facilityCount,
      depositRange,
      monthlyRentRange,
      maintenanceRange,
      selectedTransactionType,
    });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`${isMobile ? styles.mobileMenu : styles.webMenu}`}
      style={!isMobile ? { top: `${position.top}px`, left: `${position.left}px` } : {}}
      onClick={(e) => e.stopPropagation()}
    >
      {isMobile ? (
        <>
          <div className={styles.header}>
            <h4 className={styles.menuTitle}>거래 유형</h4>
            <div className={styles.toggleButtons}>
              {["모두", "월세", "전세"].map((type) => (
                <button
                  key={type}
                  className={`${styles.toggleButton} ${
                    selectedTransactionType === type ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedTransactionType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 보증금 범위 */}
          <RangeSlider
            values={depositRange}
            min={0}
            max={200000000}
            step={100000}
            onChange={(values) => setDepositRange(values)}
            label="보증금 금액 범위"
            unit={10000}
          />

          {/* 월세 범위 */}
          <RangeSlider
            values={monthlyRentRange}
            min={0}
            max={400000000}
            step={100000}
            onChange={(values) => setMonthlyRentRange(values)}
            label="월세 금액 범위"
            unit={10000}
          />

          {/* 관리비 범위 */}
          <RangeSlider
            values={maintenanceRange}
            min={0}
            max={50000000}
            step={10000}
            onChange={(values) => setMaintenanceRange(values)}
            label="관리비 금액 범위"
            unit={10000}
          />

          <div className={styles.options}>
            <label className={styles.categoryLabel}>카테고리</label>
            {["선택하지 않음", "자동차정비/유지", "문화/취미", "서적/문구", "의류", "요식업", "식당/카페"].map(
              (category) => (
                <button
                  key={category}
                  className={`${styles.optionButton} ${
                    selectedCategory === category ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>집에서부터 도보 거리</label>
            <div className={styles.inputFieldWrapper}>
              <input
                type="number"
                value={walkingDistance}
                onChange={(e) => setWalkingDistance(Number(e.target.value))}
                className={styles.inputField}
              />
              <span className={styles.unitLabel}>분</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>카테고리 시설 개수</label>
            <div className={styles.inputFieldWrapper}>
              <input
                type="number"
                value={facilityCount}
                onChange={(e) => setFacilityCount(Number(e.target.value))}
                className={styles.inputField}
              />
              <span className={styles.unitLabel}>개</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.cancelButton} onClick={onClose}>
              닫기
            </button>
            <button className={styles.applyButton} onClick={handleApply}>
              적용
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <h4 className={styles.menuTitle}>카테고리</h4>
            <span className={styles.menuDescription}>카테고리는 1가지만 선택 가능합니다.</span>
          </div>
          <div className={styles.options}>
            {['선택하지 않음', '자동차정비/유지', '문화/취미', '서적/문구', '의류', '요식업', '식당/카페'].map((category) => (
              <button
                key={category}
                className={`${styles.optionButton} ${selectedCategory === category ? styles.selected : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>집에서부터 도보 거리</label>
            <div className={styles.inputFieldWrapper}>
              <input
                type="number"
                value={walkingDistance}
                onChange={(e) => setWalkingDistance(e.target.value)}
                className={styles.inputField}
              />
              <span className={styles.unitLabel}>분</span>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>카테고리 시설 개수</label>
            <div className={styles.inputFieldWrapper}>
              <input
                type="number"
                value={facilityCount}
                onChange={(e) => setFacilityCount(e.target.value)}
                className={styles.inputField}
              />
              <span className={styles.unitLabel}>개</span>
            </div>
          </div>
          <button className={styles.applyButton} onClick={() => {handleApply();onClose();}}>
            적용
          </button>
        </>
      )}
    </div>
  );
}
