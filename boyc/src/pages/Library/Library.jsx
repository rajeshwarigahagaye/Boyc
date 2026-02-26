import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import SortDropdown from '../Movies/components/SortDropdown';
import DiaryGrid from '../Movies/components/DiaryGrid';
import { reviewsAPI } from '../../services/api';
import Toast from '../../components/Toast';
import './Library.css';

const Library = () => {
  const { isLoggedIn } = useAuth();
  const { filteredReviews, isLoading: searchLoading, refreshReviews } = useSearch();
  const [sortOption, setSortOption] = useState('newest');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const hasRefreshed = useRef(false);

  // Refresh reviews when user logs in (only once)
  useEffect(() => {
    if (isLoggedIn && !hasRefreshed.current) {
      refreshReviews();
      hasRefreshed.current = true;
    }
    
    if (!isLoggedIn) {
      hasRefreshed.current = false;
    }
  }, [isLoggedIn, refreshReviews]);

  const deleteReview = async (reviewId) => {
    if (!isLoggedIn) return;

    try {
      await reviewsAPI.delete(reviewId);
      refreshReviews(); // Refresh the list after deletion
      setToastMessage('Review deleted successfully!');
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      console.error('Error deleting review:', err);
      setToastMessage('Failed to delete review');
      setToastType('error');
      setShowToast(true);
    }
  };

  const sortReviews = (reviews) => {
    const sorted = [...reviews];
    if (sortOption === 'highest') {
      return sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return sorted;
  };

  const displayedReviews = sortReviews(filteredReviews);

  if (searchLoading) {
    return (
      <div className="library-container">
        <div className="loading-message">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="library-container">
      <header className="library-header">
        <h1 className="library-title">Drama Library</h1>
        <p className="library-subtitle">Browse All Saved Reviews</p>
      </header>

      {!isLoggedIn && (
        <div className="login-prompt">
          <p className="prompt-message">
            🔒 Please login to view your drama library
          </p>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div className="controls-container">
            {/* <div className="search-info">
              <p className="info-text">
                � Use the search bar in the top navigation to filter dramas
              </p>
            </div> */}
            <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
          </div>

          <DiaryGrid reviews={displayedReviews} onDelete={deleteReview} isLoggedIn={isLoggedIn} />
        </>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Library;
