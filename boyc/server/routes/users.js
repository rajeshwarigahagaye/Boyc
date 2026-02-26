import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user theme preferences
router.put('/theme', authMiddleware, async (req, res) => {
  try {
    const { primaryColor, secondaryColor } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { primaryColor, secondaryColor },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
