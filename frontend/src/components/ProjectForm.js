import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { get } from 'aws-amplify/api';

import awsConfig from '../aws-exports'; // Adjust the path as needed
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';

const configureAmplify = async (setToken) => {
  try {
    const authSession = await fetchAuthSession();
    console.log('Auth session:', authSession);    
    const authToken = authSession.tokens?.idToken?.toString();
    console.log('Auth token:', authToken);    
    console.log('Token stored in localStorage:', localStorage.getItem('authToken'));

    const user = await getCurrentUser();
    console.log('User:', user);

    // Store the token in local storage
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      setToken(authToken);
    } else {
      console.error('Auth token is undefined');
    }
    Amplify.configure({
      ...awsConfig,
      Auth: {
        identityPoolId: awsConfig.aws_cognito_identity_pool_id,
        region: awsConfig.aws_project_region,
        userPoolId: awsConfig.aws_user_pools_id,
        userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,  
      },
      API: {
        endpoints: [
          {
            name: 'PDMapiCLI',
            endpoint: 'https://ht9dq1j921.execute-api.ap-southeast-2.amazonaws.com/devv', // Replace with your API endpoint
            custom_header: async () => ({
              Authorization: authToken ? `Bearer ${authToken}` : '' 
            }),
          },
        ],
      },
    });
  } catch (error) {
    console.error('Failed to configure Amplify:', error);
  }
};



const ProjectForm = ({ projectType }) => {
  const [projectName, setProjectName] = useState('');
  const [brief, setBrief] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  //const [uploadedFile, setUploadedFile] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [token, setToken] = useState('');
  const [projectData, setProjectData] = useState(null); // New state for storing fetched project data -testing
  const [projectId, setProjectId] = useState(''); // New state for projectId input -testing

  useEffect(() => {
    const configure = async () => {
      await configureAmplify(setToken);
      setIsConfigured(true);
    };

    configure();
  }, []);

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('authToken');  
    if (storedToken) {
      setToken(storedToken);    
    }
  }, []);

  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setUploadedFile(file);
  //     try {
  //       const uploadResult = await Storage.put(file.name, file, {
  //         contentType: file.type,
  //       });
  //       console.log('File uploaded successfully:', uploadResult.key);
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      projectId: '1', // Replace with actual project ID
      userId: '1', // Replace with actual user ID
      projectType,
      projectName,
      brief,
      dateNeeded,
      //fileKey: uploadedFile ? uploadedFile.name : 'placeholder-file-key', // Use placeholder if no file is uploaded
      status: 'in-progress',
    };

        try {
      if (!token) {
        throw new Error('User not authenticated or missing token');
      }

      const response = await fetch('https://ht9dq1j921.execute-api.ap-southeast-2.amazonaws.com/devv/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      console.log('API response:', data);
      alert('Project submitted successfully!');
    } catch (error) {
      console.error('POST call failed:', error);
      alert('Failed to submit project.');
    }
  };




  const handleGetRequest = async () => {
    try {
      // Ensure Amplify is configured
      if (!isConfigured) {
        throw new Error('Amplify is not configured yet. Please try again later.');
      }

      // Ensure the user is authenticated
      if (!token) {
        throw new Error('User not authenticated or missing token');
      }

      // Log the token for debugging
      console.log('Auth tokenn:', token);

      // Make the API request
      const response = await get({
        apiName: 'PDMapiCLI',
        path: `/items/${projectId}`, // Adjust this path if necessary
        options: {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Ensure the token is included
          },
        },
      });

      // Log the response for debugging
      console.log('token response:', token);
      console.log('API response:', response);
      setProjectData(response); // Store the fetched project data

      console.log('GET call succeeded');
    } catch (error) {
      console.error('GET request failed:', error);
      alert('Failed to fetch project.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        padding: 3,
        backgroundColor: '#f4f4f4',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {projectType || 'Project Form'}
      </Typography>

      <TextField
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        inputProps={{ maxLength: 50 }}
        required
      />

      <TextField
        label="Project Brief"
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        inputProps={{ maxLength: 1000 }}
        multiline
        rows={4}
        required
      />

      <TextField
        label="Date Needed"
        type="date"
        value={dateNeeded}
        onChange={(e) => setDateNeeded(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        inputProps={{ maxLength: 50 }}
        required
      />

      <Button variant="contained" component="label">
        Upload Files
        <input type="file" hidden onChange={console.log(null)} />
      </Button>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>

      <Button variant="contained" color="secondary" onClick={handleGetRequest}>
        Get Project
      </Button>

      {projectData && (
        <Box>
          <Typography variant="body1">Fetched Project Data:</Typography>
          <pre>{JSON.stringify(projectData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default ProjectForm;