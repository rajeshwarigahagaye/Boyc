import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './components/ReviewForm';
import Toast from '../../components/Toast';
import { reviewsAPI } from '../../services/api';
import './theme.css';
import './MovieCriticDiary.css';

const MovieCriticDiary = () => {
  const { isLoggedIn } = useAuth();
  const { refreshReviews } = useSearch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const addReview = async (reviewData) => {
    if (!isLoggedIn) {
      setToastMessage('Please login to add reviews');
      setToastType('error');
      setShowToast(true);
      return;
    }

    try {
      await reviewsAPI.create(reviewData);
      
      // Refresh the search context
      refreshReviews();
      
      // Show success toast
      setToastMessage('Content Saved!');
      setToastType('success');
      setShowToast(true);

      // Redirect to library after 1.5 seconds
      setTimeout(() => {
        navigate('/library');
      }, 1500);
    } catch (err) {
      console.error('Error saving review:', err);
      setToastMessage('Failed to save review');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <div className="movie-diary-container">
      <header className="diary-header">
        <h1 className="diary-title">Drama Critic Diary</h1>
        <p className="diary-subtitle">Add Your Drama Reviews</p>
      </header>

      {isLoggedIn ? (
        <ReviewForm onSubmit={addReview} />
      ) : (
        <div className="login-prompt">
          <p className="prompt-message">
            🔒 Please login to add drama reviews
          </p>
        </div>
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

export default MovieCriticDiary;
