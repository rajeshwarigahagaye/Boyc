import MovieCard from './MovieCard';
import './DiaryGrid.css';

const DiaryGrid = ({ reviews, onDelete, isLoggedIn }) => {
  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-message">No reviews found. Add your first movie review!</p>
      </div>
    );
  }

  return (
    <div className="diary-grid" data-testid="diary-grid">
      {reviews.map((review) => (
        <MovieCard 
          key={review._id || review.id} 
          review={review} 
          onDelete={onDelete}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default DiaryGrid;
