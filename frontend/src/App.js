import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from './components/Dashboard';
import StartNewProject from './components/StartNewProject';
import ProjectQueue from './components/ProjectQueue';
import CompletedProjects from './components/CompletedProjects';
import awsConfig from './aws-exports';

Amplify.configure({
  ...awsConfig,
  Auth: {
    userPoolId: awsConfig.aws_user_pools_id,
    userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
    identityPoolId: awsConfig.aws_cognito_identity_pool_id,
    region: awsConfig.aws_project_region, // Add the region if it's missing
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Authenticator>
        {({ signOut, user }) => (
          <AuthenticatedApp signOut={signOut} user={user} />
        )}
      </Authenticator>
    </Router>
  );
}

function AuthenticatedApp({ signOut, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-new-project" element={<StartNewProject />} />
        <Route path="/project-queue" element={<ProjectQueue />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
      </Routes>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default App;