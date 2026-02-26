const STORAGE_KEY = 'movieReviews';

export const loadReviews = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('Invalid JSON in localStorage, initializing with empty array');
      return [];
    }
    console.error('Error loading reviews from localStorage:', error);
    return [];
  }
};

export const saveReviews = (reviews) => {
  try {
    const serialized = JSON.stringify(reviews);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Please delete some reviews.');
      alert('Storage limit reached. Please delete some old reviews to continue.');
    } else {
      console.error('Error saving reviews to localStorage:', error);
    }
    return false;
  }
};
