# API Integration Guide

This document explains how the frontend integrates with the backend API.

## Architecture Overview

```
Frontend (React)
    ↓
API Service Layer (axios)
    ↓
Backend API (Express)
    ↓
MongoDB Database
```

## API Service Layer

Location: `src/services/api.js`

### Configuration

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

The API URL is configured via environment variable `VITE_API_URL` in `.env`.

### Authentication

JWT tokens are automatically attached to requests via axios interceptor:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Available API Methods

#### Authentication API
```javascript
import { authAPI } from '../services/api';

// Register new user
await authAPI.register({ username, email, password });

// Login user
await authAPI.login({ username, password });
```

#### Reviews API
```javascript
import { reviewsAPI } from '../services/api';

// Get all reviews for logged-in user
await reviewsAPI.getAll();

// Create new review
await reviewsAPI.create({ title, imageUrl, rating, reviewText });

// Update existing review
await reviewsAPI.update(reviewId, { title, imageUrl, rating, reviewText });

// Delete review
await reviewsAPI.delete(reviewId);

// Search reviews
await reviewsAPI.search(query);
```

#### Users API
```javascript
import { usersAPI } from '../services/api';

// Get user profile
await usersAPI.getProfile();

// Update theme preferences
await usersAPI.updateTheme({ primaryColor, secondaryColor });
```

## Context Integration

### AuthContext

Location: `src/context/AuthContext.jsx`

Manages user authentication state and provides login/register/logout functions.

**Usage:**
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { isLoggedIn, username, userId, login, register, logout } = useAuth();
  
  // Use authentication state and methods
}
```

**Features:**
- Persists auth state in localStorage
- Loads user theme preferences on login
- Provides loading state during initialization
- Handles API errors gracefully

### ThemeContext

Location: `src/context/ThemeContext.jsx`

Manages theme customization and syncs with backend for logged-in users.

**Usage:**
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { 
    primaryColor, 
    secondaryColor, 
    updatePrimaryColor, 
    updateSecondaryColor, 
    resetTheme 
  } = useTheme();
  
  // Use theme state and methods
}
```

**Features:**
- Applies colors to CSS variables in real-time
- Persists theme in localStorage
- Syncs theme to backend for logged-in users
- Provides reset to default functionality

## Component Integration Examples

### Login Flow

```javascript
// LoginModal.jsx
const { login, register } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const result = isRegistering 
    ? await register({ username, email, password })
    : await login({ username, password });
  
  if (result.success) {
    // Login successful, close modal
    onClose();
  } else {
    // Show error message
    setError(result.error);
  }
};
```

### Fetching Reviews

```javascript
// Library.jsx
import { reviewsAPI } from '../../services/api';

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getAll();
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    }
  };
  
  if (isLoggedIn) {
    fetchReviews();
  }
}, [isLoggedIn]);
```

### Creating Reviews

```javascript
// MovieCriticDiary.jsx
import { reviewsAPI } from '../../services/api';

const addReview = async (reviewData) => {
  try {
    await reviewsAPI.create(reviewData);
    setToastMessage('Content Saved!');
    navigate('/library');
  } catch (err) {
    console.error('Error saving review:', err);
    setToastMessage('Failed to save review');
  }
};
```

### Deleting Reviews

```javascript
// Library.jsx
const deleteReview = async (reviewId) => {
  try {
    await reviewsAPI.delete(reviewId);
    setReviews(reviews.filter((review) => review._id !== reviewId));
    setToastMessage('Review deleted successfully!');
  } catch (err) {
    console.error('Error deleting review:', err);
    setToastMessage('Failed to delete review');
  }
};
```

### Updating Theme

