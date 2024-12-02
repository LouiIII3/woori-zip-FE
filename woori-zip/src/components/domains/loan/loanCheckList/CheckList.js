"use client";
import React, { useState } from 'react';
import styles from './CheckList.module.css'; 



const CheckList = ({loanQuestions,isLoading}) => {

    const [answers, setAnswers] = useState({});

    const options = [
        { value: '1', label: '예' },
        { value: '2', label: '아니오' }
    ];

    const canShowNextQuestions = (questionId) => {
        if(questionId === 1)
            return true;

        for(let i = 1 ; i < questionId ; i++) {
            if(answers[i] !== '1')
                return false;
        }

        return true;
    }

    const handleAnswerChange = (questionId,selectedValue) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selectedValue,
        }));
    };

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
                <div className={styles.checklists}>
                    <div className={styles.contents}>
                    {loanQuestions.map(question => 
                        canShowNextQuestions(question.orderIndex) && (
                            <div key={question.orderIndex}>
                            <p className={styles.checkText}>
                                {`${question.orderIndex}. ${question.content}`}
                            </p>
                            <div className={styles.radioButtons}>
                                {options.map((option) => (
                                    <label key={option.value} className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name={`question-${question.orderIndex}`}
                                            value={option.value}
                                            checked={answers[question.orderIndex] === option.value}
                                            onChange={(e) =>
                                                handleAnswerChange(question.orderIndex,e.target.value)}
                                        />
                                    {option.label}
                                    </label>
                                ))}
                            </div>
                            </div>
                        )
                        )}
                </div>
                </div>
            </div>
        </div>
            <button id={styles.loanResultButton}>대출 자격 요건 결과확인</button>
      </div>
    );
  };
  
  export default CheckList;