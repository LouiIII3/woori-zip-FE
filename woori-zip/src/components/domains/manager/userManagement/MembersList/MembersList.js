'use client';

import { useState, useEffect } from 'react';
import { getMembersList, updateBulkPermissions } from '../../../../../app/api/manager/managerAPI';
import styles from './MembersList.module.css';

export default function MembersList() {
  const [memberList, setMemberList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 6;
  const totalPages = Math.ceil(memberList.length / pageSize);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembersList();
        setMemberList(data);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);

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
      await updateBulkPermissions(selectedIds, action, 'members');
      const updatedList = await getMembersList();
      setMemberList(updatedList);
      setSelectedIds([]); // Clear selection after action
    } catch (error) {
      console.error('Failed to update permissions:', error);
    }
  };

  const displayedMembers = memberList.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Action Buttons */}
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

      {/* Table */}
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
            {displayedMembers.map((member) => (
              <tr key={member.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(member.id)}
                    onChange={() => toggleSelection(member.id)}
                  />
                </td>
                <td>{member.id}</td>
                <td>{member.userId}</td>
                <td>{member.name}</td>
                <td>
                  <button
                    className={`${styles.statusButton} ${
                      member.status === '권한 승인' ? styles.approved : styles.rejected
                    }`}
                  >
                    {member.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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