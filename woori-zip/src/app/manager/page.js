'use client';

import { useState } from 'react';
import styles from './page.module.css';
import MembersList from '@/components/domains/manager/userManagement/MembersList/MembersList';
import AgentList from '@/components/domains/manager/userManagement/AgentList/AgentList';
import ManagerList from '@/components/domains/manager/userManagement/ManagerList/ManagerList';
import LogSearch from '@/components/domains/manager/LogManagement/LogSearch';
import LoanView from '@/components/domains/manager/LoanManagement/LoanView';
import NavSection from '@/components/domains/manager/NavSection';

const Manager = () => {
  const [mainTab, setMainTab] = useState('사용자 관리');
  const [subTab, setSubTab] = useState('회원 조회');
  const [showSubTabs, setShowSubTabs] = useState(true);

  const handleMainTabChange = (tab) => {
    setMainTab(tab);
    if (tab === '사용자 관리') {
      setShowSubTabs(true);
      setSubTab('회원 조회');
    } else {
      setShowSubTabs(false);
    }
  };

  const handleSubTabChange = (tab) => {
    setSubTab(tab);
  };

  const renderContent = () => {
    switch (mainTab) {
      case '사용자 관리':
        if (subTab === '회원 조회') {
          return <MembersList />;
        } else if (subTab === '중개사 조회') {
          return <AgentList />;
        } else if (subTab === '관리자 조회') {
          return <ManagerList />;
        }
        break;
      case '로그 조회':
        return <LogSearch />;
      case '대출 상품 관리':
        return <LoanView />;
      default:
        return null;
    }
    return null;
  };

  return (
    <div className={styles.pageWrapper}>
      <NavSection
        mainTab={mainTab}
        subTab={subTab}
        onMainTabChange={handleMainTabChange}
        onSubTabChange={handleSubTabChange}
        showSubTabs={showSubTabs}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Manager;