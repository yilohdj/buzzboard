import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Corkboard({ posters }) {
    return (
        <div className="container mt-4">
            <div className="row corkboard">
                {posters.map((poster, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center" key={index}>
                        <div className="card poster" style={{ width: '300px', height: '400px' }}>
                            <img
                                className="card-img-top poster-image"
                                src={poster.image}
                                alt={poster.title}
                                style={{ height: '250px', objectFit: 'cover' }} // Optional styling for the image
                            />
                            <div className="details-overlay p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
                                <h5 className="card-title">{poster.title}</h5>
                                <h6 className="category">{poster.category}</h6>
                                <p className="description" style={{ whiteSpace: 'normal' }}>
                                    {poster.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Corkboard;
