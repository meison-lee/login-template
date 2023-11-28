// export default ProtectedRoute;
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { validateToken } from './validation';

function ProtectedRoute({ path, element: Component, ...rest }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  useEffect(() =>{
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setIsAuthenticated(false);
    }
    validateToken(accessToken).then((res) => {
      console.log("res", res)
      if (res.valid) {
        setIsAuthenticated(true);
      }
    })
  }, [setIsAuthenticated]);

  return (
    isAuthenticated? <Outlet /> : <Navigate to="/login" />
  );
}

export default ProtectedRoute;
