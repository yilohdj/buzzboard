import React, { useState } from 'react';
import { login } from './authService';
import { useNavigate } from 'react-router-dom';

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
        setIsAuth(true);
        navigate('/');
      }
    } catch (err) {
      console.log('Invalid credentials!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;