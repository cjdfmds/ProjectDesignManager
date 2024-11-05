import React, { useState,useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { post, get } from 'aws-amplify/api';
// import awsConfig from '../aws-exports'; // Adjust the path as needed
// import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
// import { Amplify } from 'aws-amplify';

const ProjectForm = ({ projectType }) => {
  const [projectName, setProjectName] = useState('');
  const [brief, setBrief] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  //const [uploadedFile, setUploadedFile] = useState(null);
  // const [isConfigured, setIsConfigured] = useState(false);
  const [projectData, setProjectData] = useState(null); // New state for storing fetched project data -testing
  const [projectId, setProjectId] = useState(''); // New state for projectId input -testing
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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

      const response = await post({
        apiName: 'PDMapiCLI',
        path: '/items',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: projectData,
      });
      const data = await response.response; // Await the resolution of the Promise
      // console.log('token from storage response:', localStorage.getItem('authToken'));
      // console.log('token response:', token);
      console.log('API response:', data);
      alert('Project submitted successfully!');
    } catch (error) {
      console.error('POST call failed:', error);
      alert('Failed to submit project.');
    }
  };

  const handleGetRequest = async () => {
    try {

      // Make the API request
      const response = await get({
        apiName: 'PDMapiCLI',
        path: `/items/${projectId}`, // Adjust this path if necessary
        options: {
          headers: {
            'Content-Type': 'application/json',
           
          },
        },
      });

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