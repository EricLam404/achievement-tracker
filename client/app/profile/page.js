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
                    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                    <div className="mb-4 text-xl">Parent Name: {profile.parent_name}</div>
                    <div className="mb-4">Parent Birthday: {profile.parent_DOB}</div>
                    <div className="mb-4">Phone Number: {profile.phone}</div>
                    <div className="mb-4">Student ID: {profile.student_id}</div>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block" href="/api/auth/logout">
                        Logout
                    </a>
                    </div>
                </>
            )}
        </>
    );
};

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});