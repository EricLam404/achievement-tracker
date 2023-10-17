"use client";

import React from "react";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";

import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Page = () => {
    const { user, isLoading } = useUser();
    const profile = user["kwatt/user_metadata/profile"];
    console.log(profile)
    
    return (
        <>
            {isLoading && <Loading />}
            {user && (
                <>
                    <div className="">Parent Name: {profile.parent_name}</div>
                    <div className="">
                        Parent birthday: {profile.parent_DOB}
                    </div>
                    <div className="">Phone Number: {profile.phone}</div>
                    <div className="">Student ID: {profile.student_id}</div>
                    <a className="btn" href="/api/auth/logout">
                        Logout
                    </a>
                </>
            )}
        </>
    );
};

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});