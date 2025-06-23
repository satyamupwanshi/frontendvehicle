// src/pages/MyChats.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyChats() {
  const [chatRooms, setChatRooms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://beckendvehicle-byht.onrender.com/api/chat/my-chats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setChatRooms(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Chats</h2>
      {chatRooms.length === 0 ? (
        <p>No active chats</p>
      ) : (
        chatRooms.map(chat => (
          <div key={chat.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <p><strong>Vehicle:</strong> {chat.vehicleTitle}</p>
            <p><strong>With:</strong> {chat.otherUser}</p>
            <Link to={`/chat/${chat.id}`}>Open Chat</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default MyChats;
