import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function Corkboard({ posters }) {
    return (
        <div className="container mt-4">
            <div className="row">
                {posters.map((poster, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card position-relative">
                            <img
                                className="card-img-top"
                                src={poster.image}
                                alt={poster.title}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-img-overlay d-flex flex-column justify-content-end">
                                <div className="bg-dark text-white p-2 mb-2">
                                    {poster.title}
                                </div>
                                <div className="bg-dark text-white p-2">
                                    <h5 className="card-title">{poster.category}</h5>
                                    <p className="card-text">{poster.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Corkboard;
