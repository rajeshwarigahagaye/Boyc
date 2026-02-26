import express from 'express';
import Review from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all reviews for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, imageUrl, genre, dramaOrigin, numberOfEP, description, yourPOV, rating } = req.body;
    
    const review = new Review({
      userId: req.userId,
      name,
      imageUrl,
      genre,
      dramaOrigin,
      numberOfEP,
      description,
      yourPOV,
      rating
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a review
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a review
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search reviews
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    const reviews = await Review.find({
      userId: req.userId,
      $text: { $search: q }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
