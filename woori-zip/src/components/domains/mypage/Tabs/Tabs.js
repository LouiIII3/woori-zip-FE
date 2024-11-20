'use client';

import styles from './Tabs.module.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['회원 정보 확인', '북마크 조회', '최근 본 대출 상품'];

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;