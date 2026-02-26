import { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [dramaOrigin, setDramaOrigin] = useState('');
  const [numberOfEP, setNumberOfEP] = useState('');
  const [description, setDescription] = useState('');
  const [yourPOV, setYourPOV] = useState('');
  const [rating, setRating] = useState(0);

  const isFormValid = name.trim() && imageUrl.trim() && genre.trim() && 
                      dramaOrigin.trim() && numberOfEP && description.trim() && 
                      yourPOV.trim() && rating > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    const reviewData = {
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      genre: genre.trim(),
      dramaOrigin: dramaOrigin.trim(),
      numberOfEP: parseInt(numberOfEP),
      description: description.trim(),
      yourPOV: yourPOV.trim(),
      rating,
      timestamp: Date.now()
    };

    onSubmit(reviewData);

    // Clear form
    setName('');
    setImageUrl('');
    setGenre('');
    setDramaOrigin('');
    setNumberOfEP('');
    setDescription('');
    setYourPOV('');
    setRating(0);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Drama Review</h2>
      
      <div className="form-group">
        <label htmlFor="name">Drama Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter drama name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Poster Image URL</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g., Romance, Action, Thriller"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dramaOrigin">Drama Origin</label>
          <input
            id="dramaOrigin"
            type="text"
            value={dramaOrigin}
            onChange={(e) => setDramaOrigin(e.target.value)}
            placeholder="e.g., Korean, Japanese, Chinese"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="numberOfEP">Number of Episodes</label>
        <input
          id="numberOfEP"
          type="number"
          min="1"
          value={numberOfEP}
          onChange={(e) => setNumberOfEP(e.target.value)}
          placeholder="Enter number of episodes"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the drama..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="yourPOV">Your Point of View</label>
        <textarea
          id="yourPOV"
          value={yourPOV}
          onChange={(e) => setYourPOV(e.target.value)}
          placeholder="Share your thoughts and review..."
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={!isFormValid}
      >
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
