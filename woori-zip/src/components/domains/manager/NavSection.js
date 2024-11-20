import Tabs from '@/components/domains/manager/Tabs/Tabs';
import styles from '@/components/domains/manager/NavSection.module.css';

export default function NavSection({ mainTab, subTab, onMainTabChange, onSubTabChange, showSubTabs }) {
  return (
    <>
      <nav className={styles.headerNav}>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${mainTab === '사용자 관리' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('사용자 관리')}
          >
            <span className={styles.navLink}>사용자 관리</span>
          </li>
          <li
            className={`${styles.navItem} ${mainTab === '로그 조회' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('로그 조회')}
          >
            <span className={styles.navLink}>로그 조회</span>
          </li>
          <li
            className={`${styles.navItem} ${mainTab === '대출 상품 관리' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('대출 상품 관리')}
          >
            <span className={styles.navLink}>대출 상품 관리</span>
          </li>
        </ul>
      </nav>

      {showSubTabs && (
        <Tabs 
          currentTab={subTab} 
          onTabChange={onSubTabChange} 
        />
      )}
    </>
  );
}
