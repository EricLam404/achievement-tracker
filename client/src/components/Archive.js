import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//import "../styles/Archive.css"

function Archive() {
    const [showArchive, setShowArchive] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    function archiveId(){
        const url = "http://localhost:5001/api/student/archive/student";
        const body = { studentId: id };

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.text())
        .then((message) => {
            console.log(message);
            navigate('/');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
        <button className="btn" onClick={() => setShowArchive(true)}>Archive Student</button>
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
