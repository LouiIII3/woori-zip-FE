'use client';

import styles from './BookmarkCard.module.css';

const BookMarkCard = ({ property, onRemove }) => {
  const handleStarClick = async (e) => {
    e.stopPropagation();
    await onRemove(property.houseId);
  };

  return (
    <div className={styles.propertyCard}>
      <div className={styles.imageContainer}>
        {property.imageUrl ? (
          <img 
            src={property.imageUrl}
            alt={property.houseName}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>매물 이미지</div>
        )}
        <button
          onClick={handleStarClick}
          className={styles.bookmarkButton}
          aria-label="북마크 토글"
        >
          <span className={styles.star}>★</span>
        </button>
      </div>
      <div className={styles.propertyInfo}>
        <div className={styles.typeLocation}>
          <span className={styles.type}>{property.houseName}</span>
          <span className={styles.location}>{property.gu} {property.dong}</span>
        </div>
        <div className={styles.price}>
          보증금 {property.deposit}만원
          {property.monthlyRentFee > 0 && ` / 월세 ${property.monthlyRentFee}만원`}
        </div>
        <div className={styles.details}>
          <p>{property.address}</p>
        </div>
      </div>
    </div>
  );
};

export default BookMarkCard;
