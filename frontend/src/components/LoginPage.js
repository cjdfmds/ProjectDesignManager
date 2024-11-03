import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
//import { signIn } from 'aws-amplify/auth';
import awsConfig from '../aws-exports'; // Ensure the correct path
import { Amplify } from 'aws-amplify';
//import { getCurrentUser } from 'aws-amplify/auth';
import AWS from 'aws-sdk';


Amplify.configure(awsConfig); // Configure Amplify
AWS.config.update({
  region: awsConfig.aws_project_region,
});
const LoginPage = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
    const cognito = new AWS.CognitoIdentityServiceProvider();
    setIsLoading(true);

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: awsConfig.aws_user_pools_web_client_id,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    try {
      const response = await cognito.initiateAuth(params).promise();
      const idToken = response.AuthenticationResult.IdToken;
      setToken(idToken);
      localStorage.setItem('authToken', idToken);
      console.log('Sign in successful:', response);
      alert('Sign in successful!');
      localStorage.setItem('username', username);
      navigate('/dashboard', { state: { username } });
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('Sign in failed. Please check your username and password.');
    }
   finally {
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
          {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
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
