"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/domains/map/Sidebar";
import PropertyList from "../../components/domains/map/PropertyList";
import MapView from "../../components/domains/map/MapView";
import PropertyDetails from "../../components/domains/map/PropertyDetails";
import styles from "../../components/domains/map/map.module.css";
import NavBar from "../../components/domains/map/NavBar";
import CategoryMenu from "../../components/domains/map/CategoryMenu";
import MobileHeader from "../../components/domains/map/MobileHeader";
import { fetchHouseList, fetchHouseDetails } from "@/app/api/map/houseApi";
import { useSearchParams } from "next/navigation";

export default function MapPage() {
  //파라미터에서 값 가지고 오기
  const searchParams = useSearchParams();
  const analysisData = searchParams.get("category");
  const southWestLatitudeData = searchParams.get("southWestLatitude");
  const southWestLongitudeData = searchParams.get("southWestLongitude");
  const northEastLatitudeData = searchParams.get("northEastLatitude");
  const northEastLongitudeData = searchParams.get("northEastLongitude");

  const defaultFilters = {
    level: 7,
    southWestLatitude: southWestLatitudeData || 37.5189,
    southWestLongitude: southWestLongitudeData || 126.8952,
    northEastLatitude: northEastLatitudeData || 37.6157,
    northEastLongitude: northEastLongitudeData || 127.0601,
    minDeposit: 0,
    housetype: "아파트",
    maxDeposit: 1000000000,
    minMonthlyRentFee: 0,
    maxMonthlyRentFee: 2000000000,
    minMaintenanceFee: 0,
    maxMaintenanceFee: 5000000,
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapState, setMapState] = useState({ ...defaultFilters });
  const [houseType, setHouseType] = useState(defaultFilters.houseType);
  const [houseInfo, setHouseInfo] = useState({ houseContents: [], counts: [] });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [houseData, setHouseData] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);

  // 처음 처리 여부 관리
  const [isCategoryProcessed, setIsCategoryProcessed] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.5189,
    lng: 126.8952,
  });
  
  useEffect(() => {
    if (
      southWestLatitudeData &&
      southWestLongitudeData &&
      northEastLatitudeData &&
      northEastLongitudeData
    ) {
      setMapState((prevState) => ({
        ...prevState,
        southWestLatitude: parseFloat(southWestLatitudeData),
        southWestLongitude: parseFloat(southWestLongitudeData),
        northEastLatitude: parseFloat(northEastLatitudeData),
        northEastLongitude: parseFloat(northEastLongitudeData),
      }));
    }
  }, [
    southWestLatitudeData,
    southWestLongitudeData,
    northEastLatitudeData,
    northEastLongitudeData,
  ]);

  useEffect(() => {
    const savedHouseType = sessionStorage.getItem("selectedHouseType");
    console.log(savedHouseType);
    if (savedHouseType) {
      setHouseType(savedHouseType); // 초기값 설정
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 처음에만 category 처리
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        let filters = { ...defaultFilters };
  
        if (analysisData && !isCategoryProcessed) {
          filters = {
            ...filters,
            category: analysisData,
            walking: 10, // 기본값
            facilityCount: 3, // 기본값
          };
          setIsCategoryProcessed(true);
        }
  
        const data = await fetchHouseList(filters);
        console.log("리스트 데이터:   ", data);
        updateHouseData(data);
      } catch (error) {
        console.error("데이터가 없음:", error);
      }
    };
  
    loadInitialData();
  }, [analysisData, isCategoryProcessed]);
  

  const updateHouseData = (data) => {
    if (data?.houseContents) {
      setHouseInfo(data);
      setHouseData(data.houseContents);
      setMapLocations(
        data.houseContents.map((house) => ({
          lat: house.latitude,
          lng: house.longitude,
          houseId: house.houseId,
        }))
      );
    }
  };

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);
  const togglePropertyList = () => setIsExpanded(!isExpanded);

  const handleCategorySelect = (category) => setHouseType(category);
  const handlePropertyClick = async (propertyId) => {
    try {
      const data = await fetchHouseDetails(propertyId);
      setSelectedProperty(data);
    } catch (error) {
      console.error("Failed to load property details:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar houseType={houseType} onSelectCategory={handleCategorySelect} />
      <div className={styles.mainContent}>
        <NavBar
          houseType={houseType}
          mapState={mapState}
          analysisData={isCategoryProcessed ? null : analysisData}
          onHouseInfoUpdate={updateHouseData}
        />
        <div className={styles.contentArea}>
          {isMobile ? (
            <MobilePropertyList
              data={houseData}
              isExpanded={isExpanded}
              togglePropertyList={togglePropertyList}
              onPropertyClick={handlePropertyClick}
            />
          ) : (
            <PropertyList
              data={houseData}
              className={styles.webPropertyList}
              onPropertyClick={handlePropertyClick}
            />
          )}
          <MapView
            property={selectedProperty}
            locations={mapLocations}
            selectedLocation={selectedLocation}
            onMapChange={setMapState}
            mapViewData={houseInfo}
          />
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </div>
      </div>
      {isCategoryMenuVisible && (
        <CategoryMenu
          isVisible={isCategoryMenuVisible}
          onClose={toggleCategoryMenu}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          houseType={houseType}
          mapState={mapState}
          analysysData={analysisData}
          onApply={(filterData) => {
            console.log("Applied Filter Data:", filterData);
          }}
        />
      )}
      {isMobile && (
        <MobileHeader
          onHamburgerClick={toggleSidebar}
          onFilterClick={toggleCategoryMenu}
        />
      )}
    </div>
  );
}

function MobilePropertyList({ data, isExpanded, togglePropertyList, onPropertyClick }) {
  return (
    <div
      className={styles.mobilePropertyList}
      style={{ height: isExpanded ? "50vh" : "10vh" }}
    >
      <div className={styles.handle} onClick={togglePropertyList}>
        <div className={styles.handleText}>집 목록 보기</div>
      </div>
      <PropertyList data={data} onPropertyClick={onPropertyClick} />
    </div>
  );
}
