'use client';

import styles from './Tabs.module.css';

const Tabs = ({ currentTab, onTabChange }) => {
  const tabs = ['회원 조회', '중개사 조회', '관리자 조회'];

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${currentTab === tab ? styles.activeTab : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;