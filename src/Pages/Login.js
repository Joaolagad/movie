import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css'
import { Button } from '@mui/material';
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const isAuthenticated = await authenticate(username, password);

      if (isAuthenticated) {
        await loginWithRedirect({
          screen_hint: 'login',
          login_hint: username,
          password,
        });
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.log('Error occurred during authentication');
    }
  };

  const authenticate = async (username, password) => {
    const isValidCredentials = username === 'admin' && password === 'password';

    return isValidCredentials;
  };

  if (isAuthenticated) {
    // User is already authenticated, handle the successful login
    // You can redirect or perform any other actions here
    return <div>You are already logged in.</div>;
  }

  return (
    <div className='log'>
      <h2 className='login'>Login Page</h2>
      <div className='username'>
        <label className='label-username' htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='password'>
        <label className='label-password' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleLogin}>Log In</Button>
    </div>
  );
};

export default LoginButton;
