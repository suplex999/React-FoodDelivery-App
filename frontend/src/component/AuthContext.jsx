// // AuthContext.jsx - Full JWT Auth
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const AuthContext = createContext();

//  const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [loading, setLoading] = useState(true);

//   // Axios interceptor - auto-add token
//   axios.interceptors.request.use((config) => {
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });

//   // Check auth on load
//   useEffect(() => {
//     if (token) verifyToken();
//   }, []);

//   const register = async (email, password, name = '') => {
//     try {
//       const res = await axios.post('/api/register', { email, password, name });
//       const { accessToken, user } = res.data;
//       localStorage.setItem('token', accessToken);
//       setToken(accessToken);
//       setUser(user);
//       toast.success('Welcome! Account created.');
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data || 'Registration failed');
//       return false;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/api/login', { email, password });
//       const { accessToken, user } = res.data;
//       localStorage.setItem('token', accessToken);
//       setToken(accessToken);
//       setUser(user);
//       toast.success(`Welcome back, ${user.name || user.email}!`);
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Invalid credentials');
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     toast.info('Logged out successfully');
//   };

//   const verifyToken = async () => {
//     try {
//       const res = await axios.post('/api/login/silent', { token });
//       setUser(res.data.user);
//     } catch {
//       logout();
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// src/components/Auth.jsx - JWT Login/Register
// import { useState } from 'react';
// import api from '../utils/api';

// const Auth = ({ onLogin }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = isRegister 
//         ? await api.register(formData)
//         : await api.login(formData);
      
//       localStorage.setItem('token', data.token);
//       onLogin(data.user);
//     } catch (error) {
//       alert(error.error || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         {isRegister ? 'Register' : 'Login'}
//       </h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         className="w-full p-4 mb-4 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//         className="w-full p-4 mb-6 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200"
//         required
//       />
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-all"
//       >
//         {isRegister ? 'Register' : 'Login'}
//       </button>
//       <p className="mt-4 text-center">
//         {isRegister ? 'Already have account?' : "Don't have account?"}{' '}
//         <button
//           type="button"
//           onClick={() => setIsRegister(!isRegister)}
//           className="text-purple-600 font-semibold hover:underline"
//         >
//           {isRegister ? 'Login' : 'Register'}
//         </button>
//       </p>
//     </form>
//   );
// };

// export default Auth;

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

