"use client";

import React, { useEffect } from "react";
import Home from "@/components/main/Home";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation'

const Page = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if(Object.entries(user["kwatt/user_metadata/profile"]).length === 0) router.push('create-profile');
    }, []);

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
    
