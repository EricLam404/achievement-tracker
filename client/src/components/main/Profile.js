import React, { useEffect } from "react";
import Back from "./Back";
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const profile = user["http://localhost:3000//user_metadata/profile"];

  useEffect(() => {
    if(Object.entries(user["http://localhost:3000//user_metadata/profile"]).length === 0) navigate('/create/profile');
  }, []);

  return (
    <div>
        <h1>Profile</h1>
        <h2>Email: {user?.email}</h2>
        <div>Parent's Name: {profile?.parent_name}</div>
        <div>Parent's Date of Birth: {profile?.parent_DOB}</div>
        <div>Phone Number: {profile?.phone}</div>
        <div>Child's Name: {profile?.child_name}</div>
        <div>Child's Date of Birth: {profile?.child_DOB}</div>
        <LogoutButton/>
        <Back/>
    </div>
  )
};

export default Profile;