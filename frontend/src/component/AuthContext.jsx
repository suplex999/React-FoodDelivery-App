
// frontend/src/component/AuthContext.jsx - BACKEND READY
// frontend/src/component/AuthContext.jsx - FIXED LOGIN
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ FIXED: Proper login function
  const login = async (email, password) => {
    try {
      console.log('Login attempt:', { email }); // DEBUG
      const response = await axios.post(`${API_BASE}/auth/login`, 
        { email, password }, // ✅ Plain object (not FormData)
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Login success:', response.data); // DEBUG
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  // ✅ FIXED: Proper register function
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

