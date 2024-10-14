import React, { useState } from 'react';
import './HolyMotherOf.css';
import StartNewProject from './StartNewProject';
import { Button, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material'; // Import Material UI components
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import Back Arrow Icon

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleClick = (label) => {
    if (label === 'Start a New Project') {
      setCurrentView('startNewProject');
    } else {
      alert(`Clicked on ${label}`);
    }
  };

  const handleBack = () => {
    setCurrentView('dashboard'); // Go back to dashboard
  };

  const renderContent = () => {
    switch (currentView) {
      case 'startNewProject':
        return <StartNewProject />;
      case 'dashboard':
      default:
        return (
          <div className="bottom-section">
            <Box display="flex" justifyContent="space-around" width="100%">
              {/* Start a New Project Card */}
              <Card className="project-card-s" onClick={() => handleClick('Start a New Project')}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + "/images/ic1.png"}
                    alt="Start a New Project"
                    className="project-card-media"
                  />
                  <CardContent className="project-card-content">
                    <Typography variant="h7" component="p" align="center" className="project-card-text">
                      START A NEW PROJECT
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              {/* See Project Queue Card */}
              <Card className="project-card-s" onClick={() => handleClick('See Project Queue')}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + "/images/ic2.png"}
                    alt="See Project Queue"
                    className="project-card-media"
                  />
                  <CardContent className="project-card-content">
                    <Typography variant="h7" component="p" align="center" className="project-card-text">
                      SEE PROJECT QUEUE
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              {/* See Completed Projects Card */}
              <Card className="project-card-s" onClick={() => handleClick('See Completed Projects')}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + "/images/ic3.png"}
                    alt="See Completed Projects"
                    className="project-card-media"
                  />
                  <CardContent className="project-card-content">
                    <Typography variant="h7" component="p" align="center" className="project-card-text">
                      SEE COMPLETED PROJECTS
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="left-content">
          <span>Welcome Chris</span>
          {/* Show the Back button only if not on the dashboard */}
          {currentView !== 'dashboard' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              style={{ marginLeft: '10px' }}
            >
              Back
            </Button>
          )}
        </div>
        <div className="right-content">Pascual Creative</div>
      </div>

      {/* Render the main content based on the current view */}
      <div className="background-section">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
