import { createContext, useContext, useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const DEFAULT_PRIMARY = '#FFD700';
  const DEFAULT_SECONDARY = '#0D0D0D';
  
  const [primaryColor, setPrimaryColor] = useState(() => {
    // Initialize from localStorage immediately
    return localStorage.getItem('primaryColor') || DEFAULT_PRIMARY;
  });
  const [secondaryColor, setSecondaryColor] = useState(() => {
    // Initialize from localStorage immediately
    return localStorage.getItem('secondaryColor') || DEFAULT_SECONDARY;
  });
  const { isLoggedIn } = useAuth();

  // Apply theme colors to CSS variables whenever they change
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-yellow', primaryColor);
    document.documentElement.style.setProperty('--deep-black', secondaryColor);
  }, [primaryColor, secondaryColor]);

  // Reset theme when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      const savedPrimary = localStorage.getItem('primaryColor');
      const savedSecondary = localStorage.getItem('secondaryColor');
      
      // If no saved colors, reset to default
      if (!savedPrimary || !savedSecondary) {
        setPrimaryColor(DEFAULT_PRIMARY);
        setSecondaryColor(DEFAULT_SECONDARY);
      }
    }
  }, [isLoggedIn]);

  const syncThemeToBackend = async (primary, secondary) => {
    if (!isLoggedIn) return;
    
    try {
      await usersAPI.updateTheme({
        primaryColor: primary,
        secondaryColor: secondary
      });
    } catch (error) {
      console.error('Failed to sync theme to backend:', error);
    }
  };

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
    syncThemeToBackend(color, secondaryColor);
  };

  const updateSecondaryColor = (color) => {
    setSecondaryColor(color);
    localStorage.setItem('secondaryColor', color);
    syncThemeToBackend(primaryColor, color);
  };

  const resetTheme = () => {
    setPrimaryColor(DEFAULT_PRIMARY);
    setSecondaryColor(DEFAULT_SECONDARY);
    localStorage.setItem('primaryColor', DEFAULT_PRIMARY);
    localStorage.setItem('secondaryColor', DEFAULT_SECONDARY);
    syncThemeToBackend(DEFAULT_PRIMARY, DEFAULT_SECONDARY);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        updatePrimaryColor,
        updateSecondaryColor,
        resetTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
