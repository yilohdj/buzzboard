import React, {useState} from "react";
import './Corkboard.css';

function Corkboard({posters}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (index) => {
        setFlippedIndex((prevIndex) => (prevIndex === index ? null : index)); // Flip the poster on click
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update selected category based on dropdown
    };

    const filteredPosters = selectedCategory
        ? posters.filter((poster) => poster.category === selectedCategory)
        : posters;

    return (
        <div>
            <label>
                Filter by Category:
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">--All Categories--</option>
                    {/* Dynamically create category options */}
                    {Array.from(new Set(posters.map((poster) => poster.category))).map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            <div className="corkboard">
                {posters.map((poster, index) => (
                    <div key={index}
                         className={`poster ${flippedIndex === index ? 'flipped' : ''}`} // Add flipped class if flipped
                         onMouseEnter={() => handleMouseEnter(index)} // Handle hover event
                         onMouseLeave={handleMouseLeave} // Handle mouse leave event
                         onClick={() => handleClick(index)} // Handle click event to flip}
                    >
                        <div className="poster-content">
                            <img
                                src={poster.file}
                                alt={`Poster ${index + 1}`}
                                className="poster-image"
                            />
                            {hoveredIndex === index && flippedIndex !== index && (
                                <div className="title-overlay">{poster.title}</div> // Show title on hover if not flipped
                            )}
                        </div>
                        {flippedIndex === index && (
                            <div className="details-overlay">
                                <div className="category">{poster.category}</div>
                                <div className="description">{poster.description}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Corkboard;