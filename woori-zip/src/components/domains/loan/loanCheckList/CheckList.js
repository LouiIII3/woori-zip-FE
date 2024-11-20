"use client";
import React, { useState } from 'react';
import styles from './CheckList.module.css'; 
import TrueFalseButton from './TrueFalseButton';




const CheckList = () => {
    // 나중에 하나로 관리
    const [selectedValue1, setSelectedValue1] = useState('1');
    const [selectedValue2, setSelectedValue2] = useState('1');
    const [selectedValue3, setSelectedValue3] = useState('1');
    const [selectedValue4, setSelectedValue4] = useState('1');
    const [selectedValue5, setSelectedValue5] = useState('1');
    const [selectedValue6, setSelectedValue6] = useState('1');
    const [selectedValue7, setSelectedValue7] = useState('1');
    const [selectedValue8, setSelectedValue8] = useState('1');
    const [selectedValue9, setSelectedValue9] = useState('1');
    const [selectedValue10, setSelectedValue10] = useState('1');
    const [selectedValue11, setSelectedValue11] = useState('1');
    const [selectedValue12, setSelectedValue12] = useState('1');
    const [selectedValue13, setSelectedValue13] = useState('1');
    const [selectedValue14, setSelectedValue14] = useState('1');
    const [selectedValue15, setSelectedValue15] = useState('1');
    const [selectedValue16, setSelectedValue16] = useState('1');
    const [selectedValue17, setSelectedValue17] = useState('1');
    const [selectedValue18, setSelectedValue18] = useState('1');
  
    const options = [
        { value: '1', label: '예' },
        { value: '2', label: '아니오' }
    ];

    return (
      <div className={styles.checklistContainer}>
        <div className={styles.checklist}>
            <h1 id={styles.checklistText}>대출 자격 요건 체크리스트</h1>
            <div className={styles.checklistAdvice}>
                <img id={styles.checklistAdviceImg} src="/api/placeholder/300/200?text=Item+1" alt="대출 안내 이미지" />
                <div className={styles.checklistAdviceTextContainer}>
                    <h2 className={styles.checklistAdviceText1}>대출신청 가능여부를 확인하는 사전 체크단계입니다.</h2>
                    <h2 className={styles.checklistAdviceText2}>다음 해당사항에 알맞게 체크해주세요.</h2>
                </div>
            </div>
            <div className={styles.checklistContent}>
                <div className={styles.montlyList}>
                    <p className={styles.checkText}>1. 보증신청일 기준으로 만 34세 이하입니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group1"
                        selectedValue={selectedValue1}
                        onChange={setSelectedValue1}
                    />
                    <p>2. 현재 본인 명의로 된 주택이 전혀 없습니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group2"
                        selectedValue={selectedValue2}
                        onChange={setSelectedValue2}
                    />
                    <p>3. 현재 무주택 세대주이거나 예비세대주입니까?</p>
                    <p>※ 본인 명의의 주택을 소유하고 있지 않아야 하며, 세대주로 등록되어 있어야 합니다. 예비세대주의 경우, 대출 실행일로부터 1개월 이내에 세대주 요건을 충족해야 합니다.</p>
                    <TrueFalseButton
                        options={options}
                        name="group3"
                        selectedValue={selectedValue3}
                        onChange={setSelectedValue3}
                    />
                    <p>4. 예비 세대주라면, 대출 실행일로부터 1개월 내에 세대주 요건을 충족할 준비가 되어 있습니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group4"
                        selectedValue={selectedValue4}
                        onChange={setSelectedValue4}
                    />
                    <p>5. 월세 보증금이 1억 원 이하이고, 월세 금액이 70만 원 이하인 월세계약을 체결하셨습니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group5"
                        selectedValue={selectedValue5}
                        onChange={setSelectedValue5}
                    />
                    <p>6. 해당 월세계약이 공인중개사를 통해 체결된 계약입니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group6"
                        selectedValue={selectedValue6}
                        onChange={setSelectedValue6}
                    />
                    <p>7. 현재 임대차계약의 잔여 기간이 6개월 이상 남아 있습니까? (보증 신청일 기준)</p>
                    <TrueFalseButton
                        options={options}
                        name="group7"
                        selectedValue={selectedValue7}
                        onChange={setSelectedValue7}
                    />
                    <p>8. 본인과 배우자의 연소득을 합산하여 7천만 원 이하입니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group8"
                        selectedValue={selectedValue8}
                        onChange={setSelectedValue8}
                    />
                    <p>9. 본인 또는 배우자가 주거급여 수급자가 아니십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group9"
                        selectedValue={selectedValue9}
                        onChange={setSelectedValue9}
                    />
                    <p>10. 개인신용평점이 심사 기준에 부합한다고 예상하십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group10"
                        selectedValue={selectedValue10}
                        onChange={setSelectedValue10}
                    />
                    <p>11. 대출을 위해 신분증, 주민등록등본, 임대차계약서, 등기부등본 등 관련 서류를 준비할 수 있습니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group11"
                        selectedValue={selectedValue11}
                        onChange={setSelectedValue11}
                    />
                    <p>12. 대출 한도가 개인별 최대 1,200만 원이며, 월 최대 50만 원까지만 지급된다는 점을 이해하십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group12"
                        selectedValue={selectedValue12}
                        onChange={setSelectedValue12}
                    />
                    <p>13. 청년전세자금보증과 월세자금보증을 동시에 이용할 경우 대출 한도가 600만 원으로 제한된다는 점을 알고 계십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group13"
                        selectedValue={selectedValue13}
                        onChange={setSelectedValue13}
                    />
                    <p>14. 대출 상환 방법이 원금균등분할상환 방식이며, 이자는 매달 납부해야 한다는 점을 이해하십니까?</p>
                    <p>※ 원금을 매달 균등하게 나누어 상환하며, 이자는 후납 방식입니다.</p>
                    <TrueFalseButton
                        options={options}
                        name="group14"
                        selectedValue={selectedValue14}
                        onChange={setSelectedValue14}
                    />
                    <p>15. 대출 기간이 최대 13년이며, 거치 기간은 최대 8년, 분할 상환 기간은 3년 또는 5년임을 알고 계십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group15"
                        selectedValue={selectedValue15}
                        onChange={setSelectedValue15}
                    />
                    <p>16. 대출 약정 조건을 지키지 않을 경우 연체이자율이 적용될 수 있음을 알고 계십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group16"
                        selectedValue={selectedValue16}
                        onChange={setSelectedValue16}
                    />
                    <p>17. 주택금융신용보증서를 발급받기 위한 모든 요건을 충족한다고 생각하십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group17"
                        selectedValue={selectedValue17}
                        onChange={setSelectedValue17}
                    />
                    <p>18. 대출 실행일로부터 14일 이내에 대출계약철회권을 행사할 수 있으며, 철회 시 원금과 이자 등을 반환해야 한다는 점을 알고 계십니까?</p>
                    <TrueFalseButton
                        options={options}
                        name="group18"
                        selectedValue={selectedValue18}
                        onChange={setSelectedValue18}
                    />
                </div>
            </div>
        </div>
            <button id={styles.loanResultButton}>대출 자격 요건 결과확인</button>
      </div>
    );
  };
  
  export default CheckList;