import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (username, password) => {
    const res = await fetch('http://localhost:4002/auth/login', { // Change 4001 en 4002
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const userData = { username: payload.username, isAdmin: payload.isAdmin };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      alert('Identifiants invalides');
    }
  };

  const register = async (email, username, password) => {
    const res = await fetch('http://localhost:4002/auth/register', { // Change 4001 en 4002
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (res.ok) {
      await login(username, password);
    } else {
      const error = await res.json();
      alert(error.message || 'Erreur lors de l’inscription');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ username: payload.username, isAdmin: payload.isAdmin });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}