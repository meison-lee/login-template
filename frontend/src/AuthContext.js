// having a global varaiable here to store the authentication state

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user's token or authentication flag exists in storage
    // should send request to backend to check if the token is valid
    // const token = localStorage.getItem('token');
    // if (token) {
    //   setIsAuthenticated(true);
    // }
    console.log("isAuthenticated in AuthContect useEffect", isAuthenticated)
  }, [isAuthenticated]);

  const login = (access_token, refresh_token) => {

    // both access and refresh token are stored in local storage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    console.log("get refresh token", localStorage.getItem('refresh_token'));
    setIsAuthenticated(true);
  };

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refresh_token')
      }),
    })
    .then(response => {
      if (response.status === 204) {
        // Logout was successful
        console.log('Logged out successfully');
        // Clear token from localStorage or handle client-side logout logic
        localStorage.removeItem('token');
      } else {
        // Handle errors, such as displaying a message to the user
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    // The value prop of the Provider accepts any type of value, it doesn't have to be an object.
    // children is a special prop that represents the JSX passed between the opening and closing tags when invoking a component.
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