```javascript
// ThemeContext.jsx
const updatePrimaryColor = (color) => {
  setPrimaryColor(color);
  localStorage.setItem('primaryColor', color);
  
  // Sync to backend if logged in
  if (isLoggedIn) {
    syncThemeToBackend(color, secondaryColor);
  }
};

const syncThemeToBackend = async (primary, secondary) => {
  try {
    await usersAPI.updateTheme({
      primaryColor: primary,
      secondaryColor: secondary
    });
  } catch (error) {
    console.error('Failed to sync theme to backend:', error);
  }
};
```

## Error Handling

All API calls should be wrapped in try-catch blocks:

```javascript
try {
  const response = await reviewsAPI.getAll();
  // Handle success
} catch (err) {
  console.error('Error:', err);
  // Show user-friendly error message
  setToastMessage('Failed to load reviews');
  setToastType('error');
  setShowToast(true);
}
```

## Data Flow

### Registration/Login Flow
1. User submits form in LoginModal
2. AuthContext calls authAPI.register() or authAPI.login()
3. Backend validates credentials and returns JWT token + user data
4. AuthContext stores token and user data in localStorage
5. AuthContext updates state (isLoggedIn, username, userId)
6. User theme preferences are loaded from response
7. ThemeContext applies theme colors

### Review Creation Flow
1. User submits ReviewForm
2. MovieCriticDiary calls reviewsAPI.create()
3. Backend validates auth token and creates review in MongoDB
4. Backend returns created review with _id
5. Frontend shows success toast
6. Frontend redirects to Library page
7. Library fetches all reviews and displays them

### Theme Update Flow
1. User changes color in SettingsModal
2. ThemeContext updates local state and localStorage
3. ThemeContext applies CSS variables immediately
4. If logged in, ThemeContext calls usersAPI.updateTheme()
5. Backend updates user's theme preferences in MongoDB
6. On next login, theme preferences are loaded from backend

## MongoDB Document Structure

### User Document
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  primaryColor: String (default: '#FFD700'),
  secondaryColor: String (default: '#0D0D0D'),
  createdAt: Date
}
```

### Review Document
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String,
  imageUrl: String,
  rating: Number (1-10),
  reviewText: String,
  timestamp: Date
}
```

## Security Considerations

1. **JWT Tokens**: Stored in localStorage, automatically attached to requests
2. **Password Hashing**: Passwords are hashed with bcryptjs before storage
3. **Auth Middleware**: Backend validates JWT on protected routes
4. **User Isolation**: Users can only access their own reviews
5. **CORS**: Backend configured to accept requests from frontend origin

## Testing the Integration

### Manual Testing Steps

1. **Registration**
   - Open app, click Login
   - Click "Don't have an account? Register"
   - Fill in username, email, password
   - Verify successful registration and auto-login

2. **Login**
   - Logout if logged in
   - Click Login
   - Enter credentials
   - Verify successful login and theme loading

3. **Create Review**
   - Navigate to "Add Review"
   - Fill in movie details
   - Submit form
   - Verify toast notification
   - Verify redirect to Library
   - Verify review appears in Library

4. **Delete Review**
   - Go to Library
   - Click delete on a review
   - Verify toast notification
   - Verify review is removed

5. **Theme Customization**
   - Click Settings
   - Change primary/secondary colors
   - Verify immediate visual update
   - Refresh page
   - Verify theme persists

6. **Logout**
   - Click Logout
   - Verify redirect
   - Verify auth state cleared
   - Verify theme persists (localStorage)

### API Testing with curl

See [server/README.md](server/README.md) for curl examples.

## Troubleshooting

### "Network Error" or "Failed to fetch"
- Ensure backend server is running on port 5000
- Check `VITE_API_URL` in `.env`
- Verify CORS is enabled in backend

### "Unauthorized" errors
- Check if JWT token is present in localStorage
- Verify token hasn't expired (7 day expiry)
- Try logging out and logging back in

### Theme not syncing
- Ensure user is logged in
- Check browser console for API errors
- Verify backend `/api/users/theme` endpoint is working

### Reviews not loading
- Ensure user is logged in
- Check if MongoDB is running
- Verify backend connection to MongoDB
- Check browser console for errors
