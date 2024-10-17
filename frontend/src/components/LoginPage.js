import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('https://3onj7rklk6.execute-api.ap-southeast-2.amazonaws.com/dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      if (data.token) {
        sessionStorage.setItem('token', data.token); // Use sessionStorage for better security
        
        if (data.groups.includes('Admins')) {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <h2>Login</h2>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
