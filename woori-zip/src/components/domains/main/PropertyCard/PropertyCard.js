import styles from'./PropertyCard.module.css';


export default function PropertyCard({ title, description, image }) {
  return (
    <div className={styles.property_card}>
      <div className={styles.card_content}>
        <div className="text_content">
          <h3 className="card_title">{title}</h3>
          <p className={styles.card_description}>{description}</p>
        </div>
        {image && <img src={image} alt={title} className="card_image" />}
      </div>
    </div>
  );
}