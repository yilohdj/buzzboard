import React, { useState } from 'react';
import { login } from './authService';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import "./App.css";

const Login = ({setIsAuth}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', username);
        setIsAuth(true);
        navigate('/');
      }
    } catch (err) {
      console.log('Invalid credentials!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64vh', flexDirection: 'column' }}>
      <h2 className="title">Login to an Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required
          style={{ margin: 10, width: 256 }} />
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required
          style={{ margin: 10, width: 256 }} />
        <Button className="custom-button" variant="primary" type="submit" size="lg"
          style={{ marginTop: '20px', backgroundColor: "navy", borderColor: "navy", margin: 10 }}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;