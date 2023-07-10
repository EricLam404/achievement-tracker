import React from 'react';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';

import Login from './components/main/Login';
import Home from "./components/main/Home";
import Profile from './components/main/Profile';
import CreateProfile from './components/main/CreateProfile';
import Student from "./components/admin/Student";
import AdminClass from "./components/admin/Class";
import StudentClass from './components/user/Class';

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};


function App() {
    return (
        <BrowserRouter>
        <Auth0ProviderWithRedirectCallback
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
              redirect_uri: window.location.origin,
              audience: "http://localhost:5001",
              scope: "openid profile email update:current_user_metadata"
            }}
        >
        <Routes>
            <Route path="/" element={<ProtectedRoute component={Home} />}></Route>
            <Route path="/class/:_class" element={<ProtectedRoute component={StudentClass} />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<ProtectedRoute component={Profile} />}></Route>
            <Route path="/create/profile" element={<ProtectedRoute component={CreateProfile} />}></Route>
            <Route path="/student/:id" element={<ProtectedRoute component={Student} />} />
            <Route path="/student/:id/class/:_class" element={<ProtectedRoute component={AdminClass} />} />
        </Routes>
        </Auth0ProviderWithRedirectCallback>
        </BrowserRouter>
    );
}

export default App;
