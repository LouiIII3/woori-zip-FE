"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';
import SubmitButton from './SubmitButton';
import { validateUsername, validatePassword } from './validation';

function Login({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const router = useRouter();

  const handleSignupClick = (e) => {
    e.preventDefault();
    router.push('/user/register');
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
        const result = await onLogin(
          username,
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
      setErrors({ username: usernameError, password: passwordError });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img className={styles.logo}
          src="/images/banklogo.png" alt="Logo" width={90} height={30}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <p className={styles.semiTitle}>아이디</p>
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
          <p>아직 회원이 아닌신가요?</p>
          <a href="#" className={styles.link} onClick={handleSignupClick}>가입하기</a>
        </div>
      </div>
    </div>
  );
}

export default Login;