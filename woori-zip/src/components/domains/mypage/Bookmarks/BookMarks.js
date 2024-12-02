'use client';

import { useEffect } from 'react';
import styles from './BookMarks.module.css';
import BookMarkCard from './BookMarkCard';
import { useBookmarks } from './hooks/useBookMark';

const BookMarks = () => {
  const {
    bookmarkData,
    isLoading,
    error,
    loadMoreRef,
    removeBookmark
  } = useBookmarks();

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          {error}
        </div>
      </div>
    );
  }

  if (!bookmarkData.bookmarks || bookmarkData.bookmarks.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          북마크한 집이 존재하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.propertyGrid}>
        {bookmarkData.bookmarks.map((bookmark) => (
          <BookMarkCard
            key={bookmark.bookmarkId}
            property={bookmark}
            onRemove={() => removeBookmark(bookmark.houseId)}
          />
        ))}
      </div>
      <div 
        ref={loadMoreRef}
        style={{ height: '20px', backgroundColor: 'transparent' }}
      />
      {isLoading && (
        <div className={styles.loadingIndicator}>
          <div className={styles.loader}>
            <span>다음 매물을 불러오는 중...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMarks;