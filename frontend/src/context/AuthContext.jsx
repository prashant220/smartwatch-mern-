import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // 🧠 Hydrate user if token exists but user is still null
  useEffect(() => {
    const hydrateUser = async () => {
      if (!token || user) return;

      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (error) {
        console.error('User hydration failed:', error);
        logout();
      }
    };

    hydrateUser();
  }, [token, user]);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
