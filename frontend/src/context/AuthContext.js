import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.get('/auth/me').then(res => setUser(res.data)).catch(() => { localStorage.removeItem('token'); setUser(null); }).finally(() => setLoading(false));
    else setLoading(false);
  }, []);
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};
