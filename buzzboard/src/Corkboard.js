import React from "react";

function Corkboard({ posters }) {
  return (
    <div className="corkboard">
      {posters.map((poster, index) => (
        <div key={index} className="poster">
          <img src={poster.file} alt={`Poster ${index + 1}`} className="poster-image" />
        </div>
      ))}
    </div>
  );
}

export default Corkboard;