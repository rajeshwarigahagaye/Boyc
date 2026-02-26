import './SortDropdown.css';

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort" className="sort-label">Sort By</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="newest">Newest Date</option>
        <option value="highest">Highest Rated</option>
      </select>
    </div>
  );
};

export default SortDropdown;
