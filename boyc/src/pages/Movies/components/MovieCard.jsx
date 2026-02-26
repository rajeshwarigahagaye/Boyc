import { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ review, onDelete, isLoggedIn }) => {
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(10 - rating);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <div className="card-image-container">
          {!imageError ? (
            <img
              src={review.imageUrl}
              alt={review.name}
              className="card-image"
              onError={handleImageError}
            />
          ) : (
            <div className="image-placeholder" data-testid="image-placeholder">
              <span className="placeholder-text">{review.name}</span>
            </div>
          )}
          <div className="rating-badge">
            <span className="badge-stars">{renderStars(review.rating)}</span>
            <span className="badge-number">{review.rating}/10</span>
          </div>
        </div>

        <div className="card-content">
          <h3 className="card-title">{review.name}</h3>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content drama-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                {!imageError ? (
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="modal-image"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="modal-image-placeholder">
                    <span className="placeholder-text">{review.name}</span>
                  </div>
                )}
              </div>

              <div className="modal-details">
                <h2 className="modal-title">{review.name}</h2>
                
                <div className="modal-rating">
                  <span className="modal-stars">{renderStars(review.rating)}</span>
                  <span className="modal-rating-number">{review.rating}/10</span>
                </div>

                <div className="modal-meta">
                  <div className="meta-item">
                    <strong>Genre:</strong> {review.genre}
                  </div>
                  <div className="meta-item">
                    <strong>Origin:</strong> {review.dramaOrigin}
                  </div>
                  <div className="meta-item">
                    <strong>Episodes:</strong> {review.numberOfEP}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Description</h3>
                  <p className="section-text">{review.description}</p>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Your Point of View</h3>
                  <p className="section-text">{review.yourPOV}</p>
                </div>

                {isLoggedIn && (
                  <button 
                    className="delete-btn-modal"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(review._id || review.id);
                      handleCloseModal();
                    }}
                    aria-label="Delete review"
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
