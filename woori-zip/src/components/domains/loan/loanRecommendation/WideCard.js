'use client';
import React, { useState } from 'react';
import styles from './WideCard.module.css';
import WideCardButton from './WideCardButton';
import { fetchLoanRecommendations } from '@/app/api/loan/loanAPI';

const WideCard = ({houseId,onDataChange }) => {
  
  const [selectedOption, setSelectedOption] = useState("none"); 
  const [annualIncome, setAnnualIncome] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [marriageStatus, setMarriageStatus] = useState('');
  const [contract, setContract] = useState();
  const [workStatus, setWorkStatus] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      
    const loanChecklistRequest = {
      annualIncome: BigInt(annualIncome),
      totalAssets: BigInt(totalAssets),
      marriageStatus:
        marriageStatus == "single" ? "SINGLE" : 
        marriageStatus == "married" ? "MARRIED" : 
        marriageStatus == "newlywed" ? "NEW_MARRIAGE" : 
        "NONE_MARRIAGE",
      contract : contract,
      workStatus: 
        workStatus == "unemployed" ? "UNEMPLOYED" : 
        workStatus == "employee" ? "EMPLOYED" : 
        "NONE_WORK_STATUS",
      workTerm: 
        selectedOption ==='option1' ? 'THREE_MONTH' : 
        selectedOption == 'option2' ? 'ONE_YEAR' : 
        'NONE_TERM'
    };
    console.log(loanChecklistRequest);

      const redata = await fetchLoanRecommendations(houseId, loanChecklistRequest); 
      onDataChange(redata);
      console.log(' 대출 추천 re데이터 응답:', redata);
    } catch (err) {
      console.error("Error fetching loan recommendations:", err);
      
    } 
  }; 

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.backCard}>
      <div className={styles.container}>
        <div className={styles.wideCard}>
          <div className={styles.topBox}>
            <div className={styles.QuestionBox}>
              <form className={styles.form} onSubmit={handleSubmit}>
                {/* 첫 번째 줄 */}
                <div className={styles.formRow}>
                  <div className={styles.subBox}>
                    <label htmlFor="annualIncome">연 소득</label>
                    <input 
                      type="text" 
                      id="annualIncome" 
                      name="annualIncome" 
                      className={styles.input}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.subBox}>
                    <label htmlFor="allAssets">총 자산</label>
                    <input 
                      type="text" 
                      id="allAssets" 
                      name="allAssets" 
                      className={styles.input}
                      onChange={(e) => setTotalAssets(e.target.value)}
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
                            onChange={(e) => setMarriageStatus(e.target.value)}
                          />
                          <label htmlFor="noMarriage">미혼</label>
                        </label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="marriage"
                            name="marriageStatus" 
                            value="married" 
                            onChange={(e) => setMarriageStatus(e.target.value)}
                          />
                          <label htmlFor="marriage">기혼</label>
                          </div>
                          <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="newMarriage"
                            name="marriageStatus" 
                            value="newlywed" 
                            onChange={(e) => setMarriageStatus(e.target.value)}
                          />
                          <label htmlFor="newMarriage">신혼</label>
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
                      onChange={(e) => setContract(e.target.checked)}
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
                            onChange={(e) => setWorkStatus(e.target.value)} 
                          />
                          <label htmlFor="nojob">무직</label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="employ"
                            name="job" 
                            value="employee" 
                            onChange={(e) => setWorkStatus(e.target.value)}
                          />
                          <label htmlFor="employ">직장인</label>
                        </div>
                        <div className={styles.radioButton}>
                          <input 
                            type="radio" 
                            id="free"
                            name="job" 
                            value="selfemployed"  
                            onChange={(e) => setWorkStatus(e.target.value)}
                          />
                          <label htmlFor="free">해당없음</label>
                        </div>
                      </div>
                    
                    <p className={styles.comment}>직장인 또는 자영업자는 경력 사항을 고려하여 대출이 가능합니다.</p>
                  </div>

                  <div className={styles.dropdown}>
                    <div className={styles.dropdownContent}>
                    <label htmlFor="select" className={styles.jobTerm}>재직 기간</label>
                      <select value={selectedOption} onChange={handleChange}>
                        <option value="none">해당없음</option>
                        <option value="option1">3개월</option>
                        <option value="option2">1년</option>
                      </select>
                    </div>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
          <div className={styles.forButton}>
          <WideCardButton 
            type = "submit"
            onClick={handleSubmit}
            className={styles.wideCardButton} 
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideCard;