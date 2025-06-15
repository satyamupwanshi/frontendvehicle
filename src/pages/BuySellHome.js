import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BuySellHome.css';

function BuySellHome() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  console.log(role);

  const handleSellClick = () => {
    if (token) {
      navigate('/sell');
    } else {
      alert('Please login to sell a vehicle.');
      navigate('/login');
    }
  };

  return (
    <div className="buy-sell-home">
      <nav className="navbar">
        <div className="logo">Vroomle</div>
        <div className="nav-links">
          {role === 'ADMIN' && <Link to="/admin" className="nav-link">Admin</Link>}
          {!token ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              <span style={{ color: '#fff', marginRight: '10px' }}>Hi, {username}</span>
              <Link to="/my-vehicles" className="nav-link">My Dashboard</Link>
              <Link to="/logout" className="nav-link">Logout</Link>
            </>
          )}
        </div>
      </nav>

      <div className="hero">
        <h1>Buy & Sell Vehicles with Confidence</h1>
        <p>Welcome to <span className="highlight">vroomle.com</span> — your trusted platform for seamless vehicle transactions.</p>
        <div className="hero-buttons">
          <Link to="/vehicles" className="btn light">Buy Vehicles</Link>
          <button className="btn dark" onClick={handleSellClick}>Sell Your Vehicle</button>
        </div>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Vroomle. All rights reserved.
      </footer>
    </div>
  );
}

export default BuySellHome;