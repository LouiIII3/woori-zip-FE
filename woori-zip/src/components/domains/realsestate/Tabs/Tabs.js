'use client';

import styles from './Tabs.module.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['중개사 정보 확인','올린 방 조회'];

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