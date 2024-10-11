import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const handleClick = (label) => {
    alert(`Clicked on ${label}`);
  };

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="left-content">Welcome Chris</div>
        <div className="right-content">Pascual Creative</div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="project-card" onClick={() => handleClick('Start a New Project')}>
          <img src="images\ic1.png" alt="Start a New Project" />
          <p>START A NEW PROJECT</p>
        </div>
        <div className="project-card" onClick={() => handleClick('See Project Queue')}>
          <img src="images\ic2.png" alt="See Project Queue" />
          <p>SEE PROJECT QUEUE</p>
        </div>
        <div className="project-card" onClick={() => handleClick('See Completed Projects')}>
          <img src="images\ic3.png" alt="See Completed Projects" />
          <p>SEE COMPLETED PROJECTS</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
