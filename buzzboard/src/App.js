import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PosterForm from "./PosterForm";
import Corkboard from "./Corkboard";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import icon from './icon.png';

function App() {
  const [posters, setPosters] = useState([]);

  const handlePosterSubmit = (poster) => {
    setPosters([...posters, poster]);
  };

  return (
    <Router>
      <div className="App">
        <header>
        <img src={icon}
        alt="Icon" 
        style={{ width: '70px', height: 'auto', marginRight: '10px' }} 
        align="left"/>
        <h1 className="title">Georgia Tech Buzzboard</h1>
        </header>

        <Container>
          <Navbar bg="custom" variant="dark" expand="lg" className="custom-navbar">
            <Container className="justify-content-center">
              <Navbar.Brand>Buzzboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link as={Link} to="/" className="nav-link-style">Submit a Poster</Nav.Link>
                <Nav.Link as={Link} to="/corkboard" className="nav-link-style">View Buzzboard</Nav.Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
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