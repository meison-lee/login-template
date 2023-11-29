import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';



function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Welcome to My home</h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;
