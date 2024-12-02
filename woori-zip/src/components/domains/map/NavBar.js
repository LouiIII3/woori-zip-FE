"use client";
import React, { useRef, useState, useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import RangeSlider from "./RangeSlider";
import styles from "../map/NavBar.module.css";
import Link from 'next/link';
import { fetchHousesByMapStateApi, fetchHousesByFinalFilterApi } from "@/app/api/map/houseApi";

export default function NavBar({ onHouseInfoUpdate, houseType, mapState, analysisData }) {
    const [isCategoryVisible, setCategoryVisible] = useState(false);
    const [isMaintenanceVisible, setMaintenanceVisible] = useState(false);
    const [isRentTypeVisible, setRentTypeVisible] = useState(false);
    const [isPriceVisible, setPriceVisible] = useState(false);

    const [depositRange, setDepositRange] = useState([0, 1000000000]); 
    const [priceRange, setPriceRange] = useState([0, 2000000000]); 
    const [maintenanceRange, setMaintenanceRange] = useState([0, 5000000]); 
    const [rentType, setRentType] = useState("모두");
    const [prevMapState, setPrevMapState] = useState(null); 
    const [categoryState, setCategoryState] = useState({
        category: "선택하지 않음", 
        walkingDistance: 0,
        facilityCount: 0,
    });

    // analysisData 변경 시 categoryState 업데이트
    useEffect(() => {
        if (analysisData) {
            setCategoryState((prevState) => ({
                ...prevState,
                category: analysisData,
                walkingDistance: 10,
                facilityCount: 3,
            }));
        }
    }, [analysisData]);

    const categoryButtonRef = useRef(null);
    const maintenanceButtonRef = useRef(null);
    const rentTypeButtonRef = useRef(null);
    const priceButtonRef = useRef(null);

    const navRef = useRef(null); 

    // 외부 클릭 이벤트 처리
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setCategoryVisible(false);
                setMaintenanceVisible(false);
                setRentTypeVisible(false);
                setPriceVisible(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // 지도 상태가 변경될 때 데이터 요청
    useEffect(() => {
        if (!mapState || JSON.stringify(mapState) === JSON.stringify(prevMapState)) {
            return;
        }
        console.log("data 정보",analysisData)
        fetchHousesByMapStateApi({
            mapState,
            houseType,
            rentType,
            depositRange,
            priceRange,
            maintenanceRange,
            categoryState
        })
            .then((data) => {
                const updatedData = data.houseContents.map((house) => ({
                    ...house,
                    bookmark: house.bookmark ?? false, 
                }));
                
                // 상태 업데이트
                onHouseInfoUpdate({
                    ...data,
                    houseContents: updatedData,
                });
                setPrevMapState(mapState);
            });
    }, [mapState, onHouseInfoUpdate, prevMapState, houseType, rentType, depositRange, priceRange, maintenanceRange, categoryState]);

    // 최종 적용 버튼 클릭 시 동작
    const handleFinalApply = () => {
        fetchHousesByFinalFilterApi({
            mapState,
            houseType,
            rentType,
            depositRange,
            priceRange,
            maintenanceRange,
            categoryState,
        })
            .then((data) => {
                console.log("최종 필터 데이터:", data);
                onHouseInfoUpdate(data);
            })
            .catch((error) => {
                console.error("최종 필터 API 호출 오류:", error);
            });
    };

    // 추가된 코드: 한 번에 한 모달만 열리도록 설정
    const openModal = (modalSetter) => {
        setCategoryVisible(false);
        setMaintenanceVisible(false);
        setRentTypeVisible(false);
        setPriceVisible(false);
        modalSetter(true);
    };

    // 카테고리 적용
    const handleCategoryApply = (updatedState) => {
        setCategoryState(updatedState);
        setCategoryVisible(false);
    };

    const toggleModal = (modalSetter, isVisible) => {
        setCategoryVisible(false);
        setMaintenanceVisible(false);
        setRentTypeVisible(false);
        setPriceVisible(false);

        // 현재 모달이 열려 있는 경우 닫기, 아니면 열기
        modalSetter(!isVisible);
    };

    return (
        <div ref={navRef} className={styles.navBar}>
            <div className={styles.webNav}>
                {/* 월세/전세 버튼 */}
                <button
                    ref={rentTypeButtonRef}
                    onClick={() => toggleModal(setRentTypeVisible, isRentTypeVisible)}
                    className={styles.filterButton}
                >
                    월세, 전세 ∨
                </button>
                {isRentTypeVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: rentTypeButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: rentTypeButtonRef.current.getBoundingClientRect().left - 80,
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
                    onClick={() => toggleModal(setPriceVisible, isPriceVisible)}
                    className={styles.filterButton}
                >
                    거래 금액 ∨
                </button>
                {isPriceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: priceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: priceButtonRef.current.getBoundingClientRect().left - 80,
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
                    onClick={() => toggleModal(setMaintenanceVisible, isMaintenanceVisible)}
                    className={styles.filterButton}
                >
                    관리비 ∨
                </button>
                {isMaintenanceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: maintenanceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: maintenanceButtonRef.current.getBoundingClientRect().left - 80,
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
                    onClick={() => toggleModal(setCategoryVisible, isCategoryVisible)}
                    className={styles.categoryButton}
                >
                    카테고리 ∨
                </button>
                {isCategoryVisible && (
                    <CategoryMenu
                        isVisible={isCategoryVisible}
                        onClose={() => setCategoryVisible(false)}
                        buttonRef={categoryButtonRef}
                        categoryState={categoryState}
                        onApply={handleCategoryApply}
                    />
                )}
            </div>

            {/* 최종 적용 버튼 */}
            <button onClick={handleFinalApply} className={styles.applyButton}>
                검색
            </button>

            <div className={styles.authButtons}>
                <Link href="/user/login">
                    <button className={styles.authButton}>로그인</button>
                </Link>
                <Link href="/user/register">
                    <button className={styles.authButton}>회원가입</button>
                </Link>
            </div>
        </div>
    );
}
