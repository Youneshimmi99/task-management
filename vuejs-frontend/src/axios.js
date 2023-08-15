import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API URL
  withCredentials: false,
});
const token = localStorage.getItem('authToken');

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
