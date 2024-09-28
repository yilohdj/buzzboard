import axios from 'axios';

const API_URL = `http://localhost:${process.env.PORT || 5001}/api`;

export const register = async (username, password) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store JWT in local storage
  }
  return response.data;
};