import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function callAPI(){
    const token = await getAccessTokenSilently()
    const url = 'http://localhost:5001/test';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        },
    })
    .then((response) => response.text())
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  return (
    isAuthenticated && (
        <div>
            {user?.picture && <img src={user.picture} alt={user.name} />}   
            <h2>{user?.name}</h2>    
            <ul>
                {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
            </ul>     
            <button className="btn" onClick={callAPI}>CALL API</button>
        </div>
    )
  )
};

export default Profile;