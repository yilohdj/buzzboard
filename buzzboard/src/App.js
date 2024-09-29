import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PosterForm from "./PosterForm";
import Corkboard from "./Corkboard";
import Register from "./Register";
import Login from "./Login";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false); // track if user is logged in
  const [posters, setPosters] = useState([]);

  // check local storage for if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  // hook to log user out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  const handlePosterSubmit = (poster) => {
    setPosters([...posters, poster]);
  };

  return (
    <Router>
      <header>
        {isAuth ? (
          <nav>
            <button onClick={handleLogout}>Logout</button>
            {/* Other links for authenticated users */}
          </nav>
        ) : (
          <nav>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </nav>
        )}
      </header>

      <div className="App">
        <header>
        <h1 className="title">Georgia Tech Buzzboard</h1>
        </header>

        <nav>
          <Link to="/">Submit a Poster</Link> | <Link to="/corkboard">View Buzzboard</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<PosterForm onSubmit={handlePosterSubmit} />}
          />
          <Route
            path="/corkboard"
            element={<Corkboard posters={posters} />}
          />
          <Route
            path="/register"
            element={<Register/>}
          />
          <Route
            path="/login"
            element={<Login setIsAuth = {setIsAuth} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;