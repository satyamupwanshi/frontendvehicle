import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from './pages/VehicleList';
import VehicleForm from './pages/VehicleForm';
import BuySellHome from './pages/BuySellHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import UserDashboard from './pages/UserDashboard';
import ChatRoom from './pages/ChatRoom';
import MyChats from './pages/MyChats';


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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-vehicles" element={<UserDashboard />} />
        <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
        <Route path="/chats" element={<MyChats />} />
      </Routes>
    </Router>
    
  );
}

export default App;