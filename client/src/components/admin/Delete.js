import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Delete({_id, _name}) {
    const { getAccessTokenSilently } = useAuth0();
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const classes = ['robotics', 'electronics', 'coding'];
    const _type = classes.includes(_name) ? "Class" : _name;

    async function deleteId(){
        let url = "http://localhost:5001/api/student/delete/", body = "";
        if(_type === "Class"){
            url += `class/${_name}`;
            body = { studentId: id, classId: _id, classType: _name};
        }
        else if(_type === "Time"){
            url += "time";
            body = { studentId: id, timeId: _id  };
        }
        else if(_type === "Student"){
            url += "student";
            body = { studentId: id};
        }
        const token = await getAccessTokenSilently();

        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.text())
        .then((message) => {
            navigate('/');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
        <button className='btn bg-red-500 border-none p-3 m3 hover:text-red-500' onClick={() => setShowDelete(true)}>Delete {_type}</button>
        {showDelete && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
            <div className="bg-white p-4 rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                <h2 className='text-xl font-bold m-5'>Are you sure you want to delete {_type}</h2>
                <div className="flex gap-2 justify-center items-center p-5">
                    <button className='btn btn-sm btn-error bg-red-500 border-none hover:text-gray-200' type="submit" onClick={deleteId}>Delete {_type}</button>
                    <button className='btn btn-sm' type="button" onClick={() => setShowDelete(false)}>
                    Cancel
                    </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default Delete;
