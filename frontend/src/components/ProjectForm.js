import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';


const ProjectForm = ({ projectType }) => {
  const [projectName, setProjectName] = useState('');
  const [brief, setBrief] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

// API Client
const apiClient = generateClient(); 
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedFile(file);
        try {
          const uploadResult = await uploadData(file.name, file, {
            contentType: file.type,
          });
          console.log('File uploaded successfully:', uploadResult.key);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const projectData = {
        projectType,
        projectName,
        brief,
        dateNeeded,
        fileKey: uploadedFile?.name,
        status: 'in-progress',
      };
  
      try {
        await apiClient.post('frontend', '/projects', { body: projectData });
        alert('Project submitted successfully!');
      } catch (error) {
        console.error('Failed to submit project:', error);
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

      {/* Project Name */}
      <TextField
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        inputProps={{ maxLength: 50 }}
        required
      />

      {/* Project Brief */}
      <TextField
        label="Project Brief"
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        inputProps={{ maxLength: 1000 }}
        multiline
        rows={4}
        required
      />

      {/* Date Needed */}
      <TextField
        label="Date Needed"
        type="date"
        value={dateNeeded}
        onChange={(e) => setDateNeeded(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      {/* Upload Files */}
      <Button variant="contained" component="label">
        Upload Files
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default ProjectForm;
