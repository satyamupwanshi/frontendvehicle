// src/pages/VehicleList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://beckendvehicle-byht.onrender.com/vehicles/', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
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
                src={`https://beckendvehicle-byht.onrender.com/media/${v.image}`}
                alt={v.title}
                style={{
                  width: '300px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default VehicleList;
