import React from "react";
import './Hero.css'

export default function Hero() {
    return(
        <>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <h1 className="main-logo-text">BOYC</h1>
          
          <div className="search-container">
            <input type="text" placeholder="Search anime..." className="search-input" />
            <button className="search-btn">🔍</button>
          </div>

          <div className="top-search-tags">
            <strong>Top search:</strong> ...
          </div>

          <button className="view-site-btn">View Full Site →</button>
        </div>

        {/* Character Image Placeholder */}
        {/* <div className="hero-image">
          <img src="ceri.jpg" alt="Hero" />
        </div> */}
      </main>

      <footer className="footer-bar">
        <span>Share BOYC to your friends</span>
      </footer>
    
    </>
    )
    
}