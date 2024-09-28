import React, { useState } from "react";

function PosterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const categories = ['Arts and Performance', 'Career/Professional development', 'Conference/Symposium',
        'Other/Miscellaneous', 'Seminar/Lecture/Colloquium', 'Special event', 'Sports/Athletics', 'Student sponsored',
        'Training/Workshop'];

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
    if (formData.file) {
      reader.readAsDataURL(formData.file);
    }
  };

  return (
      <form className="poster-form" onSubmit={handleSubmit}>
          <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
          </label>
          <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
          </label>
          <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
          </label>
          <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} required/>
          </label>
          <label>
              Category:
              <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">--Please choose a category--</option>
                  {categories.map((category, index) => (
                      <option key={index} value={category}>
                          {category}
                      </option>
                  ))}
              </select>
          </label>
          <label>
              Upload Poster:
              <input type="file" name="file" onChange={handleChange} accept="image/*" required/>
          </label>
          <button type="submit">Submit Poster</button>
      </form>
  );
}

export default PosterForm;