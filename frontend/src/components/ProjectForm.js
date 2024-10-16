import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import AWS from 'aws-sdk';

const ProjectForm = ({ projectName }) => {
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

    // AWS S3 Configuration
    AWS.config.update({
      region: 'ap-southeast-2', // e.g., 'us-east-1'
     
    });
  
    const s3 = new AWS.S3();
  
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      if (file) {
        const params = {
          Bucket: 'creationhub-erps', // Replace with your bucket name
          Key: file.name,
          Body: file,
          //ACL: 'public-read', // Adjust according to your use case
        };
  
        s3.upload(params, (err, data) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully', data.Location);
          }
        });
      }
    }; 

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Assuming you have the uploaded file in state
      const formData = new FormData();
      formData.append('file', uploadedFile);
  
      const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
      });
  
      if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data.url);
      } else {
          console.error('File upload failed');
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
        {projectName || 'Project Form'}
      </Typography>

      {/* Project Name */}
      <TextField
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
