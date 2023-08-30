'use client'

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation'

//import { useAuth0 } from "@auth0/auth0-react";

const Archive = () => {
    //const { getAccessTokenSilently } = useAuth0();
    const [showArchive, setShowArchive] = useState(false);
    const router = useRouter();
    const { studentId } = useParams();

    async function archiveId(){
        const url = `http://localhost:5001/api/students/archive/${studentId}`;
        //const token = await getAccessTokenSilently();

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.text())
        .then((message) => {
            router.replace('/');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
        <button className="btn bg-gray-300 hover:bg-gray-400" onClick={() => setShowArchive(true)}>Archive Student</button>
        {showArchive && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
            <div className="bg-white p-4 rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                <h2 className='text-xl font-bold m-5'>Are you sure you want to archive student</h2>
                <div className="flex gap-2 justify-center items-center p-5">
                    <button className='btn btn-sm btn-error bg-red-500 border-none hover:text-gray-200' type="submit" onClick={archiveId}>Archive Student</button>
                    <button className='btn btn-sm' type="button" onClick={() => setShowArchive(false)}>
                    Cancel
                    </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default Archive;
