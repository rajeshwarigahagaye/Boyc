
import { useState } from 'react';
import './Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to BOYC</h1>
        <p className="home-description">
          Your ultimate destination for anime and movie reviews
        </p>
        
        <div className="home-features">
          <div className="feature-card">
            <h3>Movie Reviews</h3>
            <p>Create and manage your personal movie critic diary</p>
          </div>
          
          <div className="feature-card">
            <h3>Anime Collection</h3>
            <p>Browse and discover your favorite anime series</p>
          </div>
          
          <div className="feature-card">
            <h3>Top Rated</h3>
            <p>Explore the highest rated content from our community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
