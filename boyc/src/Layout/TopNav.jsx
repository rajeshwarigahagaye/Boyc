import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import SettingsModal from '../components/SettingsModal';
import SearchBar from '../components/SearchBar';
import './TopNav.css';

const TopNav = () => {
  const location = useLocation();
  const { isLoggedIn, username, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Add Review', path: '/add-review' },
    { name: 'Library', path: '/library' }
  ];

  return (
    <>
      <nav className="topnav-container">
        <div className="topnav-left">
          <Link to="/" className="brand-logo">
            <FaFilm className="brand-icon" />
            BOYC<span>.</span>
          </Link>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="topnav-right">
          <SearchBar />
          
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="username">👤 {username}</span>
              <button className="settings-btn" onClick={() => setShowSettingsModal(true)}>
                ⚙️
              </button>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          )}
        </div>
      </nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </>
  );
};

export default TopNav;
