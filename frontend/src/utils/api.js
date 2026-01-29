// src/utils/api.js - Connects your React app to Backend API
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  // Get token from localStorage (your ShopContext)
  const token = localStorage.getItem('token');
  
  const config = {
    headers: { 
      'Content-Type': 'application/json',
    },
    ...options
  };
  
  // Add Authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, config);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const api = {
  // Auth
  register: (data) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  profile: () => apiCall('/auth/profile'),
  
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/products?${query}`);
  },
  
  // Orders/Cart
  createOrder: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/orders?${query}`);
  },
  
  // Upload
  uploadImage: (formData) => apiCall('/upload', { 
    method: 'POST', 
    body: formData 
  }),
  
  // Email
  sendEmail: (data) => apiCall('/send-email', { method: 'POST', body: JSON.stringify(data) })
};

export default api;