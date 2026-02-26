import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useSearch } from '../context/SearchContext';
import './SearchBar.css';

const SearchBar = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedGenre, 
    setSelectedGenre, 
    genres,
    clearSearch 
  } = useSearch();
  
  const [showGenreFilter, setShowGenreFilter] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGenreFilter(false);
      }
    };

    if (showGenreFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGenreFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setShowGenreFilter(false);
  };

  const handleClear = () => {
    clearSearch();
  };

  return (
    <div className="search-bar-container" ref={dropdownRef}>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search dramas by name, genre, or origin..."
          className="search-input"
        />
        {(searchTerm || selectedGenre !== 'all') && (
          <button 
            type="button" 
            className="clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button 
          type="button" 
          className={`filter-btn ${showGenreFilter ? 'active' : ''}`}
          onClick={() => setShowGenreFilter(!showGenreFilter)}
          title="Filter by genre"
        >
          <FaFilter />
          {selectedGenre !== 'all' && <span className="filter-badge"></span>}
        </button>
      </div>

      {showGenreFilter && (
        <div className="genre-dropdown">
          <div className="genre-dropdown-header">Filter by Genre</div>
          <div className="genre-list">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-item ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre === 'all' ? 'All Genres' : genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
