// components/Sidebar.js
import React from 'react';
import styles from '../map/Sidebar.module.css';

export default function Sidebar({ selectedCategory, onSelectCategory }) {
    const categories = [
      { name: '원/투룸', image: '/images/map/house.png', key: 'oneroom' },
      { name: '오피스텔', image: '/images/map/officetel.png', key: 'officetel' },
      { name: '주택/빌라', image: '/images/map/house.png', key: 'house' },
      { name: '아파트', image: '/images/map/apartment.png', key: 'apartment' },
    ];
  
    const handleClick = (key) => {
        if (typeof onSelectCategory === 'function') {
          onSelectCategory(key);
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