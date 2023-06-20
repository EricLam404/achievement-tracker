import React from "react";
import Back from "./Back";
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    isAuthenticated ?
        <div>
            {user?.picture && <img src={user.picture} alt={user.name} />}   
            <h2>{user?.name}</h2>    
            <ul>
                {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
            </ul>     
            <LogoutButton/>
            <Back/>
        </div> :
        <div>Please Sign in</div>
  )
};

export default Profile;