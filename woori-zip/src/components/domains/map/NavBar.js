"use client";
import React, { useRef, useState, useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import RangeSlider from "./RangeSlider"; // RangeSlider 컴포넌트 추가
import styles from "../map/NavBar.module.css";

export default function NavBar({ onHouseInfoUpdate, houseType, mapState }) {
    const [isCategoryVisible, setCategoryVisible] = useState(false);
    const [isMaintenanceVisible, setMaintenanceVisible] = useState(false);
    const [isRentTypeVisible, setRentTypeVisible] = useState(false);
    const [isPriceVisible, setPriceVisible] = useState(false);

    const [depositRange, setDepositRange] = useState([0, 100000]); // 보증금 범위
    const [priceRange, setPriceRange] = useState([0, 1000000]); // 월세 범위
    const [maintenanceRange, setMaintenanceRange] = useState([0, 50000]); // 관리비 범위
    const [rentType, setRentType] = useState("모두");
    const [houseInfo, setHouseInfo] = useState(null);


    const [categoryState, setCategoryState] = useState({
        category: "선택하지 않음", // 다른 분류를 관리
        walkingDistance: 0,
        facilityCount: 0,
    });

    const categoryButtonRef = useRef(null);
    const maintenanceButtonRef = useRef(null);
    const rentTypeButtonRef = useRef(null);
    const priceButtonRef = useRef(null);

    // 카테고리 메뉴 토글
    const toggleCategoryVisibility = () => {
        setCategoryVisible((prev) => !prev);
    };

    // 카테고리 적용
    const handleCategoryApply = (updatedState) => {
        setCategoryState(updatedState);
        setCategoryVisible(false);
    };

    // 최종 적용 버튼 클릭 시 동작
    const handleFinalApply = () => {
        // console.log("카테고리 상태 (categoryState):", categoryState);
        // console.log(`보증금 범위: ${depositRange[0] / 10000}만 - ${depositRange[1] / 10000}만`);
        // console.log(`월세 범위: ${priceRange[0] / 10000}만 - ${priceRange[1] / 10000}만`);
        // console.log(`관리비 범위: ${maintenanceRange[0] / 10000}만 - ${maintenanceRange[1] / 10000}만`);
        // console.log("주택 유형 (houseType):", houseType);
        // console.log("현재 지도 상태:", mapState);
        // console.log("카테고리 세부 사항:", categoryState.category);

        const params = new URLSearchParams();

        // 조건부로 파라미터 추가
        if (mapState.zoomLevel !== undefined) params.append("level", mapState.zoomLevel);
        if (mapState.southWestLatitude !== undefined) params.append("southWestLatitude", mapState.southWestLatitude);
        if (mapState.southWestLongitude !== undefined) params.append("southWestLongitude", mapState.southWestLongitude);
        if (mapState.northEastLatitude !== undefined) params.append("northEastLatitude", mapState.northEastLatitude);
        if (mapState.northEastLongitude !== undefined) params.append("northEastLongitude", mapState.northEastLongitude);
        if (houseType) params.append("houseType", houseType);
        if (rentType !== "모두") params.append("housingExpenses", rentType);
        if (depositRange[0] >= 0) params.append("minDeposit", depositRange[0]);
        if (depositRange[1] >= 0) params.append("maxDeposit", depositRange[1]);
        if (priceRange[0] >= 0) params.append("minMonthlyRentFee", priceRange[0]);
        if (priceRange[1] >= 0) params.append("maxMonthlyRentFee", priceRange[1]);
        if (maintenanceRange[0] >= 0) params.append("minMaintenanceFee", maintenanceRange[0]);
        if (maintenanceRange[1] >= 0) params.append("maxMaintenanceFee", maintenanceRange[1]);
        if (categoryState.category && categoryState.category !== "선택하지 않음") {
            params.append("category", categoryState.category);
        }
        if (categoryState.walkingDistance > 0) params.append("walking", categoryState.walkingDistance);
        if (categoryState.facilityCount > 0) params.append("facilityCount", categoryState.facilityCount);

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
            onHouseInfoUpdate(data);
        })
        .catch((error) => {
            console.error("API 호출 오류:", error);
        });    
    };


    useEffect(() => {
        console.log("NavBar에서 전달받은 houseType (주택 유형):", houseType);
    }, [houseType]);

    useEffect(() => {
        console.log("NavBar에서 전달받은 지도 상태 (mapState):", mapState);
    }, [mapState]);

    return (
        <div className={styles.navBar}>
            <div className={styles.webNav}>
                {/* 월세/전세 버튼 */}
                <button
                    ref={rentTypeButtonRef}
                    onClick={() => setRentTypeVisible((prev) => !prev)}
                    className={styles.filterButton}
                >
                    월세, 전세 ▼
                </button>
                {isRentTypeVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: rentTypeButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: rentTypeButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
                        <h4 className={styles.menuTitle}>거래 유형</h4>
                        <div className={styles.toggleButtons}>
                            {["모두", "월세", "전세"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setRentType(type)}
                                    className={`${styles.toggleButton} ${rentType === type ? styles.selected : ""}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setRentTypeVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 거래 금액 버튼 */}
                <button
                    ref={priceButtonRef}
                    onClick={() => setPriceVisible((prev) => !prev)}
                    className={styles.filterButton}
                >
                    거래 금액 ▼
                </button>
                {isPriceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: priceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: priceButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
                        {/* 보증금 범위 */}
                        <RangeSlider
                            values={depositRange}
                            min={0}
                            max={1000000000}
                            step={10000}
                            onChange={(values) => setDepositRange(values)}
                            label="보증금 범위"
                            unit={10000}
                        />
                        {/* 월세 금액 범위 */}
                        <RangeSlider
                            values={priceRange}
                            min={0}
                            max={2000000000}
                            step={100000}
                            onChange={(values) => setPriceRange(values)}
                            label="월세 금액 범위"
                            unit={10000}
                        />
                        <button onClick={() => setPriceVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 관리비 버튼 */}
                <button
                    ref={maintenanceButtonRef}
                    onClick={() => setMaintenanceVisible((prev) => !prev)}
                    className={styles.filterButton}
                >
                    관리비 ▼
                </button>
                {isMaintenanceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: maintenanceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: maintenanceButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
                        <RangeSlider
                            values={maintenanceRange}
                            min={0}
                            max={5000000}
                            step={10000}
                            onChange={(values) => setMaintenanceRange(values)}
                            label="관리비 금액 범위"
                            unit={10000}
                        />
                        <button onClick={() => setMaintenanceVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 카테고리 버튼 */}
                <button
                    ref={categoryButtonRef}
                    onClick={toggleCategoryVisibility}
                    className={styles.categoryButton}
                >
                    카테고리 ▼
                </button>
                {isCategoryVisible && (
                    <CategoryMenu
                        isVisible={isCategoryVisible}
                        onClose={toggleCategoryVisibility}
                        buttonRef={categoryButtonRef}
                        categoryState={categoryState}
                        onApply={handleCategoryApply}
                    />
                )}
            </div>

            {/* 최종 적용 버튼 */}
            <button onClick={handleFinalApply} className={styles.applyButton}>
                적용 최종
            </button>
        </div>
    );
}
