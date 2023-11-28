import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';



function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>This is the home page of the blog.</p>
    </div>
  );
}

export default Home;
