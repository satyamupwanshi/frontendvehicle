import React, { useState } from 'react';
import axios from 'axios';
import './VehicleForm.css';

function VehicleForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'Car',
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert('Please upload an image of the vehicle.');
      return;
    }

    try {
      // Step 1: Upload image to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append('file', form.image);
      imageFormData.append('upload_preset', 'satyam'); // 🔁 Replace this
      imageFormData.append('cloud_name', 'diar4w543'); // 🔁 Replace this (optional if using correct endpoint)

      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/diar4w543/image/upload', // 🔁 Replace this
        imageFormData
      );

      const imageUrl = uploadRes.data.secure_url;

      // Step 2: Send vehicle data to your backend
      const vehicleData = {
        title: form.title,
        description: form.description,
        price: form.price,
        type: form.type,
        image: imageUrl, // ✅ Use Cloudinary URL
      };

      await axios.post('https://beckendvehicle-byht.onrender.com/api/vehicles/cloud', vehicleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Vehicle listed successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to list vehicle.');
    }
  };

  return (
    <div className="vehicle-form-container">
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <h2>Sell Your Vehicle</h2>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={form.title}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          value={form.price}
          required
        />
        <select name="type" onChange={handleChange} value={form.type}>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <br />
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            alt="Preview"
            style={{ width: '200px', marginTop: '10px', borderRadius: '10px' }}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VehicleForm;
