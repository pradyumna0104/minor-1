import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// 1. Create the context
const AuthContext = createContext();

// Define the API URL
const API_URL = '/api/auth';

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  // NEW: Add a loading state
  const [loading, setLoading] = useState(true);

  // This will run when the app loads to check if user is already logged in
  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          // Set auth header for all subsequent requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired
            logout();
          } else {
            // Token is valid, fetch user details from /api/auth/me
            const { data } = await axios.get(`${API_URL}/me`);
            setUser(data); // This data will have { _id, name, email, role }
          }
        } catch (error) {
          console.error('Failed to load user', error);
          logout(); // Log out if token is invalid or fetching fails
        }
      }
      // Finished loading, whether we have a user or not
      setLoading(false);
    };

    loadUserFromToken();
  }, [token]);

  // Register function
  const register = async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    return response.data;
  };

  // Login function
  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data.token) {
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token); // This will trigger the useEffect
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response.data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    setLoading(false); // Make sure loading is false on logout
  };

  return (
    // Pass the new loading state
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};