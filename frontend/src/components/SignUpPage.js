import { TextField, Button, Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import awsConfig from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { confirmSignUp } from 'aws-amplify/auth';
import AWS from 'aws-sdk';

Amplify.configure(awsConfig);
AWS.config.update({
  region: 'ap-southeast-2', // e.g., 'us-east-1'
  accessKeyId: awsConfig.aws_access_key_id,
  secretAccessKey: awsConfig.aws_secret_access_key,
});

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
    try {
      const cognito = new AWS.CognitoIdentityServiceProvider();
      const params = {
        UserPoolId: awsConfig.aws_user_pools_id,
        Filter: `email = "${email}"`, // Filter for email
      };
  
      const existingUsers = await cognito.listUsers(params).promise();
      if (existingUsers.Users && existingUsers.Users.length > 0) {
        setError('An account with this email already exists.');
        setIsLoading(false);
        return; // Stop execution if email is already registered
      }
  
      // Proceed with signup
      await cognito.signUp({
        ClientId: awsConfig.aws_user_pools_web_client_id,
        Username: username, 
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
        ],
      }).promise();
  
      alert('Sign up successful! Please check your email for the confirmation code.');
      setIsConfirmationStep(true);
    } catch (error) {
      console.error('Error during sign up:', error);
      setError(error.message || 'An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmSignUp({
        username, // Use the username, not the email
        confirmationCode,
        options: {
          forceAliasCreation: true,
        },
      });

      alert('Account confirmed! Redirecting to login page.');
      navigate('/login');
    } catch (error) {
      console.error('Error during confirmation:', error);
      if (
        error.code === 'NotAuthorizedException' &&
        error.message.includes('Current status is CONFIRMED')
      ) {
        alert('User is already confirmed. Redirecting to login.');
        navigate('/login');
      } else {
        setError(error.message || 'An error occurred during confirmation.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isConfirmationStep ? 'Confirm Signup' : 'Sign Up'}
        </Typography>

        <Box
          component="form"
          onSubmit={isConfirmationStep ? handleConfirmSignUp : handleSignUp}
          noValidate
          sx={{ mt: 3, width: '100%' }}
        >
          {/* Username Field */}
          <TextField
            variant="outlined"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
            disabled={isConfirmationStep} // Disable when in confirmation step
          />

          {/* Password Field */}
          {!isConfirmationStep && (
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
            />
          )}

          {/* Email Field */}
          {!isConfirmationStep && (
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
          )}

          {/* Confirmation Code Field */}
          {isConfirmationStep && (
            <TextField
              variant="outlined"
              fullWidth
              label="Confirmation Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
              margin="normal"
            />
          )}

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Signup / Confirm Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isConfirmationStep ? (
              'Confirm Sign Up'
            ) : (
              'Sign Up'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;