import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://beckendvehicle-byht.onrender.com/api/vehicles/my-vehicles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setVehicles(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Uploaded Vehicles</h2>
      {vehicles.length === 0 ? <p>No vehicles found.</p> :
        vehicles.map(v => (
          <div key={v.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <p><strong>Price:</strong> ₹{v.price}</p>
            <p><strong>Status:</strong> {v.is_sold ? 'Sold' : 'Available'}</p>
          </div>
        ))
      }
    </div>
  );
}

export default UserDashboard;
