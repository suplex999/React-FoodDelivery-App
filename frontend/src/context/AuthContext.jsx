import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('foodkartAuthToken');
    const userData = localStorage.getItem('foodkartUser');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('foodkartAuthToken', token);
    localStorage.setItem('foodkartUser', JSON.stringify(userData));
    setUser(userData);
    
    // ✅ Success toast
    alert(`Welcome back, ${userData.email}! 🎉`);
  };

  const logout = () => {
    localStorage.removeItem('foodkartAuthToken');
    localStorage.removeItem('foodkartUser');
    setUser(null);
    
    // ✅ Logout toast
    alert('Logged out successfully. See you soon! 👋');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
