import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starPosition) => {
    onRatingChange(starPosition);
  };

  const handleMouseEnter = (starPosition) => {
    setHoverRating(starPosition);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="star-rating">
      <div className="stars" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <span
            key={star}
            className={`star ${star <= displayRating ? 'active' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-value">{rating}/10</span>
    </div>
  );
};

export default StarRating;
