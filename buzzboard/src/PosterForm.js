import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import CategoryDropdown from './CategoryDropdown';

function PosterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const navigate = useNavigate();

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Get the first file
    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, file });
    } else {
      alert("Please upload an image file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] // Accepts any image file type
    }
  });

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
      navigate("/corkboard");
    };
    if (formData.file) {
      reader.readAsDataURL(formData.file);
    }
  };

  return (
    <Form className="poster-form" onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </Form.Group>

      <Form.Group controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter title of the poster"
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter description"
          rows={3}
        />
      </Form.Group>
        <CategoryDropdown formData={formData} handleChange={handleChange} />
        {/* Drag and Drop Area */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag and drop an image file here, or click to select one</p>
        </div>
        {/* Display the selected file name */}
        {formData.file && <p>Selected file: {formData.file.name}</p>}

        <Button className="custom-button" variant="primary" type="submit" size="lg" style={{ marginTop: '20px', backgroundColor: "navy", borderColor: "navy" }}>
        Submit Poster
      </Button>
      </Form>
  );
}

export default PosterForm;
