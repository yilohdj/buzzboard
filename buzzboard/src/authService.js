import axios from 'axios';

const API_URL = `http://localhost:${process.env.PORT || 5001}/api`;

export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  if (response.data.token && response.data.username) {
    localStorage.setItem('token', response.data.token);    // Store token
    localStorage.setItem('username', response.data.username); // Store username
  }
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token && response.data.username) {
    localStorage.setItem('token', response.data.token);    // Store token
    localStorage.setItem('username', response.data.username); // Store username
  }
  return response.data;
};