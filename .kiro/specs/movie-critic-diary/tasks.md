# Implementation Plan: Personal Movie Critic Diary

## Overview

This plan implements a React-based movie review diary application with localStorage persistence, interactive star ratings, search/filter capabilities, and a cyberpunk-themed UI. The implementation follows a bottom-up approach, building atomic components first, then composing them into the main application, and finally integrating with routing and styling.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Create component directory structure in `boyc/src/pages/Movies/`
  - Install property-based testing library: `@fast-check/vitest`
  - Create base CSS file for cyberpunk theme variables
  - _Requirements: 10.4, 10.5_

- [ ] 2. Implement StarRating component
  - [x] 2.1 Create StarRating component with interactive star display
    - Implement 10 clickable star icons with hover and click handlers
    - Add state management for hover and selected rating
    - Display numeric rating value (e.g., "8/10")
    - Apply yellow (#FFD700) highlighting for selected/hovered stars
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.6_
  
  - [ ]* 2.2 Write property test for star hover highlighting
    - **Property 8: Star Hover Highlighting**
    - **Validates: Requirements 3.2**
  
  - [ ]* 2.3 Write property test for star click rating selection
    - **Property 9: Star Click Rating Selection**
    - **Validates: Requirements 3.3, 3.4, 3.6**
  
  - [ ]* 2.4 Write property test for rating update capability
    - **Property 10: Rating Update Capability**
    - **Validates: Requirements 3.5**
  
  - [ ]* 2.5 Write unit tests for StarRating edge cases
    - Test initial state (rating = 0)
    - Test boundary values (rating = 1, rating = 10)
    - Test mouse leave behavior
    - _Requirements: 3.1, 3.5_

- [ ] 3. Implement ReviewForm component
  - [x] 3.1 Create ReviewForm with input fields and validation
    - Add input fields for title, imageUrl, and reviewText
    - Integrate StarRating component for rating input
    - Implement form validation logic (all fields required)
    - Add submit button with disabled state based on validation
    - Implement form submission handler with timestamp generation
    - Clear form fields after successful submission
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [ ]* 3.2 Write property test for form validation state
    - **Property 5: Form Validation State**
    - **Validates: Requirements 2.5**
  
  - [ ]* 3.3 Write property test for review creation with timestamp
    - **Property 6: Review Creation with Timestamp**
    - **Validates: Requirements 2.6**
  
  - [ ]* 3.4 Write property test for form reset after submission
    - **Property 7: Form Reset After Submission**
    - **Validates: Requirements 2.7**
  
  - [ ]* 3.5 Write unit tests for ReviewForm UI structure
    - Test all input fields render correctly
    - Test submit button disabled state
    - Test form submission flow
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Implement MovieCard component
  - [x] 4.1 Create MovieCard with review display and delete functionality
    - Display movie poster image with error handling
    - Display movie title, rating badge, and review text
    - Implement image placeholder for failed loads
    - Add delete button with click handler
    - Apply cyberpunk theme styling (yellow accents, black background)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_
  
  - [ ]* 4.2 Write property test for MovieCard complete display
    - **Property 16: MovieCard Complete Display**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
  
  - [ ]* 4.3 Write property test for theme color application
    - **Property 17: Theme Color Application**
    - **Validates: Requirements 6.7**
  
  - [ ]* 4.4 Write unit tests for MovieCard edge cases
    - Test image load failure and placeholder display
    - Test delete button click handler
    - Test card rendering with minimal data
    - _Requirements: 6.6_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement SearchFilter and SortDropdown components
  - [x] 6.1 Create SearchFilter component
    - Add controlled text input for search term
    - Implement onChange handler to emit search term changes
    - Apply cyberpunk theme styling
    - _Requirements: 4.1, 4.3_
  
  - [x] 6.2 Create SortDropdown component
    - Add dropdown with "Highest Rated" and "Newest Date" options
    - Implement onChange handler to emit sort option changes
    - Display currently selected option
    - Apply cyberpunk theme styling
    - _Requirements: 5.1, 5.5_
  
  - [ ]* 6.3 Write property test for sort selection display
    - **Property 15: Sort Selection Display**
    - **Validates: Requirements 5.5**
  
  - [ ]* 6.4 Write unit tests for SearchFilter and SortDropdown
    - Test input field rendering and onChange behavior
    - Test dropdown options and selection
    - _Requirements: 4.1, 5.1_

- [ ] 7. Implement DiaryGrid component
  - [x] 7.1 Create DiaryGrid with responsive grid layout
    - Implement CSS Grid layout with responsive column counts
    - Add 24px gap spacing between cards
    - Map reviews array to MovieCard components
    - Handle empty state with helpful message
    - Implement responsive breakpoints (1 column < 768px, 2 columns 768-1024px, 3 columns > 1024px)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 7.2 Write property test for grid spacing consistency
    - **Property 18: Grid Spacing Consistency**
    - **Validates: Requirements 7.5**
  
  - [ ]* 7.3 Write unit tests for DiaryGrid responsive behavior
    - Test grid column counts at different viewport widths
    - Test empty state display
    - Test MovieCard rendering from reviews array
    - _Requirements: 7.2, 7.3, 7.4_

- [ ] 8. Implement localStorage integration utilities
  - [x] 8.1 Create localStorage helper functions
    - Implement loadReviews() function with JSON parsing and error handling
    - Implement saveReviews() function with JSON serialization and error handling
    - Add try-catch blocks for QuotaExceededError and SyntaxError
    - Use 'movieReviews' as localStorage key
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ]* 8.2 Write property test for serialization round-trip
    - **Property 4: Serialization Round-Trip**
    - **Validates: Requirements 1.4, 1.5**
  
  - [ ]* 8.3 Write unit tests for localStorage error handling
    - Test QuotaExceededError handling
    - Test invalid JSON handling
    - Test empty localStorage initialization
    - _Requirements: 1.3, 1.4, 1.5_

