// src/pages/VehicleList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token) ;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

axios.get('https://beckendvehicle-byht.onrender.com/api/vehicles', { headers })
  .then(res => {
    setVehicles(res.data);
    setLoading(false);
  })
  .catch(err => {
    console.error(err);
    setError('Something went wrong while loading vehicles.');
    setLoading(false);
  });

  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString('en-IN');
  };

  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Vehicles</h2>
      {vehicles.filter(v => !v.is_sold).map(v => {
        console.log("Image path:", v.image);

        return (
          <div key={v.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#f5f5f5'
          }}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <p><strong>Price:</strong> ₹{formatPrice(v.price)}</p>

            {v.image && (
              <img
                src={v.image}
                alt={v.title}
                style={{
                  width: '300px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
        
            {localStorage.getItem("username") !== v.user?.username && (
              <button
              onClick={() => {
                const token = localStorage.getItem('token');
                axios.post('https://beckendvehicle-byht.onrender.com/api/chat/start', {
                  vehicleId: v.id,
                  sellerId: v.user.id     // ✅ this is important!
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                  const chatId = res.data;
                  window.location.href = `/chat/${chatId}`; // navigate to chat room
                })
                .catch(err => {
                  console.error(err);
                  alert("Couldn't start chat. Make sure you're logged in.");
                });
              }}
            >
              Chat with Seller
            </button>

            )}
          </div>
        );
      })}
    </div>
  );
}

export default VehicleList;
