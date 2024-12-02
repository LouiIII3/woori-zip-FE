"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';
import SubmitButton from './SubmitButton';
import { validateUsername, validatePassword, validateEmail } from './validation';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const router = useRouter();

  const handleSignupClick = (e) => {
    e.preventDefault();
    router.push('/user/register?role=2');
  };

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(e.target.value),
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
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!emailError && !passwordError) {
      try {
        const result = await onLogin(
          email,
          password,
        );
        if (result?.error) {
          setError("로그인에 실패했습니다.");
        } else {
          // 로그인 성공 시 리디렉션
          router.push('/');
        }
      } catch (error) {
        setLoginError(error.message);
      }
    } else {
      setErrors({ email: emailError, password: passwordError });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <p className={styles.sectionKeyword}>이메일</p>
            <input
              type="text"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleUsernameChange}
              className={styles.inputField}
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email}</div>
            )}
          </div>

          <div>
            <p className={styles.sectionKeyword}>비밀번호</p>
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
          <p className={styles.pText}>아직 관리자 아니신가요?</p>
          <a href="#" className={styles.link} onClick={handleSignupClick}>가입하기</a>
        </div>
      </div>
    </div>
  );
}

export default Login;