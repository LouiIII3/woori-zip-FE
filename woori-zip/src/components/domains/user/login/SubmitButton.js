"use client";

import React from 'react';
import { useFormStatus } from "react-dom";
import styles from './LoginPage.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.loginButton}>
      로그인하기
    </button>
  );
}

export default SubmitButton;
