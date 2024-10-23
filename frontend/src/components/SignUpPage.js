import { TextField, Button, Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import awsConfig from '../aws-exports.js';
import { Amplify } from 'aws-amplify'; // Ensure Auth is imported
import { signUp,confirmSignUp } from 'aws-amplify/auth';

Amplify.configure(awsConfig); // Configure Amplify

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState(''); // For confirmation code
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmationStep, setIsConfirmationStep] = useState(false); // Track whether user is at confirmation step
  const navigate = useNavigate();

  const validateForm = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Only allows letters and numbers
    if (!usernameRegex.test(username)) {
      setError('Username should not contain special characters.');
      return false;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return false;
    }

    setError('');
    return true;
  };

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Use AWS Amplify Auth to sign up
      await signUp({
        username,
        password,
        options:{
        userAttributes: { email },
        }
      });

      alert('Sign up successful! Please check your email for the confirmation code.');
      setIsConfirmationStep(true); // Move to the confirmation step
      localStorage.setItem('username', username); // Store the username in local storage
    } catch (error) {
      console.error('Error during sign up:', error);
      setError(error.message || 'An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account confirmation with code
  const handleConfirmSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const storedUsername = localStorage.getItem('username'); // Retrieve the username from local storage

      if (!storedUsername) {
        setError('Username is missing. Please sign up again.');
        return;
      }

      // Correct structure for confirmSignUp
      const { isSignUpComplete, nextStep } = confirmSignUp({
        username: storedUsername, // Pass the stored username
        confirmationCode,         // Pass the confirmation code from state
      });

      if (isSignUpComplete) {
        alert('Account confirmed! Redirecting to login page.');
        navigate('/login');
      } else {
        console.log('Next step:', nextStep);
      }
    } catch (error) {
      console.error('Error during confirmation:', error);
      setError(error.message || 'An error occurred during confirmation.');
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
            {isLoading ? <CircularProgress size={24} /> : isConfirmationStep ? 'Confirm Sign Up' : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
