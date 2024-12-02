import React from "react";
import Link from "next/link";
import styles from "@/components/domains/map/Sidebar.module.css";

export default function Sidebar({ houseType, onSelectCategory }) {
  const categories = [
    { name: "원/투룸", image: "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/oneroom.png", key: "원/투룸" },
    { name: "오피스텔", image: "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/officetel.png", key: "오피스텔" },
    { name: "주택/빌라", image: "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/house.png", key: "주택/빌라" },
    { name: "아파트", image: "https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/map/apartment.png", key: "아파트" },
  ];

  const handleClick = (key) => {
    if (typeof onSelectCategory === "function") {
      onSelectCategory(key);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Link href="/" passHref>
        <div className={styles.logotext}>
          woorizip
        </div>
      </Link>
      {categories.map((category) => (
        <div
          key={category.key}
          className={`${styles.menuItem} ${
            houseType === category.key ? styles.selected : ""
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
