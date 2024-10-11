import React, { useState } from 'react'; // Import React and useState
import './Dashboard.css'; // Import your CSS styles
import StartNewProject from './StartNewProject'; // Ensure this path is correct
import ProjectQueue from './ProjectQueue'; // Import other components if you have them
import CompletedProjects from './CompletedProjects';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // State to manage the current view

  const handleClick = (label) => {
    if (label === 'Start a New Project') {
      setCurrentView('startNewProject'); // Set view to StartNewProject
    } else if (label === 'See Project Queue') {
      setCurrentView('projectQueue'); // Set view to ProjectQueue
    } else if (label === 'See Completed Projects') {
      setCurrentView('completedProjects'); // Set view to CompletedProjects
    } else {
      alert(`Clicked on ${label}`);
    }
  };

    // Function to go back to the dashboard
    const handleBack = () => {
      setCurrentView('dashboard'); // Set view to dashboard
    };

  // Render different components based on currentView state
  const renderContent = () => {
    switch (currentView) {
      case 'startNewProject':
        return <StartNewProject />;
      case 'projectQueue':
        return <ProjectQueue />;
      case 'completedProjects':
        return <CompletedProjects />;
      case 'dashboard':
      default:
        return (
          <div className="bottom-section">
            <div className="project-card" onClick={() => handleClick('Start a New Project')}>
              <img src={process.env.PUBLIC_URL + "/images/ic1.png"} alt="Start a New Project" />
              <p>START A NEW PROJECT</p>
            </div>
            <div className="project-card" onClick={() => handleClick('See Project Queue')}>
              <img src={process.env.PUBLIC_URL + "/images/ic2.png"} alt="See Project Queue" />
              <p>SEE PROJECT QUEUE</p>
            </div>
            <div className="project-card" onClick={() => handleClick('See Completed Projects')}>
              <img src={process.env.PUBLIC_URL + "/images/ic3.png"} alt="See Completed Projects" />
              <p>SEE COMPLETED PROJECTS</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="left-content">
        <button onClick={handleBack} className="back-button">Back</button> {/* Back button beside welcome message */}
          Welcome Chris
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
