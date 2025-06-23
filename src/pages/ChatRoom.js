import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ChatRoom() {
  const { chatRoomId } = useParams(); // from URL
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchMessages();
  }, [chatRoomId]);

  const fetchMessages = () => {
    axios.get(`https://beckendvehicle-byht.onrender.com/api/chat/messages/${chatRoomId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error('Error loading messages:', err));
  };

  const sendMessage = () => {
    if (newMsg.trim() === '') return;

    axios.post(`https://beckendvehicle-byht.onrender.com/api/chat/send`, {
      chatRoomId,
      content: newMsg
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setNewMsg('');
      fetchMessages(); // reload
    })
    .catch(err => console.error('Error sending message:', err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Room</h2>

      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '15px'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender.username === username ? 'right' : 'left',
              marginBottom: '8px'
            }}
          >
            <b>{msg.sender.username}:</b> <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 12px', marginLeft: '5px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
