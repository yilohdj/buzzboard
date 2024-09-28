import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PosterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    file: null,
  });
  const navigate = useNavigate(); // Initialize navigate function
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      onSubmit({
        ...formData,
        file: reader.result, // base64 image data
      });
    };
    navigate("/corkboard");
    if (formData.file) {
      reader.readAsDataURL(formData.file);
    }
  };

  return (
    <form className="poster-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Upload Poster:
        <input type="file" name="file" onChange={handleChange} accept="image/*" required />
      </label>
      <button type="submit">Submit Poster</button>
    </form>
  );
}

export default PosterForm;