- [ ] 9. Implement MovieCriticDiary main container component
  - [x] 9.1 Create MovieCriticDiary with state management
    - Initialize state for reviews array, searchTerm, and sortOption
    - Implement useEffect for loading reviews from localStorage on mount
    - Implement useEffect for saving reviews to localStorage on state change
    - Create addReview handler to add new reviews to state
    - Create deleteReview handler to remove reviews from state
    - Implement filterReviews function for case-insensitive partial matching
    - Implement sortReviews function for rating and timestamp sorting
    - Compose all child components (ReviewForm, SearchFilter, SortDropdown, DiaryGrid)
    - _Requirements: 1.1, 1.2, 1.3, 4.2, 4.3, 4.4, 4.5, 5.2, 5.3, 5.4, 8.1, 8.2, 8.3, 8.4, 10.1, 10.2, 10.3_
  
  - [ ]* 9.2 Write property test for review creation persistence
    - **Property 1: Review Creation Persistence**
    - **Validates: Requirements 1.1**
  
  - [ ]* 9.3 Write property test for review deletion persistence
    - **Property 2: Review Deletion Persistence**
    - **Validates: Requirements 1.2, 8.2**
  
  - [ ]* 9.4 Write property test for application load retrieval
    - **Property 3: Application Load Retrieval**
    - **Validates: Requirements 1.3**
  
  - [ ]* 9.5 Write property test for search filtering with case insensitivity
    - **Property 11: Search Filtering with Case Insensitivity**
    - **Validates: Requirements 4.2, 4.3**
  
  - [ ]* 9.6 Write property test for real-time search updates
    - **Property 12: Real-Time Search Updates**
    - **Validates: Requirements 4.5**
  
  - [ ]* 9.7 Write property test for sort order correctness
    - **Property 13: Sort Order Correctness**
    - **Validates: Requirements 5.2, 5.3**
  
  - [ ]* 9.8 Write property test for combined filter and sort
    - **Property 14: Combined Filter and Sort**
    - **Validates: Requirements 5.4**
  
  - [ ]* 9.9 Write property test for review deletion from collection
    - **Property 19: Review Deletion from Collection**
    - **Validates: Requirements 8.1, 8.3, 8.4**
  
  - [ ]* 9.10 Write unit tests for MovieCriticDiary integration
    - Test component mounting and localStorage loading
    - Test add review flow end-to-end
    - Test delete review flow end-to-end
    - Test search and sort interaction
    - _Requirements: 4.4, 5.4, 8.4_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement cyberpunk theme styling
  - [ ] 11.1 Create global theme CSS with cyberpunk design system
    - Define CSS variables for theme colors (#0D0D0D, #FFD700)
    - Apply deep black background to body and main containers
    - Style interactive elements with yellow accents
    - Add cyberpunk-inspired borders, shadows, and effects
    - Ensure high-contrast text colors for readability
    - Apply consistent theme across all components
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ]* 11.2 Write property test for theme consistency across components
    - **Property 20: Theme Consistency Across Components**
    - **Validates: Requirements 9.3**
  
  - [ ]* 11.3 Write property test for text contrast readability
    - **Property 21: Text Contrast for Readability**
    - **Validates: Requirements 9.4**
  
  - [ ]* 11.4 Write unit tests for theme application
    - Test CSS variables are defined
    - Test theme colors applied to components
    - Test responsive styling at different breakpoints
    - _Requirements: 9.1, 9.2, 9.5_

- [ ] 12. Integrate MovieCriticDiary into application routing
  - [x] 12.1 Add route for Movie Critic Diary page
    - Import MovieCriticDiary component in App.jsx or routing configuration
    - Add route path (e.g., "/movies" or "/diary")
    - Update navigation menu to include link to Movie Critic Diary
    - Test navigation to the new page
    - _Requirements: 10.1_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples, edge cases, and UI structure
- The implementation uses React functional components with hooks throughout
- localStorage integration includes comprehensive error handling
- The cyberpunk theme uses deep black (#0D0D0D) and yellow (#FFD700) consistently
- Responsive design supports mobile (< 768px), tablet (768-1024px), and desktop (> 1024px)
