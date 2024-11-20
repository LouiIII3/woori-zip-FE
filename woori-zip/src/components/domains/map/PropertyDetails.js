import React from 'react';
import styles from './PropertyDetails.module.css';

const PropertyDetails = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h2 className={styles.title}>{property.name}</h2>
      <div className={styles.imageContainer}>
        {property.imageUrls && property.imageUrls.length > 0 ? (
          <img
            src={property.imageUrls[0]}
            alt={property.name}
            className={styles.propertyImage}
          />
        ) : (
          <div className={styles.noImage}>이미지가 없습니다.</div>
        )}
      </div>
      <div className={styles.rentInfo}>
        {property.housingExpenses === "MONTHLY_RENT" ? "월세" : "전세"}:{" "}
        {(property.deposit / 10000).toLocaleString()}
        {property.housingExpenses === "MONTHLY_RENT" &&
          ` / ${(property.monthlyRentFee / 10000).toLocaleString()}`}
      </div>
      <div className={styles.address}>
        주소: {property.address}
        <br />
        주상복합: {property.totalArea}㎡ / {property.exclusiveArea}㎡
      </div>
      <div className={styles.messageBox}>
        지금 보고 계신 집에 입주하고 싶으신가요? <br />
        마이데이터 기반으로 추천 대출 확인해보세요!
      </div>
      <div className={styles.detailsBox}>
        <p>매물번호: {property.id}</p>
        <p>입주 가능일: {property.moveInDate}</p>
        <p>관리비: {property.maintenanceFee.toLocaleString()}원</p>
        <p>포함 항목: {property.direction}</p>
        <p>주차 가능: {property.totalParkingSpaces}대 중 {property.householdParkingSpaces}대</p>
        <p>승인일: {property.approvalDate}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
