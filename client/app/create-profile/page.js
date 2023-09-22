"use client";

import React, { useState } from "react";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Page = () => {
    const [parentName, setParentName] = useState("test");
    const [parentDOB, setParentDOB] = useState("2000-06-24");
    const [phone, setPhone] = useState("111-111-1111");
    const [studentId, setStudentId] = useState("64408fb9d9715b43089a71a1");

    const { user, isLoading } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profile = {
            parent_name: parentName,
            parent_DOB: parentDOB,
            phone: phone,
            student_id: studentId
        };

        fetch("http://localhost:5001/api/user/metadata", {
            method: "POST",
            body: JSON.stringify({
                profile: profile,
                user: user,
            }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.text())
            .then((message) => {
                let messageJSON = JSON.parse(message);
                user["kwatt/user_metadata/profile"] =
                    messageJSON.user_metadata.profile;
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            {isLoading && <Loading />}
            {user && (
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-4">Create Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="parentName"
                                className="block font-medium mb-1"
                            >
                                Parent's Name
                            </label>
                            <input
                                type="text"
                                id="parentName"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="parentDOB"
                                className="block font-medium mb-1"
                            >
                                Parent's Date of Birth
                            </label>
                            <input
                                type="date"
                                id="parentDOB"
                                value={parentDOB}
                                onChange={(e) => setParentDOB(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block font-medium mb-1"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="childName"
                                className="block font-medium mb-1"
                            >
                                Student Id
                            </label>
                            <input
                                type="text"
                                id="childName"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Create
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
