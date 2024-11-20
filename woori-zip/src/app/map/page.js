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

export default function Home() {
  const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapState, setMapState] = useState({});
  const [houseType, setHouseType] = useState("원/투룸");
  const [houseInfo, setHouseInfo] = useState(null); // Remove initial dummy data
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);

  const togglePropertyList = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCategorySelect = (category) => {
    setHouseType(category);
  };

  const handleHouseInfoUpdate = (data) => {
    setHouseInfo(data);
  };

  const handlePropertyClick = async (propertyId) => {
    console.log("Clicked Property ID:", propertyId);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/houses/${propertyId}`);
      if (!response.ok) throw new Error("Failed to fetch property details");
      const data = await response.json();
      console.log("Fetched Property Details:", data);
      setSelectedProperty(data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const handleClosePropertyDetails = () => {
    setSelectedProperty(null); // Close the property details modal
  };

  useEffect(() => {
    console.log("Selected Property Details:", selectedProperty);
  }, [selectedProperty]);

  return (
    <div className={styles.container}>
      <Sidebar
        houseType={houseType}
        onSelectCategory={handleCategorySelect}
      />

      <div className={styles.mainContent}>
        <div className={styles.navBarWrapper}>
          <NavBar
            houseType={houseType}
            mapState={mapState}
            onHouseInfoUpdate={handleHouseInfoUpdate}
          />
        </div>

        <div className={styles.contentArea}>
          {isMobile ? (
            <div
              className={styles.mobilePropertyList}
              style={{ height: isExpanded ? "50vh" : "10vh" }}
            >
              <div className={styles.handle} onClick={togglePropertyList}>
                <div className={styles.handleText}>집 목록 보기</div>
              </div>
              <PropertyList
                filterData={houseInfo?.houseContents || []}
                onPropertyClick={handlePropertyClick}
              />
            </div>
          ) : (
            <PropertyList
              filterData={houseInfo?.houseContents || []}
              className={styles.webPropertyList}
              onPropertyClick={handlePropertyClick}
            />
          )}
          <MapView onMapChange={setMapState} />
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={handleClosePropertyDetails}
            />
          )}
        </div>
      </div>

      {isCategoryMenuVisible && (
        <CategoryMenu
          isVisible={isCategoryMenuVisible}
          onClose={toggleCategoryMenu}
          houseType={houseType}
          mapState={mapState}
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
