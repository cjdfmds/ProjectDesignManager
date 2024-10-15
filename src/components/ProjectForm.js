import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ProjectForm = ({ projectName }) => {
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., validation or API call)
    console.log({ name, brief, dateNeeded, uploadedFile });
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
