'use client';
import React, { useState } from 'react';
import styles from './WebViewLoanRecommendation.module.css';
import WideCardButton from './WideCardButton';

// 조회버튼클릭시 밑에 추천제품 보이게
const WebViewLoanRecommendation = ({loanRecommendations}) => {

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none"); // 재직 기간 옵션
  const [formData, setFormData] = useState({
    yearCost: '',
    allAssets: '',
    marriageStatus: '',
    job: '',
    contract: false,
  }); 

  
  const [isLoading, setIsLoading] = useState(false); 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  const handleSubmit = async() => {
    // 조회하기 버튼 클릭 시 처리할 로직을 여기 넣으면 됩니다.
    if (!formData.yearCost || !formData.allAssets || !formData.marriageStatus || !formData.job) {
      alert('모든 필드를 입력해주세요.');
      return;
    }  
      setIsLoading(true);
      setShowRecommendations(true);

  // try {
  //   const response = await fetch('/api/loan-recommendations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       ...formData,
  //       employmentTerm: selectedOption
  //     })
  //   });

  //   const data = await response.json();

  //   // 서버에서 받은 대출 추천 데이터 설정
  //   if (data.recommendations && data.recommendations.length > 0) {
  //     setLoanRecommendations(data.recommendations);
  //   } else {
  //     // 추천 대출 상품이 없는 경우
  //     setLoanRecommendations([]);
  //   }
  // } catch (error) {
  //   console.error('대출 추천 조회 중 오류 발생:', error);
  //   alert('대출 추천 정보를 불러오는 중 오류가 발생했습니다.');
  // } finally {
  //   setIsLoading(false);
  // }
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
                      value={formData.yearCost}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.subBox}>
                    <label htmlFor="allAssets">총 자산</label>
                    <input 
                      type="text" 
                      id="allAssets" 
                      name="allAssets" 
                      className={styles.input}
                      value={formData.allAssets}
                      onChange={handleInputChange}
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
                      checked={formData.contract}
                      onChange={handleCheckboxChange}
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
              onClick={handleSubmit}
              disabled={isLoading} 
            />
          </div>
        </div>
      </div>

    {showRecommendations && loanRecommendations.length > 0 && (
      <div className={styles.full}>
      <h1 className={styles.recommendText}>000님에게 추천하는 대출 상품이에요</h1>
      <div className={styles.recommendContainer}>
      {loanRecommendations.map((loan) => (
        <div key={loan.id} className={styles.recommendItem}>
            <div className={styles.loanType}>전세자금대출</div>
            <div className={styles.loanName}>우리 청년 맞춤형 월세대출</div>
            <img  src={loan.imageUrl} 
                  alt={loan.name}
                  className={styles.loanImage}/>
          {/* <Link href = {`/loan/loanDetail/${loan.id}`}> */}
            <button className={styles.recommendDetailBtn}>상세보기</button>
          {/* </Link> */}
        </div>
      ))}
      </div>
      
    </div>
    )}

    {loanRecommendations.length === 0 && (
        <div className={styles.noRecommendations}>
          조건에 맞는 대출 상품이 없습니다.
        </div>
      )}

    </div>
  );
};

export default WebViewLoanRecommendation;
