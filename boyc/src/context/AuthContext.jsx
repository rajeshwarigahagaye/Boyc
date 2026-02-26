import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    const savedUserId = localStorage.getItem('userId');
    
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      setUserId(savedUserId);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserId(user.id);
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      
      // Load user's theme preferences
      if (user.primaryColor) {
        localStorage.setItem('primaryColor', user.primaryColor);
      }
      if (user.secondaryColor) {
        localStorage.setItem('secondaryColor', user.secondaryColor);
      }
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserId(user.id);
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      
      // Load user's theme preferences
      if (user.primaryColor) {
        localStorage.setItem('primaryColor', user.primaryColor);
      }
      if (user.secondaryColor) {
        localStorage.setItem('secondaryColor', user.secondaryColor);
      }
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    // Reset theme to default FIRST
    const defaultPrimary = '#FFD700';
    const defaultSecondary = '#0D0D0D';
    
    // Clear all localStorage
    localStorage.clear();
    
    // Set default theme colors
    localStorage.setItem('primaryColor', defaultPrimary);
    localStorage.setItem('secondaryColor', defaultSecondary);
    
    // Apply default colors immediately to CSS variables
    document.documentElement.style.setProperty('--primary-yellow', defaultPrimary);
    document.documentElement.style.setProperty('--deep-black', defaultSecondary);
    
    // Update state
    setIsLoggedIn(false);
    setUsername('');
    setUserId(null);
    
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.href = '/';
    }, 50);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
