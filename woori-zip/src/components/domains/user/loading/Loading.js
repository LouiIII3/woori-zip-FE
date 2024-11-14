"use client";

import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img className={styles.loading}
          src="/images/loading.png" alt="Loadong" width={200} height={150}
        />
        <br />
        <img
          src="/images/success.png" alt="success" width={50} height={50}
        />
        <p className=''>로그인 성공</p>
      </div>
    </div>
  )
}

export default Loading
