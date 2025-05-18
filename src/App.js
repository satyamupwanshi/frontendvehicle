import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from './pages/VehicleList';
import VehicleForm from './pages/VehicleForm';
import BuySellHome from './pages/BuySellHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuySellHome />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/sell" element={<VehicleForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;