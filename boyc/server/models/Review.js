import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // New field name
  name: {
    type: String,
    trim: true
  },
  // Old field name (for backward compatibility)
  title: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    trim: true,
    default: 'Not specified'
  },
  dramaOrigin: {
    type: String,
    trim: true,
    default: 'Not specified'
  },
  numberOfEP: {
    type: Number,
    min: 1,
    default: 1
  },
  description: {
    type: String,
    default: ''
  },
  yourPOV: {
    type: String,
    default: ''
  },
  // Old field name (for backward compatibility)
  reviewText: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Virtual to handle both old and new field names
reviewSchema.virtual('displayName').get(function() {
  return this.name || this.title || 'Untitled';
});

reviewSchema.virtual('displayReview').get(function() {
  return this.yourPOV || this.reviewText || '';
});

// Pre-save hook to ensure name field is populated
reviewSchema.pre('save', function(next) {
  // If name is not set but title is, copy title to name
  if (!this.name && this.title) {
    this.name = this.title;
  }
  // If yourPOV is not set but reviewText is, copy reviewText to yourPOV
  if (!this.yourPOV && this.reviewText) {
    this.yourPOV = this.reviewText;
  }
  next();
});

// Index for faster queries
reviewSchema.index({ userId: 1, timestamp: -1 });
reviewSchema.index({ name: 'text', genre: 'text', dramaOrigin: 'text' });

export default mongoose.model('Review', reviewSchema);
