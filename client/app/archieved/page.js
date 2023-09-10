"use client";

import React from "react";
import Back from "@/components/main/buttons/Back";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ArchievedStudents from "@/components/admin/ArchivedStudents";

function Page() {
    const { user, isLoading } = useUser();

    return (
        <>
            {isLoading && <Loading />}
            {user && (
                <div className="flex flex-col items-center">
                    <ArchievedStudents />
                    <Back />
                </div>
            )}
        </>
    );
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
