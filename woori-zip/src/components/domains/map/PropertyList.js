// components/PropertyList.js
import React from 'react';
import Image from 'next/image';
import styles from '../map/PropertyList.module.css';

const properties = [
    {
      id: 1,
      title: '월세 500/35',
      location: '송파구 방이동',
      maintenance: '5만',
      description: '2층 건물 중 1층. 풀옵션. 잠실역 도보 15분',
      image: '/images/map/test.png',
      type: '원/투룸'
    },
    {
      id: 2,
      title: '월세 600/30',
      location: '송파구 장지동',
      maintenance: '7만',
      description: '리모델링 완. 신축풀옵션. 분리형양창',
      image: '/images/map/test.png',
      type: '원/투룸'
    },
    {
      id: 3,
      title: '월세 400/40',
      location: '송파구 잠실동',
      maintenance: '3만',
      description: '1.5룸. 중기청, 신축풀옵션. 잠실역 도보 10분',
      image: '/images/map/test.png',
      type: '원/투룸'
    },
    {
      id: 4,
      title: '월세 500/35',
      location: '송파구 방이동',
      maintenance: '5만',
      description: '2층 건물 중 1층 입니다.',
      image: '/images/map/test.png',
      type: '원/투룸'
    },
    {
        id: 6,
        title: '월세 500/35',
        location: '송파구 방이동',
        maintenance: '5만',
        description: '2층 건물 중 1층. 풀옵션. 잠실역 도보 15분',
        image: '/images/map/test.png',
      },
      {
        id: 7,
        title: '월세 600/30',
        location: '송파구 장지동',
        maintenance: '7만',
        description: '리모델링 완. 신축풀옵션. 분리형양창',
        image: '/images/map/test.png',
      },
      {
        id: 8,
        title: '월세 400/40',
        location: '송파구 잠실동',
        maintenance: '3만',
        description: '1.5룸. 중기청, 신축풀옵션. 잠실역 도보 10분',
        image: '/images/map/test.png',
      },
      {
        id: 9,
        title: '월세 500/35',
        location: '송파구 방이동',
        maintenance: '5만',
        description: '2층 건물 중 1층 입니다.',
        image: '/images/map/test.png',
      },
  ];
  
  const PropertyList = () => {
    return (
      <div className={styles.listSideBar}>
        {properties.map((property) => (
          <div key={property.id} className={styles.propertyItem}>
            {property.type && <div className={styles.typeTag}>{property.type}</div>}
            <img src={property.image} alt={property.title} className={styles.propertyImage} />
            <div className={styles.propertyDetails}>
              <h2 className={styles.title}>{property.title}</h2>
              <p className={styles.location}>{property.location}</p>
              <p className={styles.maintenance}>관리비: {property.maintenance}</p>
              <p className={styles.description}>{property.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PropertyList;