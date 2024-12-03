import { useEffect, useRef, useCallback } from 'react';
import styles from './Loan.module.css';
import { useLoan } from './hooks/useLoan';
import LoanCard from './LoanCard';

const Loan = () => {
  const { loanData, isLoading, showLoadingMessage, error, loadMore } = useLoan();

  const observerRef = useRef(null);
  const previousLastItemRef = useRef(null); // 마지막 요소 저장
  const scrollPositionKey = 'loanScrollPosition'; // 스크롤 위치 저장 키

  // 마지막 요소 관찰
  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loanData.hasNext) {
          if (node) previousLastItemRef.current = node; // 마지막 요소 저장
          loadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, loanData.hasNext, loadMore]
  );

  // 컴포넌트 마운트 시 스크롤 위치 복원
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(scrollPositionKey);
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  // 스크롤 이벤트로 스크롤 위치 저장
  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem(scrollPositionKey, window.scrollY.toString());
    };

    window.addEventListener('scroll', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, []);

  // 새 데이터가 로드된 후 스크롤 조정
  useEffect(() => {
    if (
      !isLoading &&
      previousLastItemRef.current &&
      document.body.contains(previousLastItemRef.current)
    ) {
      previousLastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [loanData.recentlyLoanGoods, isLoading]);

  console.log('Loan.js 데이터 확인 -> loanData:', loanData);

  if (isLoading && loanData.recentlyLoanGoods.length === 0)
    return (
      <div className={styles.containerNone}>
        <div className={styles.emptyState}>loading ... </div>
      </div>
    );

  if (error) {
    return <div>{error}</div>;
  }

  if (!loanData.recentlyLoanGoods || loanData.recentlyLoanGoods.length === 0) {
    return (
      <div className={styles.containerNone}>
        <div className={styles.emptyState}>최근에 본 대출이 존재하지 않습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {loanData.recentlyLoanGoods.map((data, index) => (
          <li
            key={data.id || index}
            ref={
              index === loanData.recentlyLoanGoods.length - 1
                ? lastItemRef
                : null
            }
          >
            <LoanCard property={[data]} hasNext={loanData.hasNext} />
          </li>
        ))}
      </ul>
      {showLoadingMessage && loanData.hasNext && (
        <div className={styles.loadingMessage}>데이터를 불러오는 중...</div>
      )}
    </div>
  );
};

export default Loan;