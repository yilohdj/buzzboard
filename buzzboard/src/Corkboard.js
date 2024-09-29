import React, {useState} from "react";
import { Dropdown } from "react-bootstrap";
import './Corkboard.css';
import './CorkboardStyling';

function Corkboard({posters}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (index) => {
        setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
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
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "navy", borderColor: "navy", color: 'white' }} id="dropdown-basic">
                    {selectedCategory || '--All Categories--'} {/* Show selected category or default */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCategoryChange({ target: { value: "" }})}>
                        --All Categories--
                    </Dropdown.Item>
                    {Array.from(new Set(posters.map((poster) => poster.category))).map((category, index) => (
                        <Dropdown.Item 
                            key={index} 
                            onClick={() => handleCategoryChange({ target: { value: category }})} // Handle category selection
                        >
                            {category}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </label>
            <div className="corkboard">
                {filteredPosters.map((poster, index) => (
                    <div key={index}
                         className="poster"
                         onMouseEnter={() => handleMouseEnter(index)} // Handle hover event
                         onMouseLeave={handleMouseLeave} // Handle mouse leave event
                         onClick={() => handleClick(index)}
                    >
                        <div className="poster-content">
                            <img
                                src={poster.file}
                                alt={`Poster ${index + 1}`}
                                className="poster-image"
                            />
                            {hoveredIndex === index && clickedIndex != index && (
                                <div className="title-overlay">{poster.title}</div>
                            )}
                            {clickedIndex === index && (
                                <div className="details-overlay">
                                    <div className="title">{poster.title}</div>
                                    <div className="category">{poster.category}</div>
                                    <div className="description">{poster.description}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Corkboard;