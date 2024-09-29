import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PosterForm from "./PosterForm";
import Corkboard from "./Corkboard";
import Register from "./Register";
import Login from "./Login";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import icon from './icon.png';

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
    localStorage.removeItem('username');
    setIsAuth(false);
  };

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
              <Navbar.Brand href="/" className="brand-style">Buzzboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link as={Link} to="/corkboard" className="nav-link-style">View Buzzboard</Nav.Link>
                {isAuth ?
                  <>
                    <Nav.Link as={Link} to="/submit" className="nav-link-style">Submit a Poster</Nav.Link>
                    <Nav.Link as={Link} to="/" className="nav-link-style" onClick={handleLogout}>Logout</Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link as={Link} to="register" className="nav-link-style">Register</Nav.Link>
                    <Nav.Link as={Link} to="/login" className="nav-link-style">Login</Nav.Link>
                  </>
                }
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Routes>
          {isAuth ? 
            <>
              <Route
                path="/submit"
                element={<PosterForm onSubmit={handlePosterSubmit} />}
              />
            </>
            :
            <>
              <Route
              path="/register"
              element={<Register setIsAuth = {setIsAuth} />}
              />
              <Route
                path="/login"
                element={<Login setIsAuth = {setIsAuth} />}
              />
            </>
          }
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