"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/domains/map/Sidebar';
import PropertyList from '../../components/domains/map/PropertyList';
import MapView from '../../components/domains/map/MapView';
import styles from '../../components/domains/map/map.module.css';
import NavBar from '../../components/domains/map/NavBar';
import CategoryMenu from '../../components/domains/map/CategoryMenu';

export default function Home() {
    const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // PropertyList 확장 여부

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 393);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);

    // 클릭 시 PropertyList 높이를 토글
    const togglePropertyList = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.navBarWrapper}>
                    <NavBar onCategoryClick={toggleCategoryMenu} />
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
                            <PropertyList />
                        </div>
                    ) : (
                        <PropertyList className={styles.webPropertyList} />
                    )}
                    <MapView />
                </div>
            </div>
            {isCategoryMenuVisible && (
                <CategoryMenu isVisible={isCategoryMenuVisible} onClose={toggleCategoryMenu} />
            )}
        </div>
    );
}
