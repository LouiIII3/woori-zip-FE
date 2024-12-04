import styles from '../../mypage/MemberInfo/Member.module.css';
import React, { useEffect, useState } from 'react';
import { fetchMemberInfo } from '@/app/api/mypage/MypageAPI';

const AgentInfo = () => {
  const [agentInfo, setAgentInfo] = useState({
    name: '',
    birthDate: '',
    gender: '',
    licenseId: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAgentInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMemberInfo();
  
        const agentData = response.data;
        
        //데이터를 JSON으로 변환 가능한 형태로 변환
        const data = {
          name: agentData.name || 'Unknown',
          birthDate: agentData.birthDate || 'N/A',
          gender: agentData.gender || 'N/A',
          licenseId: agentData.licenseId || 'N/A',
        };

        setAgentInfo(data);
      } catch (error) {
        console.error('Failed to fetch member info:', error);
        setError('Failed to load member info.');
      } finally {
        setIsLoading(false);
      }
    };

    getAgentInfo();
  }, []);

  return (
<div className={styles.container}>
      {isLoading ? ( // 로딩 중일 때
        <div className={styles.loading}>정보를 불러오는 중입니다...</div>
      ) : error ? ( // 에러 발생 시
        <div className={styles.error}>{error}</div>
      ) : ( // 로딩이 완료되었을 때
        <>
          <div className={styles.messageBox}>
            <div className={styles.textGroup}>
              <p className={styles.titleText}>이름</p>
              <p className={styles.contentText}>{agentInfo.name}</p>
            </div>

            <div className={styles.textGroup}>
              <p className={styles.titleText}>생년월일</p>
              <p className={styles.contentText}>{agentInfo.birthDate}</p>
            </div>

            <div className={styles.textGroup}>
              <p className={styles.titleText}>성별</p>
              <p className={styles.contentText}>{agentInfo.gender}</p>
            </div>

            <div className={styles.textGroup}>
              <p className={styles.titleText}>중개사 번호</p>
              <p className={styles.contentText}>{agentInfo.licenseId}</p>
            </div>
          </div>
          <div className={styles.imgBox}>
            <div className={styles.img}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentInfo;