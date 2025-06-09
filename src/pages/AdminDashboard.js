import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https:///beckendvehicle-byht.onrender.com/api/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {stats ? (
        <div>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Vehicles: {stats.totalVehicles}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminDashboard;
