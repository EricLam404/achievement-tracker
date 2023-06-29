import React, { useEffect } from "react";
import Back from "./Back";
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  
  async function callAPI(){
    try{
        const url = 'http://localhost:5001/test';
        const token = await getAccessTokenSilently();
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        //console.log(user);
        const dataJSON = await data.json();
        console.log("DATA:\n", dataJSON)
        console.log(user)
    } catch (e){
        console.log(e);
    }
  }

  useEffect(() => {
    if(Object.entries(user["http://localhost:3000//user_metadata/profile"]).length === 0) navigate('/create/profile');
  }, []);

  return (
    isAuthenticated ?
        <div>
            {user?.picture && <img src={user.picture} alt={user.name} />}   
            <h2>{user?.name}</h2>        
            <LogoutButton/>
            <Back/>
            <button className="btn" onClick={callAPI}>CALL API</button>
        </div> :
        <div>Please Sign in</div>
  )
};

export default Profile;