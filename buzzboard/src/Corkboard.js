import React, { useState } from "react";
import './Corkboard.css';

function Corkboard({ posters }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="corkboard">
      {posters.map((poster, index) => (
        <div key={index} className="poster" onMouseEnter={() => handleMouseEnter(index)}
             onMouseLeave={handleMouseLeave}>
          <img src={poster.file} alt={`Poster ${index + 1}`} className="poster-image" />
        </div>
      ))}
    </div>
  );
}

export default Corkboard;