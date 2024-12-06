"use client";
import React, { useRef, useState, useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import RangeSlider from "./RangeSlider";
import styles from "../map/NavBar.module.css";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { fetchHousesByMapStateApi, fetchHousesByFinalFilterApi } from "@/app/api/map/houseApi";

export default function NavBar({ onHouseInfoUpdate, houseType, mapState, analysisData }) {
  const { data: session, status } = useSession();
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isMaintenanceVisible, setMaintenanceVisible] = useState(false);
  const [isRentTypeVisible, setRentTypeVisible] = useState(false);
  const [isPriceVisible, setPriceVisible] = useState(false);

  const [depositRange, setDepositRange] = useState([0, 1000000000]);
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  const [maintenanceRange, setMaintenanceRange] = useState([0, 5000000]);
  const [rentType, setRentType] = useState("모두");
  const [categoryState, setCategoryState] = useState({
    category: "선택하지 않음",
    walkingDistance: 0,
    facilityCount: 0,
  });

  const categoryButtonRef = useRef(null);
  const maintenanceButtonRef = useRef(null);
  const rentTypeButtonRef = useRef(null);
  const priceButtonRef = useRef(null);
  const prevRequestStateRef = useRef(null);
  const navRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  const handleLogout = () => {
    signOut();
    setProfileMenuVisible(false);
  };

  // Update category state when analysisData changes
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

  // Handle outside clicks to close modals
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

  // Fetch data when map state changes
  useEffect(() => {
    if (!mapState || !houseType) {
      return; // Don't fetch if required states are missing
    }

    const currentRequestState = {
      mapState,
      houseType,
      rentType,
      depositRange,
      priceRange,
      maintenanceRange,
      categoryState,
    };

    // Avoid duplicate requests
    if (
      prevRequestStateRef.current &&
      JSON.stringify(currentRequestState) === JSON.stringify(prevRequestStateRef.current)
    ) {
      return;
    }

    fetchHousesByMapStateApi(currentRequestState)
      .then((data) => {
        const updatedData = data.houseContents.map((house) => ({
          ...house,
          bookmark: house.bookmark ?? false,
        }));

        onHouseInfoUpdate({
          ...data,
          houseContents: updatedData,
        });

        prevRequestStateRef.current = currentRequestState; // Save current state in ref
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, [
    mapState,
    houseType,
    rentType,
    depositRange,
    priceRange,
    maintenanceRange,
    categoryState,
    onHouseInfoUpdate,
  ]);

  // Handle final apply button
  const handleFinalApply = () => {
    if (!houseType) {
      return; // Don't fetch if houseType is missing
    }

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
        onHouseInfoUpdate(data);
      })
      .catch((error) => {
        console.error("최종 필터 API 호출 오류:", error);
      });
  };

  // Toggle modal visibility
  const toggleModal = (modalSetter, isVisible) => {
    setCategoryVisible(false);
    setMaintenanceVisible(false);
    setRentTypeVisible(false);
    setPriceVisible(false);

    modalSetter(!isVisible);
  };

  // Apply category changes
  const handleCategoryApply = (updatedState) => {
    setCategoryState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
    setCategoryVisible(false);
  };

  return (
    <div ref={navRef} className={styles.navBar}>
      <div className={styles.webNav}>
        {/* Rent Type Button */}
        <button
          ref={rentTypeButtonRef}
          onClick={() => toggleModal(setRentTypeVisible, isRentTypeVisible)}
          className={styles.filterButton}
        >
          {rentType} ∨
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

        {/* Price Range Button */}
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
            <RangeSlider
              values={depositRange}
              min={0}
              max={1000000000}
              step={10000}
              onChange={(values) => setDepositRange(values)}
              label="보증금 범위"
              unit={10000}
            />
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

        {/* Maintenance Fee Button */}
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

        {/* Category Button */}
        <button
          ref={categoryButtonRef}
          onClick={() => toggleModal(setCategoryVisible, isCategoryVisible)}
          className={styles.categoryButton}
        >
          {categoryState.category === "선택하지 않음" ? "카테고리" : `카테고리 (${categoryState.category})`} ∨
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

      {/* Final Apply Button */}
      <button onClick={handleFinalApply} className={styles.applyButton}>
        검색
      </button>

      {/* Login/Signup or Profile */}
      <div className={styles.authButtons}>
        {status === "loading" ? (
          <div>로딩 중...</div>
        ) : session?.user ? (
          <div className={styles.profile_menu}>
            <img
              src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/profile.png"
              alt="Profile"
              className={styles.profile_image}
              onClick={toggleProfileMenu}
            />
            {isProfileMenuVisible && (
              <div className={styles.dropdown}>
                <div className={styles.dropdown_header}>
                  <img
                    src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/profile.png"
                    alt="Profile"
                    className={styles.dropdown_profile_image}
                  />
                  <span className={styles.dropdown_user_name}>{session.user.name} 님</span>
                </div>
                <hr className={styles.dropdown_divider} />
                <div
                  className={styles.dropdown_item}
                  onClick={() => {
                    setProfileMenuVisible(false);
                    window.location.href = "/mypage";
                  }}
                >
                  마이페이지
                </div>
                <div className={styles.dropdown_item} onClick={handleLogout}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link href="/user/signup" className={styles.signup_link}>
              회원가입
            </Link>
            <button
              className={styles.login_button}
              onClick={() => {
                signIn().then(() => router.push("/"));
              }}
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
