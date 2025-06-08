import React, { useState } from 'react';
import axios from 'axios';
import './VehicleForm.css';

function VehicleForm() {
  const [form, setForm] = useState({ title: '', description: '', price: '', type: 'Car', image: null });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image of the vehicle.");
      return;
    }
    
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('type', form.type);
    formData.append('image', form.image);

    axios.post('https://beckendvehicle-byht.onrender.com/api/vehicles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => alert("Vehicle listed successfully"))
      .catch(() => alert("Failed to list vehicle"));
  };

  return (
    <div className="vehicle-form-container">
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <h2>Sell Your Vehicle</h2>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <select name="type" onChange={handleChange}>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select><br />
        <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} /><br />
        {form.image && (
          <img src={URL.createObjectURL(form.image)} alt="Preview" style={{ width: '200px', marginTop: '10px', borderRadius: '10px' }} />
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VehicleForm;
