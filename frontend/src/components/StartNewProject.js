import React, { useState } from 'react';
import { Typography, Box, Card, CardActionArea, CardMedia, CardContent, Grid } from '@mui/material'; // Import Material UI components
import './HolyMotherOf.css'; // Import your CSS for additional styling
import ProjectForm from './ProjectForm'; // Import the reusable ProjectForm component

const items = [
  'BUSINESS CARD',
  'BROCHURE/FLYER/POSTER',
  'LOGO',
  'MOTION GRAPHIC',
  'BOOKLET MAGAZINE',
  'EMAIL/TEMPLATE',
  'BANNER/SIGNAGE',
  'ILLUSTRATION'
];

const StartNewProject = () => {
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project

  // Handle project selection
  const handleProjectSelect = (item) => {
    setSelectedProject(item); // Set the selected project item
  };

  // If a project is selected, show the ProjectForm and replace the project selection screen
  if (selectedProject) {
    return (
      <Box className="project-form-container">
        {/* Pass the selected project name to the ProjectForm component */}
        <ProjectForm projectName={selectedProject} />
      </Box>
    );
  }

  // Otherwise, show the project selection items
  return (
    <Box className="start-new-project" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Select a Project Type
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className='project-card'
              sx={{ width:200, cursor: 'pointer' }}
              onClick={() => handleProjectSelect(item)}
            >
              <CardActionArea>
                <CardMedia className='project-card-media'
                  component="img"
                  
                  image={`${process.env.PUBLIC_URL}/imageprojects/icprojects${index + 1}.png`}
                  alt={item}
                />
                <CardContent className='project-card-content'>
                  <Typography className='project-card-text' variant="h7" align="center">
                    {item}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StartNewProject;
