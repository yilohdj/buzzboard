import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PosterForm from "./PosterForm";
import Corkboard from "./Corkboard";
import "./App.css";

function App() {
  const [posters, setPosters] = useState([]);

  const handlePosterSubmit = (poster) => {
    setPosters([...posters, poster]);
  };

  return (
    <Router>
      <div className="App">
        <header>
        <h1 className="title">Georgia Tech Buzzboard</h1>
        </header>

        <div className="nav-oval">
          <nav>
            <Link to="/">Submit a Poster</Link> | <Link to="/corkboard">View Corkboard</Link>
          </nav>
        </div>
        <Routes>
          <Route
            path="/"
            element={<PosterForm onSubmit={handlePosterSubmit} />}
          />
          <Route
            path="/corkboard"
            element={<Corkboard posters={posters} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;