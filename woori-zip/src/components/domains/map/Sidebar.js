import React from 'react';
import styles from '../map/Sidebar.module.css';

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const categories = [
    { name: '원/투룸', image: '/images/map/house.png', key: '원/투룸' },
    { name: '오피스텔', image: '/images/map/officetel.png', key: '오피스텔' },
    { name: '주택/빌라', image: '/images/map/house.png', key: '주택/빌라' },
    { name: '아파트', image: '/images/map/apartment.png', key: '아파트' },
  ];

  const handleClick = (key) => {
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(key); // 선택된 카테고리를 상위로 전달
    }
  };

  return (
    <div className={styles.sidebar}>
      {categories.map((category) => (
        <div
          key={category.key}
          className={`${styles.menuItem} ${
            selectedCategory === category.key ? styles.selected : ''
          }`}
          onClick={() => handleClick(category.key)}
        >
          <img src={category.image} alt={category.name} className={styles.icon} />
          <span className={styles.text}>{category.name}</span>
        </div>
      ))}
    </div>
  );
}
