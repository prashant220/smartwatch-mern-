// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (error) {
        console.error('User fetch failed:', error);
        logout();
      }
    };

    fetchUser();
  }, [token]);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
