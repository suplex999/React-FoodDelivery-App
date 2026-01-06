import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuth(true);
      // Decode or fetch user from token if needed
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsAuth(true);
  };

  const signup = (userData) => {
    // Store user locally (or send to API)
    localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), userData]));
    // Generate simple token for demo
    const token = btoa(JSON.stringify(userData));
    login(userData, token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
