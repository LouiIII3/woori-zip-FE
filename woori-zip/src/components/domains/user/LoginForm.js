'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

import { useFormStatus } from "react-dom";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  //회원가입 하기 페이지 이동 라우터
  const router = useRouter();

  const handleSignupClick = (e) => {
    e.preventDefault();
    router.push('/user/register');
  };

  const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    return usernameRegex.test(name)
      ? ''
      : '아이디는 5자 이상이며, 영문 또는 숫자만 포함해야 합니다.';
  };

  const validatePassword = (pass) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]|.*\d|.*\W)|(?=.*[A-Z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W|.*[a-z]).{8,}$/;
    return passwordRegex.test(pass) && pass.length >= 8
      ? ''
      : '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자와 기호를 최소 2개 이상 포함해야 합니다.';
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(e.target.value),
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (!usernameError && !passwordError) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
        
        alert('로그인 성공!');
        router.push('/user/home'); 
      } catch (error) {
        setLoginError(error.message);
      }
    } else {
      setErrors({ username: usernameError, password: passwordError });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>로그인</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <p style={{ fontSize: '10px', marginBottom: '5px'}}>아이디</p>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={handleUsernameChange}
              className={styles.inputField}
            />
            {errors.username && (
              <div className={styles.errorMessage}>{errors.username}</div>
            )}
          </div>

          <div>
            <p className={styles.sectionKeyword} style={{ fontSize: '10px', marginBottom: '5px'}}>비밀번호</p>            
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              className={styles.inputField}
            />
            {errors.password && (
              <div className={styles.errorMessage}>{errors.password}</div>
            )}
          </div>

          {loginError && (
            <div className={styles.errorMessage}>{loginError}</div>
          )}

          <SubmitButton />
        </form>

        <div className={styles.links}>
          <a href="#" className={styles.link} onClick={handleSignupClick}>회원가입 하기</a>
          <a href="#" className={styles.link}>아이디 찾기</a>
          <a href="#" className={styles.link}>비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
}

export default Login;


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.submitButton}>
      로그인하기
    </button>
  );
}
