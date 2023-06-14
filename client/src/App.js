import React from 'react';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';

import Login from './components/Login/Login';
import Home from "./components/admin/Home";
import Student from "./components/admin/Student";
import Class from "./components/admin/Class";

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
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
              redirect_uri: window.location.origin
            }}
        >
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/student/:id" element={<Student />} />
            <Route path="/student/:id/class/:_class" element={<Class />} />
        </Routes>
        </Auth0Provider>
        </BrowserRouter>
    );
}

export default App;
