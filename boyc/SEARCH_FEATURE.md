# Global Search Feature

## Overview
The application now includes a powerful global search feature with advanced filtering capabilities integrated into the top navigation bar.

## Features

### 1. Real-time Search
- Search updates instantly as you type
- No need to press enter or click a search button
- Searches across multiple fields: drama name, genre, and origin

### 2. Genre Filtering
- Click the filter icon (🔍) to open genre dropdown
- Select a specific genre to filter results
- Active filter shows a yellow badge on the filter icon
- Genres are automatically extracted from your reviews

### 3. Combined Filtering
- Use search term AND genre filter together
- Results update in real-time
- Clear button (×) appears when filters are active

### 4. Visual Indicators
- Search icon (🔍) on the left
- Clear button (×) appears when search is active
- Filter button (🔽) with badge when genre is selected
- Animated film icon (🎬) in the logo

## Components

### SearchContext (`src/context/SearchContext.jsx`)
- Manages global search state
- Fetches all reviews from API
- Handles filtering logic
- Provides filtered results to all components

### SearchBar (`src/components/SearchBar.jsx`)
- Modern input field with icons
- Genre dropdown with smooth animations
- Click-outside detection to close dropdown
- Clear functionality

### Updated Components
- **TopNav**: Integrated SearchBar with FaFilm icon
- **Library**: Uses filtered results from SearchContext
- **MovieCriticDiary**: Refreshes search context after adding reviews

## Usage

### For Users
1. Type in the search bar to filter by name, genre, or origin
2. Click the filter icon to select a specific genre
3. Click the × button to clear all filters
4. Results update automatically in the Library page

### For Developers
```javascript
import { useSearch } from '../context/SearchContext';

const MyComponent = () => {
  const { 
    searchTerm,        // Current search term
    setSearchTerm,     // Update search term
    selectedGenre,     // Current selected genre
    setSelectedGenre,  // Update selected genre
    filteredReviews,   // Filtered results
    allReviews,        // All reviews
    genres,            // Available genres
    isLoading,         // Loading state
    clearSearch,       // Clear all filters
    refreshReviews     // Refresh from API
  } = useSearch();
  
  // Use the filtered results
  return <div>{filteredReviews.map(...)}</div>;
};
```

## Styling

### CSS Variables Used
- `--primary-yellow`: Search icon, active states
- `--dark-gray`: Input background
- `--border-color`: Borders
- `--white`: Text color
- `--disabled-text`: Placeholder text
- `--error-red`: Clear button hover

### Responsive Design
- Desktop: Full-width search bar (min 300px)
- Mobile: Adjusted width, dropdown spans full width
- Smooth animations and transitions

## Icons (react-icons)
- `FaSearch`: Search icon
- `FaFilter`: Filter/genre icon
- `FaTimes`: Clear button
- `FaFilm`: Brand logo icon

## Performance
- Debounced filtering for smooth performance
- Efficient array filtering
- Minimal re-renders with proper state management
- Click-outside detection with cleanup

## Future Enhancements
- Add more filter options (rating, origin, year)
- Search history
- Saved searches
- Advanced search operators
- Export search results
