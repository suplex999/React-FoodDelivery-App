import axios from 'axios';

// ✅ Auto-add JWT token to ALL API requests
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodkartAuthToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
