import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { reviewsAPI } from '../services/api';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [genres, setGenres] = useState(['all']);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize the function and prevent infinite loops
  const fetchAllReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await reviewsAPI.getAll();
      // Handle both response.data and direct response
      const data = response.data || response || [];
      setAllReviews(data);
      
      // Extract unique genres
      const uniqueGenres = ['all', ...new Set(data.map(review => review.genre).filter(Boolean))];
      setGenres(uniqueGenres);
      
      setFilteredReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setAllReviews([]);
      setFilteredReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Fetch all reviews on mount only
  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  // Filter reviews based on search term and genre
  useEffect(() => {
    let results = [...allReviews];

    // Filter by genre
    if (selectedGenre !== 'all') {
      results = results.filter(review => 
        review.genre?.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // Filter by search term (name or genre)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(review => 
        review.name?.toLowerCase().includes(term) ||
        review.genre?.toLowerCase().includes(term) ||
        review.dramaOrigin?.toLowerCase().includes(term)
      );
    }

    setFilteredReviews(results);
  }, [searchTerm, selectedGenre, allReviews]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedGenre('all');
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre,
        filteredReviews,
        allReviews,
        genres,
        isLoading,
        clearSearch,
        refreshReviews: fetchAllReviews
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
