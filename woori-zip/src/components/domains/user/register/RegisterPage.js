"use client";

import React, { useState } from 'react';
import styles from './Register.module.css';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState({});


  //입력 유효성 로직
  //username(id) 유효성 검사
  const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    return usernameRegex.test(name)
      ? ''
      : '아이디는 5자 이상이며, 영문 또는 숫자만 포함해야 합니다.';
  };
  //비밀번호 유효성 검사
  const validatePassword = (pass) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,16}$/;
    return passwordRegex.test(pass)
      ? ''
      : '비밀번호는 8~16자이며, 대문자/소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
};
  //비밀번호 유효성 검사&일치 확인
  const confirmPassword = (pass, confirmPass) => {
    const validationMessage = validatePassword(pass);
    
    if (validationMessage) {
      return validationMessage;
    }
    
    return pass === confirmPass
      ? ''
      : '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
  };
  //이름 유효성 검사
  const validateName = (name) => {
    const usernameRegex = /^[a-zA-Z가-힣]+$/;
    return usernameRegex.test(name)
      ? ''
      : '영문 또는 한글만 포함해야 합니다.';
  };
   //전화번호 유효성 검사
  const validatePhoneNum = (phoneNum) => {
    const phoneNumberRegex = /^01[0-9]-\d{4}-\d{4}$/;
    return phoneNumberRegex.test(phoneNum)
      ? ''
      : '전화번호는 010-1234-5678 형식으로 입력해야 합니다.';
  };
  //생년월일 유효성 검사
  const validateBirthday = (birthday) => {
    const birthdayRegex = /^(19[0-9]{2}|20[0-2][0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return birthdayRegex.test(birthday)
      ? ''
      : '생년월일은 2000-01-01 형식이어야 합니다.';
  };

  // 작성한 유효성 로직 검사 핸들러
  // username(id)
  // username이 변경될 때마다 중복 확인 상태를 리셋
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsAvailable(null); //중복 확인 초기화
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(e.target.value),
    }));
  };
  //pw
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(e.target.value),
    }));
  };
  //re-pw
  const handleRePasswordChange = (e) => {
    const newRePassword = e.target.value;
    setRePassword(newRePassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      rePassword: confirmPassword(password,newRePassword),
    }));
  };
  //name
  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(e.target.value),
    }));
  };
  //phone number
  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNum: validatePhoneNum(e.target.value),
    }));
  };
  //Date of Birth
  const handleDateOfBirthChange = (e) => {
    setBirthday(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      birthday: validateDateOfBirth(e.target.value),
    }));
  };

// 아이디 중복 확인 요청 함수
const checkUsernameAvailability = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/member?username=${username}`);
    const data = await response.json();
    setIsAvailable(data.isSuccess); // 중복 여부 결과 저장
    if (data.isSuccess) {
      alert("사용 가능한 아이디입니다.");
    } else {
      alert("이미 사용 중인 아이디입니다.");
    }
  } catch (error) {
    console.error("아이디 중복 확인 중 오류 발생:", error);
  }
};

  //제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    const validationErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
      name: validateName(name),
      phoneNum: validatePhoneNum(phoneNum),
      birthday: validateBirthday(birthday),
    };  

    // 아이디 중복 확인 여부 검사
    if (isAvailable === null) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (!isAvailable) {
      alert("중복된 아이디입니다. 다른 아이디를 사용하세요.");
      return;
    }

    // 유효성 검사 오류가 없으면 제출
    if (Object.values(validationErrors).every((error) => !error)) {
      console.log("모든 항목 에러 없이 작성 완료");

      
      try {
        const response = await fetch('/api/member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            name,
            phoneNum,
            birthday,
          }),
        });

        if (response.ok) {
          router.push('/user/login'); 
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
        }
      } catch (error) {
        console.error('An error occurred:', error); //질문 하기) 처리 해줘야 하나??
      }
    } else {
      setErrors(validationErrors);
      alert("모든 항목을 입력해주세요");
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>회원가입</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <p className={styles.sectionText}>회원가입 정보</p>
            <div className={styles.sectionGap}>
              <div>
                <p style={{ fontSize: '10px', marginBottom: '5px'}}>아이디</p>
                <input type="text" 
                  placeholder="아이디를 입력하세요." 
                  value={username} 
                  onChange={handleUsernameChange} 
                  className={styles.inputField} 
                />
                <button type="button"
                  className={styles.idCheckButton}
                  onClick={checkUsernameAvailability}>아이디 중복 확인하기
                </button>
              </div>
              {errors.username && 
                <div className={styles.errorMessage}>{errors.username}</div>}

              <div>
                <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>비밀번호</p>
                <input type="password" 
                  placeholder="비밀번호를 입력하세요." 
                  value={password} 
                  onChange={handlePasswordChange} 
                  className={styles.inputField} 
              />
              </div>
              {errors.password &&  
                <div className={styles.errorMessage}>{errors.password}</div>}

              <div>
                <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>비밀번호 재입력</p>
                <input type="password" 
                  placeholder="비밀번호를 다시 입력하세요." 
                  value={rePassword} 
                  onChange={handleRePasswordChange} 
                  className={styles.inputField} 
                />
              </div>
              {errors.rePassword &&  
                <div className={styles.errorMessage}>{errors.rePassword}</div>}
            </div>

            <p className={styles.sectionText}>회원 정보</p>
            <div className={styles.sectionGap}>
              <div>
                <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>이름</p>
                <input type="text" 
                  placeholder="이름을 입력하세요. (ex. 홍길동)" 
                  value={name} 
                  onChange={handleNameChange} 
                  className={styles.inputField} 
              />
              </div>
              {errors.name && 
                <div className={styles.errorMessage}>{errors.name}</div>}

              <div>
                <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>연락처</p>
                <input type="text"
                  placeholder="연락처를 입력하세요. (ex. 010-1234-5678)"
                  value={phoneNum}
                  onChange={handlePhoneNumChange}
                  className={styles.inputField}
                />              
              </div>
              {errors.phoneNum && 
                <div className={styles.errorMessage}>{errors.phoneNum}</div>}

              <div>
                <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>생년월일</p>
                <input type="text" 
                  placeholder="생년월일을 입력하세요. (ex. YYYY-MM-DD)"
                  value={birthday} 
                  onChange={handleDateOfBirthChange} 
                  className={styles.inputField} 
                />
              </div>
              {errors.birthday && 
                <div className={styles.errorMessage}>{errors.birthday}</div>}
            </div>
          </div>
          <button type="submit" 
            className={styles.submitButton}
            disabled={!isAvailable}
            onClick={handleSubmit}
            >가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
