import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  
import './AuthPages.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://beckendvehicle-byht.onrender.com/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', credentials.username);
      localStorage.setItem('role', res.data.role);
      alert('Login successful');
      window.location.href = '/';
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
      </div>
    </div>
  );
}

export default Login;
