'use client';
import React, { useState } from 'react';
import styles from './WideCard.module.css';
import WideCardButton from './WideCardButton';

const WideCard = () => {
  
  const [selectedOption, setSelectedOption] = useState("none"); 

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };



  return (
    <div className={styles.backCard}>
      <div className={styles.container}>
        <div className={styles.wideCard}>
          <div className={styles.topBox}>
            <div className={styles.QuestionBox}>
              <form className={styles.form}>
                {/* 첫 번째 줄 */}
                <div className={styles.formRow}>
                  <div className={styles.subBox}>
                    <label htmlFor="yearCost">연 소득</label>
                    <input 
                      type="text" 
                      id="yearCost" 
                      name="yearCost" 
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.subBox}>
                    <label htmlFor="allAssets">총 자산</label>
                    <input 
                      type="text" 
                      id="allAssets" 
                      name="allAssets" 
                      className={styles.input}
                    />
                    <p className={styles.comment}>기혼자인 경우 부부의 총 자산을 적어주세요</p>
                  </div>
                  
                  <div className={styles.subBox}>
                    <label>결혼 상태</label>
                    <div className={styles.radioWrapper}>
                      <div className={styles.radioButton}>
                        <label className={styles.radioBox}>
                          <input 
                            type="radio" 
                            id ="noMarriage"
                            name="marriageStatus" 
                            value="single" 
                          />
                          <label for="noMarriage">미혼</label>
                        </label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="marriage"
                            name="marriageStatus" 
                            value="married" 
                          />
                          <label for="marriage">기혼</label>
                          </div>
                          <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="newMarriage"
                            name="marriageStatus" 
                            value="newlywed" 
                          />
                          <label for="newMarriage">신혼</label>
                          </div>
            
                    </div>
                    <p className={styles.comment}>신혼인 경우 결혼한지 7년 이하만 적용됩니다.</p>
                  </div>
                </div>

                {/* 두 번째 줄 */}
                <div className={styles.formRow2}>
                  <div className={styles.subBox}>
                    <label htmlFor="contract">계약 여부</label>
                    <input 
                      type="checkbox" 
                      id="contract" 
                      name="contract" 
                      className={styles.input}
                    />
                    <p className={styles.comment}>임대차 계약 만료일이 6개월 이상 남아있는 경우 체크해주세요.</p>
                  </div>
                  
                  <div className={styles.subBox2}>
                    <label>직업</label>
                    <div className={styles.radioWrapper}>
                      <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="nojob"
                            name="job" 
                            value="unemployed" 
                          />
                          <label for="nojob">무직</label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="employ"
                            name="job" 
                            value="employee" 
                          />
                          <label for="employ">직장인</label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="free"
                            name="job" 
                            value="selfemployed"  
                          />
                          <label for="free">자영업자</label>
                        </div>
                      </div>
                    
                    <p className={styles.comment}>직장인 또는 자영업자는 경력 사항을 고려하여 대출이 가능합니다.</p>
                  </div>

                  <div className={styles.dropdown}>
                    <div className={styles.dropdownContent}>
                    <label for="select" className={styles.jobTerm}>재직 기간</label>
                      <select value={selectedOption} onChange={handleChange}>
                        <option value="none" selected>해당없음</option>
                        <option value="option1">항목 1</option>
                        <option value="option2">항목 2</option>
                        <option value="option3">항목 3</option>
                      </select>
                    </div>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
          <div className={styles.forButton}>
          <WideCardButton 
            className={styles.wideCardButton} 
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideCard;