import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import awsConfig from '../aws-exports'; // Ensure the correct path
import { Amplify } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth';

Amplify.configure(awsConfig); // Configure Amplify

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Pass the authFlowType as part of the signIn options
      await signIn({
        username,
        password,
        authFlowType: 'CUSTOM_WITHOUT_SRP', // Specify the custom authentication flow
      });
      
      alert('Login successful!');
      localStorage.setItem('username', username);
      navigate('/dashboard', { state: { username } });
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" p={3} boxShadow={3} borderRadius={4} bgcolor="background.paper">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
