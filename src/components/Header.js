import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // optional: set during login
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">Vroomle</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/vehicles" className="nav-link">Buy</Link>
        <Link to="/sell" className="nav-link">Sell</Link>

        {role === 'ADMIN' && <Link to="/admin" className="nav-link">Admin</Link>}

        {!token ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="signup-btn">Sign Up</Link>
          </>
        ) : (
          <>
            <span style={{ color: '#fff', marginRight: '10px' }}>Hi, {username}</span>
            <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
