import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your API base URL

const authService = {
  register: async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
  },
  login: async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
  },
  logout: async () => {
    return await axios.post(`${API_URL}/logout`);
  },
};

export default authService;