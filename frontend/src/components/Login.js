import React, { useState, useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Blog from './Blog';
import { validateToken } from './validation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submit logic here
    console.log(username, password);
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data.accessToken);
      login(data.accessToken, data.refreshToken);
      navigate('/blog')
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
    // ... rest of submit logic
  };

  return (
    isAuthenticated? <Blog/>:
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
