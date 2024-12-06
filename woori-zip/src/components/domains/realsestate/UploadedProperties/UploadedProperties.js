'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './UploadedProperties.module.css';
import { useProperty } from './hooks/useProperty';
import PropertyCard from './PropertyCard';

const UploadedProperties = () => {
  const { propertyData, isLoading, showLoadingMessage, error, loadMore } = useProperty();

  const observerRef = useRef(null);
  const previousLastItemRef = useRef(null); // 마지막 요소 저장
  const scrollPositionKey = 'propertyScrollPosition'; // 스크롤 위치 저장 키

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && propertyData.hasNext) {
          if (node) previousLastItemRef.current = node; // 마지막 요소 저장
          console.log("뭐냐고");

          loadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, propertyData.hasNext, loadMore]
  );

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(scrollPositionKey);
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem(scrollPositionKey, window.scrollY.toString());
    };

    window.addEventListener('scroll', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      previousLastItemRef.current &&
      document.body.contains(previousLastItemRef.current)
    ) {
      previousLastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [propertyData.houses, isLoading]);

  console.log('UploadedProperties.js 데이터 확인 -> propertyData:', propertyData);

  if (isLoading && propertyData.houses.length === 0)
    return (
      <div className={styles.containerNone}>
        <div className={styles.emptyState}>loading ... </div>
      </div>
    );

  if (error) {
    return <div>{error}</div>;
  }

  if (!propertyData.houses || propertyData.houses.length === 0) {
    return (
      <div className={styles.containerNone}>
        <div className={styles.emptyState}>중개사가 올린 집이 존재하지 않습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.cardListUl}>
        {propertyData.houses.map((data, index) => (
          <li
            className={styles.cardListLi}
            key={data.id || index}
            ref={
              index === propertyData.houses.length - 1
                ? lastItemRef
                : null
            }
          >
            <PropertyCard property={[data]} hasNext={propertyData.hasNext} />
          </li>
        ))}
      </ul>
      <div className={styles.loadingMessage}>
        {showLoadingMessage && propertyData.hasNext && (
          <div>데이터를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
}

export default UploadedProperties;