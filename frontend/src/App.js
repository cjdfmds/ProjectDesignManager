import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StartNewProject from './components/StartNewProject'; // Import your components
import ProjectQueue from './components/ProjectQueue'; // Import your ProjectQueue component
import CompletedProjects from './components/CompletedProjects'; // Import your CompletedProjects component

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; // you can generate this file via Amplify CLI if desired

Amplify.configure({
  Auth: {
    region: 'ap-southeast-2',
    userPoolId: 'ap-southeast-2_wpBig9rKB',
    userPoolWebClientId: '117jbifc6grn3ml2j7v0g96u95'
  }
});


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
