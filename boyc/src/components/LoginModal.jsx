import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    if (isRegistering && !email.trim()) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    
    const result = isRegistering 
      ? await register({ username: username.trim(), email: email.trim(), password })
      : await login({ username: username.trim(), password });
    
    setLoading(false);

    if (result.success) {
      setUsername('');
      setPassword('');
      setEmail('');
      setIsRegistering(false);
      onClose();
    } else {
      setError(result.error);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">{isRegistering ? 'Register for BOYC' : 'Login to BOYC'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoFocus
              disabled={loading}
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
          </button>

          <button type="button" className="toggle-mode-btn" onClick={toggleMode} disabled={loading}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
