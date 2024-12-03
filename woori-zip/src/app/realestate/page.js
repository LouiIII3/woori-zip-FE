'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import Tabs from '@/components/domains/realsestate/Tabs/Tabs';
import AgentInfo from '@/components/domains/realsestate/AgentInfo/AgentInfo';
import UploadedProperties from '@/components/domains/realsestate/UploadedProperties/UploadedProperties';

const RealEstate = () => {
  const [activeTab, setActiveTab] = useState('중개사 정보 확인');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.content}>
          {activeTab === '중개사 정보 확인' && <AgentInfo />}
          {activeTab === '올린 방 조회' && <UploadedProperties />}
        </div>
      </div>
    </div>
  );
};

export default RealEstate;