'use client';

import { useState, useCallback } from 'react';
import styles from "./LoanViewCard.module.css";
import Modal from './modal/Modal';

const LOAN_TYPE_MAPPING = {
  LOAN_LEASE_DEPOSIT: '전세자금대출',
  NATIONAL_HOUSING_URBAN_FUND: '주택도시기금'
};

const REVERSE_LOAN_TYPE_MAPPING = {
  '전세자금대출': 'LOAN_LEASE_DEPOSIT',
  '주택도시기금': 'NATIONAL_HOUSING_URBAN_FUND'
};

const CustomAlert = ({ message }) => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertContent}>
        {message}
      </div>
    </div>
  );
};

const EditForm = ({ editData, handleInputChange, handleEdit, onClose }) => {
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await handleEdit();
    } catch (error) {
      console.error('폼 제출 중 오류:', error);
    }
  }, [handleEdit]);

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <span>대출명</span>
        <input
          type="text"
          value={editData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          maxLength={100}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>대출유형</span>
        <select
          value={editData.loanType}
          onChange={(e) => handleInputChange('loanType', e.target.value)}
          required
        >
          <option value="LOAN_LEASE_DEPOSIT">전세자금대출</option>
          <option value="NATIONAL_HOUSING_URBAN_FUND">주택도시기금</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <span>대출대상</span>
        <input
          type="text"
          value={editData.target}
          onChange={(e) => handleInputChange('target', e.target.value)}
          maxLength={200}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>대출한도</span>
        <input
          type="text"
          value={editData.limitAmount}
          onChange={(e) => handleInputChange('limitAmount', e.target.value)}
          placeholder="예: 3억원, 5000만원"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>대출기간</span>
        <input
          type="text"
          value={editData.term}
          onChange={(e) => handleInputChange('term', e.target.value)}
          placeholder="예: 1년, 2년 6개월"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>이자방식</span>
        <input
          type="text"
          value={editData.interestMethod}
          onChange={(e) => handleInputChange('interestMethod', e.target.value)}
          maxLength={50}
        />
      </div>
      <div className={styles.formGroup}>
        <span>일반금리 (%)</span>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={editData.normalRate}
          onChange={(e) => {
            const value = e.target.value;
            handleInputChange('normalRate', value === '' ? 0 : parseFloat(value));
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>특별금리 (%)</span>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={editData.specialRate}
          onChange={(e) => {
            const value = e.target.value;
            handleInputChange('specialRate', value === '' ? 0 : parseFloat(value));
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <span>상환방식</span>
        <input
          type="text"
          value={editData.repayType}
          onChange={(e) => handleInputChange('repayType', e.target.value)}
          maxLength={100}
        />
      </div>
      <div className={styles.formGroup}>
        <span>보증방식</span>
        <input
          type="text"
          value={editData.guarantee}
          onChange={(e) => handleInputChange('guarantee', e.target.value)}
          maxLength={100}
        />
      </div>
      <div className={styles.formGroup}>
        <span>대상주택</span>
        <input
          type="text"
          value={editData.targetHouse}
          onChange={(e) => handleInputChange('targetHouse', e.target.value)}
          maxLength={200}
        />
      </div>
      <div className={styles.formGroup}>
        <span>고객부담비용</span>
        <input
          type="text"
          value={editData.customerCost}
          onChange={(e) => handleInputChange('customerCost', e.target.value)}
          maxLength={200}
        />
      </div>

      <div className={styles.modalActions}>
        <button
          type="button"
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClose}
        >
          취소
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.confirmButton}`}
        >
          저장
        </button>
      </div>
    </form>
  );
};

const LoanViewCard = ({ loanGoods, onEdit, onDelete }) => {
  const initialLoanType = typeof loanGoods.loanType === 'string' && REVERSE_LOAN_TYPE_MAPPING[loanGoods.loanType] 
    ? REVERSE_LOAN_TYPE_MAPPING[loanGoods.loanType] 
    : loanGoods.loanType || 'LOAN_LEASE_DEPOSIT';

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [editData, setEditData] = useState({
    ...loanGoods,
    loanType: initialLoanType,
    name: loanGoods.name || '',
    target: loanGoods.target || '',
    limitAmount: loanGoods.limitAmount || '',
    term: loanGoods.term || '',
    normalRate: loanGoods.normalRate || 0,
    specialRate: loanGoods.specialRate || 0,
    repayType: loanGoods.repayType || '',
    guarantee: loanGoods.guarantee || '',
    targetHouse: loanGoods.targetHouse || '',
    customerCost: loanGoods.customerCost || '',
    interestMethod: loanGoods.interestMethod || '',
    imageUrl: loanGoods.imageUrl || ''
  });

  const handleInputChange = useCallback((field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const showAlert = useCallback((message) => {
    setAlertMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  }, []);

  const handleEdit = useCallback(async () => {
    try {
      if (!['LOAN_LEASE_DEPOSIT', 'NATIONAL_HOUSING_URBAN_FUND'].includes(editData.loanType)) {
        throw new Error('잘못된 대출 유형입니다.');
      }
      
      await onEdit(loanGoods.id, editData);
      setIsEditModalOpen(false);
      showAlert('대출 상품이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('수정 중 오류:', error);
      alert(error.message || '수정 중 오류가 발생했습니다.');
    }
  }, [loanGoods.id, editData, onEdit, showAlert]);

  const handleDelete = useCallback(async () => {
    try {
      await onDelete(loanGoods.id);
      setIsDeleteModalOpen(false);
      showAlert('대출 상품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 중 오류:', error);
    }
  }, [loanGoods.id, onDelete, showAlert]);

  return (
    <>
      {showSuccessAlert && (
        <CustomAlert message={alertMessage} />
      )}

      <div className={styles.container}>
        <div className={styles.cardItem}>
          <div className={styles.cardTopContent}>
            <div className={styles.cardContent}>
              <div className={styles.loanType}>
                {LOAN_TYPE_MAPPING[loanGoods.loanType] || loanGoods.loanType}
              </div>
              <div className={styles.loanName}>{loanGoods.name}</div>
              <div className={styles.loanSummary}>
                <div className={styles.loanTextBox1}>
                  <span className={styles.loanTarget}>대출대상</span>
                  <div className={styles.loanTargetText}>{loanGoods.target}</div>
                </div>
                <div className={styles.loanTextBox2}>
                  <span className={styles.loanDate}>대출기간</span>
                  <div className={styles.loanDateText}>{loanGoods.term}</div>
                </div>
                <div className={styles.loanTextBox3}>
                  <span className={styles.loanLimit}>대출한도</span>
                  <div className={styles.loanLimitText}>{loanGoods.limitAmount}</div>
                </div>
              </div>
            </div>
            {loanGoods.imageUrl && (
              <div className={styles.imageContainer}>
                <img 
                  className={styles.cardImage} 
                  src={loanGoods.imageUrl} 
                  alt="대출 상품 이미지"
                />
              </div>
            )}
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.modifyButton}
                onClick={() => setIsEditModalOpen(true)}
              >
                수정
              </button>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="대출 상품 수정"
      >
        <EditForm 
          editData={editData}
          handleInputChange={handleInputChange}
          handleEdit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="대출 상품 삭제"
      >
        <div className={styles.deleteConfirmation}>
          <p>정말 이 대출 상품을 삭제하시겠습니까?</p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoanViewCard;