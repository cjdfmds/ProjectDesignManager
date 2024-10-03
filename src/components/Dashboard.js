import React from 'react';
import './Dashboard.css';  // Optional: if using an external CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <h1>Top Section</h1>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <h1>Bottom Section</h1>
      </div>
    </div>
  );
};

export default Dashboard;
