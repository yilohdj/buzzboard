import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Corkboard({ posters }) {
    return (
        <div className="container mt-4">
            <div className="row corkboard">
                {posters.map((poster, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center" key={index}>
                        <div className="card poster">
                            <img
                            <img
                                className="card-img-top poster-image"
                                src={poster.image}
                                alt={poster.title}
                            />
                            <div className="details-overlay">
                                <h5 className="card-title">{poster.title}</h5>
                                <h6 className="category">{poster.category}</h6>
                                <p className="description">
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
