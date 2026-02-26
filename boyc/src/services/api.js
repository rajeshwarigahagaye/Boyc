import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials)
};

// Reviews API
export const reviewsAPI = {
  getAll: () => api.get('/reviews'),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  search: (query) => api.get(`/reviews/search?q=${query}`)
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateTheme: (themeData) => api.put('/users/theme', themeData)
};

export default api;
