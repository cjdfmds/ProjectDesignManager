import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StartNewProject from './components/StartNewProject'; // Import your components
import ProjectQueue from './components/ProjectQueue'; // Import your ProjectQueue component
import CompletedProjects from './components/CompletedProjects'; // Import your CompletedProjects component

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-new-project" element={<StartNewProject />} />
        <Route path="/project-queue" element={<ProjectQueue />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
      </Routes>
    </Router>
  );
}

export default App;
