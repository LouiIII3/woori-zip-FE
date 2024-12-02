import styles from './Footer.module.css';
import Link from 'next/link';


export default function Footer() {
 return (
   <div className={styles.footerWrapper}>
     <footer className={styles.footer}>
       <div className={styles.footerContent}>
         <div className={styles.footerTop}>
           <span>이용약관</span>
           <span className={styles.divider}>|</span>
           <span className={styles.text}>개인정보처리방침</span>
           <span className={styles.divider}>|</span>
           <span>자주묻는질문</span>
         </div>
         <div className={styles.footerBottom}>
           <span>상호 : (주)우리집</span>
           <span className={styles.divider}>|</span>
           <span>대표 : 피사방범대</span>
           <span className={styles.divider}>|</span>
           <span>이메일 문의: woorizip2024@gmail.com</span>
         </div>
         <div className={styles.copyright}>
           Copyright © WOORIZIP. All rights Reserved.
         </div>
       </div>
     </footer>
   </div>
 );
}