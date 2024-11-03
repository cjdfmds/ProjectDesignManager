import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StartNewProject from './components/StartNewProject'; // Import your components
import ProjectQueue from './components/ProjectQueue'; // Import your ProjectQueue component
import CompletedProjects from './components/CompletedProjects'; // Import your CompletedProjects component
import SignUpPage from './components/SignUpPage';
import { Amplify } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import awsConfig from './aws-exports'; // Adjust the path as needed


const authConfig = {
  Cognito: {
    userPoolId: awsConfig.aws_user_pools_id,  
    userPoolClientId: awsConfig.aws_user_pools_web_client_id,
  }
};

Amplify.configure({
  Auth: authConfig
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

function App() {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ProjectDesignManager" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-new-project" element={<StartNewProject />} />
        <Route path="/project-queue" element={<ProjectQueue />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
        <Route path="/signup" element={<SignUpPage  />} />
        
      </Routes>
    </Router>
  );
}

export default App;
