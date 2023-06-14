import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const { isloading, error } = useAuth0();
    return (
        <div>
            <h1>Login</h1>
            {error && <p>Authentication Error</p>}
            {!error && isloading && <p>Loading..</p>}
            {!error && !isloading && (
            <>
            <LoginButton/>
            <LogoutButton/>
            <Profile/>
            </>
            )}
        </div>
    );
}

export default Login;
