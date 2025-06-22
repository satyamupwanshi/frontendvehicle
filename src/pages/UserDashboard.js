import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    axios.get('https://beckendvehicle-byht.onrender.com/api/my-vehicles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setVehicles(res.data))
    .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      axios.delete(`https://beckendvehicle-byht.onrender.com/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        // Remove the deleted vehicle from state
        setVehicles(prev => prev.filter(v => v.id !== id));
      })
      .catch(err => {
        console.error('Error deleting vehicle:', err);
        alert('Failed to delete vehicle.');
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Uploaded Vehicles</h2>
      {vehicles.length === 0 ? <p>No vehicles found.</p> :
        vehicles.map(v => (
          <div key={v.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <p><strong>Price:</strong> ₹{Number(v.price).toLocaleString('en-IN')}</p>
            <p><strong>Status:</strong> {v.is_sold ? 'Sold' : 'Available'}</p>

            {v.image && (
              <img
                src={v.image}
                alt={v.title}
                style={{
                  width: '300px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}
              />
            )}

            <button
              onClick={() => handleDelete(v.id)}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default UserDashboard;
