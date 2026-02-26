import './SearchFilter.css';

const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-filter">
      <label htmlFor="search" className="search-label">Search Movies</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title..."
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
