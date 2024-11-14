"user client";

import styles from './LoginIntro.module.css';
import Tab from "../../../atoms/Tab.js";

export default function LoginIntro() {

  const tabs = [
    { label: "Tab 1", content: "This is the content of Tab 1" },
    { label: "Tab 2", content: "This is the content of Tab 2" },
    { label: "Tab 3", content: "This is the content of Tab 3" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.componentBox}>
        <div>
          <Tab tabs={tabs} />
          <div className={styles.disignSpace}></div>
          <img className={styles.Image}
            src="/images/bankLogo.png" alt="Logo" width={110} height={30}
          />
          <p className={styles.text}>금융 데이터 분석을 위해<br />우리은행 데이터와 간편 연결하기</p>
          <button className={styles.loginButton}>우리은행으로 로그인</button>
        </div>
      </div>
    </div>
  );
}
