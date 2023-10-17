'use client'

import React from "react";
import Home from "@/components/main/Home";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

const Page = () => {
    const { user, isLoading } = useUser();
    

    //if(Object.entries(user["kwatt/user_metadata/profile"]).length === 0) redirect('/create-profile')
    console.log(user)
    return (
        <main>
            {user ? (
                <Home />
            ) : (
                <a className="btn" href="/api/auth/login">
                    Login
                </a>
            )}
        </main>
    );
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
    
