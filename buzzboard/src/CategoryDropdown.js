import React from 'react';
import { Dropdown } from 'react-bootstrap'; // Import Dropdown from React Bootstrap

function CategoryDropdown({ formData, handleChange }) {
  const categories = [
    'Arts and Performance', 
    'Career/Professional development', 
    'Conference/Symposium',
    'Other/Miscellaneous', 
    'Seminar/Lecture/Colloquium', 
    'Special Event', 
    'Sports/Athletics', 
    'Student Sponsored',
    'Training/Workshop'
  ];

  return (
    <label>
      Category:
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {formData.category || '--Choose a Category--'} {/* Show selected category or default */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((category, index) => (
            <Dropdown.Item 
              key={index} 
              onClick={() => handleChange({ target: { name: 'category', value: category }})} // Handle category selection
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </label>
  );
}

export default CategoryDropdown;
