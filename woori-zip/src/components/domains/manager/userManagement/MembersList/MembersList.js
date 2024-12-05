'use client';

import { useState, useEffect } from 'react';
import { getMembersList, updateBulkPermissions } from '../../../../../app/api/manager/managerAPI';
import styles from './MembersList.module.css';

const getRoleType = (inputType) => {
  const typeMap = {
    'member': 'MEMBER',
    'agent': 'AGENT',
    'manager': 'ADMIN'
  };
  return typeMap[inputType.toLowerCase()] || 'MEMBER';
};

const getStatusText = (status) => {
  const statusMap = {
    'PENDING_APPROVAL': '권한 승인 대기',
    'APPROVED': '권한 승인',
    'REVOKED_APPROVAL': '권한 해제',
    'NOT_ADMIN': '관리자 아님'
  };
  return statusMap[status] || status;
};

export default function MembersList({ type = 'MEMBER' }) {
  const [memberList, setMemberList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const roleType = getRoleType(type);
        const response = await getMembersList(roleType, currentPage, pageSize);
        
        // 페이지네이션 정보 설정
        setTotalElements(response.totalElements || 0);
        setTotalPages(response.totalPages || 1);
        // content 배열에서 멤버 목록 추출
        setMemberList(response.content || []);
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action) => {
    try {
      const roleType = getRoleType(type);
      await updateBulkPermissions(selectedIds, action, roleType);
      // 데이터 다시 불러오기
      const response = await getMembersList(roleType, currentPage, pageSize);
      setMemberList(response.content || []);
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to update permissions:', error);
      alert('권한 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>로딩중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionButton} ${styles.approved}`}
          onClick={() => handleBulkAction('approve')}
          disabled={selectedIds.length === 0}
        >
          권한 승인
        </button>
        <button
          className={`${styles.actionButton} ${styles.rejected}`}
          onClick={() => handleBulkAction('revoke')}
          disabled={selectedIds.length === 0}
        >
          권한 해제
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? memberList.map((member) => member.id)
                        : []
                    )
                  }
                  checked={
                    memberList.length > 0 &&
                    memberList.every((member) => selectedIds.includes(member.id))
                  }
                />
              </th>
              <th>사용자 번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member) => (
              <tr key={member.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(member.id)}
                    onChange={() => toggleSelection(member.id)}
                  />
                </td>
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.name}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      member.status === 'APPROVED' ? styles.approved : styles.rejected
                    }`}
                  >
                    {getStatusText(member.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`${styles.paginationButton} ${
              currentPage === index ? styles.active : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}