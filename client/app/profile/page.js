'use client'

import React from 'react'

import Back from '@/components/main/buttons/Back';
import ErrorMessage from '@/components/main/ErrorMessage'
import Loading from '@/components/main/Loading'

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const Page = () => {
    const { user, isLoading } = useUser();
    return (
        <>
        {isLoading && <Loading />}
        {user && (
            <>
            <a className="btn" href="/api/auth/logout">Logout</a>
            <Back />
            </>
        )}
        </>
    )
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});

/*
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
  */