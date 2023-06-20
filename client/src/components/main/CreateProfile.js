import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

function CreateProfile(){
  const {user, isAuthenticated} = useAuth0();
  const navigate = useNavigate();
  console.log(user.sub);
  return (
    <div>create profile</div>
  )
};

export default CreateProfile;