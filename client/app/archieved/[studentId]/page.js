'use client'

import React from 'react'
import Link from 'next/link';

import Back from '@/components/main/buttons/Back';
import ErrorMessage from '@/components/main/ErrorMessage'
import Loading from '@/components/main/Loading'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const Page = ({ searchParams }) => {
    const classNames = [];
    const student = searchParams.student ? JSON.parse(searchParams.student) : null;
    const classes = student?.classes;
    const time = student?.days;
    const { user, isLoading } = useUser();

    for (const key in classes) {
        if (classes[key].length > 0) {
            classNames.push(key);
        }
    }

    return (
        <>
        {isLoading && <Loading />}
        {user && (
            student ? 
            <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
                <div className='text-2xl font-bold mb-4'>Classes</div>
                <ul>
                    {classNames.map((classType, index) => (
                        <Link 
                        key={index} 
                        href={{
                            pathname: `${student._id}/class/${classType}`,
                            query: {
                                class: JSON.stringify(classes[classType])
                            }
                        }} 
                        >
                            <div className='"text-gray-700 no-underline flex justify-center px-10 py-5 m-5 rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white'>{classType[0].toUpperCase() + classType.substring(1)}</div>
                        </Link>
                    ))}
                </ul>
                <div className='font-bold text-2xl mt-5 mb-2'>Time List</div>
                <ul className='flex flex-col'>
                    {time.map((time, index) => (
                        <li className="bg-white rounded-lg shadow-md p-7 m-4 min-w-min justify-between flex flex-col items-center space-y-5" key={index}>
                            <div className='text-lg font-bold uppercase text-gray-600'>{time.day}</div>
                            <div className='text-base text-gray-400'>{time.time}</div>
                        </li>
                    ))}
                </ul>
                <Back/>
            </div>
            : <div>Student not found</div>
        )}
        </>
    );
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});