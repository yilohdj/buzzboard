import React, { useState } from 'react';
import { register } from './authService';
import { useNavigate } from 'react-router-dom';
import { login } from './authService';
import { Form, Button } from 'react-bootstrap';
import "./App.css";

const Register = ({setIsAuth}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerRes = await register(username, password);
      console.log(registerRes);

      if (registerRes) {
        const loginRes = await login(username, password);
        console.log(loginRes);

        if (loginRes) {
          localStorage.setItem('token', loginRes.token);
          setIsAuth(true);
          navigate('/');
        } else {
          console.log("Login failed!");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Registration failed!");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64vh', flexDirection: 'column' }}>
      <h2 className="title">Register an Account</h2>
      <Form onSubmit={handleSubmit}>
          <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required
              style={{ margin: 10, width: 256 }} />
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required
              style={{ margin: 10, width: 256 }} />
          <Button className="custom-button" variant="primary" type="submit" size="lg"
              style={{ marginTop: '20px', backgroundColor: "navy", borderColor: "navy", margin: 10 }}>
            Register
          </Button>
      </Form>
    </div>
  );
};

export default Register;