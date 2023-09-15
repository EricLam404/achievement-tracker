"use client";

import React from "react";
import { useParams } from "next/navigation";
import ErrorMessage from "@/components/main/ErrorMessage";
import Loading from "@/components/main/Loading";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

function Page({ searchParams }) {
    const classes = searchParams.class ? JSON.parse(searchParams.class) : null;
    const { classType } = useParams();
    const { user, isLoading } = useUser();

    return (
        <>
            {isLoading && <Loading />}
            {user &&
                (classes ? (
                    <div className="flex flex-col items-center">
                        <div className='text-4xl font-bold mb-8"'>
                            {"Class: " +
                                classType[0].toUpperCase() +
                                classType.substring(1)}
                        </div>
                        {classes ? (
                            <ul className="list-none flex flex-col mt-8 mx-10 md:mx-20 lg:mx-32 p-0">
                                <li
                                    className="grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center"
                                    key="header"
                                >
                                    <div className="font-bold text-blue-700 text-lg">
                                        Class Number
                                    </div>
                                    <div className="text-lg">Class Date</div>
                                    <div className="font-bold text-lg">
                                        Class Achievement
                                    </div>
                                    <div className="text-lg">Class Lesson</div>
                                </li>
                                {classes.map((classObject, index) => (
                                    <li
                                        className="grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center"
                                        key={index}
                                    >
                                        <div className="font-bold text-blue-700 text-lg">
                                            {classObject.classNumber}
                                        </div>
                                        <div className="text-lg">
                                            {classObject.classDate.substring(
                                                0,
                                                10
                                            )}
                                        </div>
                                        <div className="font-bold text-lg">
                                            {classObject.classAchievement}
                                        </div>
                                        <div className="text-lg">
                                            {classObject.classLesson}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No {classType} achievements</div>
                        )}
                    </div>
                ) : (
                    <div>Error loading classes</div>
                ))}
        </>
    );
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
