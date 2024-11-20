'use client';

import { useState } from 'react';
import styles from './ManagerList.module.css';

export default function ManagerList() {
  const [managerList, setManagerList] = useState([
    { id: 1, userId: 'admin01', name: '관리자01', status: '권한 승인' },
    { id: 2, userId: 'admin02', name: '관리자02', status: '권한 승인' },
    { id: 3, userId: 'admin03', name: '관리자03', status: '권한 승인' },
    { id: 4, userId: 'admin04', name: '관리자04', status: '권한 승인' },
    { id: 5, userId: 'admin05', name: '관리자01', status: '권한 승인' },
    { id: 6, userId: 'admin06', name: '관리자02', status: '권한 승인' },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const handleStatusChange = (userId, newStatus) => {
    setManagerList((prevList) =>
      prevList.map((manager) =>
        manager.userId === userId
          ? { ...manager, status: newStatus }
          : manager
      )
    );
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const displayedManagers = managerList.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>사용자 번호</th>
            <th>아이디</th>
            <th>이름</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {displayedManagers.map((manager) => (
            <tr key={manager.id} className={styles.tableRow}>
              <td className={styles.cellNumber}>{manager.id}</td>
              <td className={styles.cellId}>{manager.userId}</td>
              <td className={styles.cellName}>{manager.name}</td>
              <td className={styles.cellStatus}>
                <button
                  className={`${styles.statusButton} ${
                    manager.status === '권한 승인'
                      ? styles.approved
                      : styles.rejected
                  }`}
                  onClick={() =>
                    handleStatusChange(
                      manager.userId,
                      manager.status === '권한 승인' ? '권한 해제' : '권한 승인'
                    )
                  }
                >
                  {manager.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(-1)}
        >
          이전
        </button>
        <button
          className={styles.paginationButton}
          disabled={
            (currentPage + 1) * pageSize >= managerList.length
          }
          onClick={() => handlePageChange(1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}