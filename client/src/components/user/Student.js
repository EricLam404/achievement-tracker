import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Student() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [student, setStudent]= useState({});
    const classNames = ['electronics', 'robotics', 'coding'];
    
    const fetchData = async () => {
        try{
            const id = user["http://localhost:3000//app_metadata/profile"]?.student_id;
            const url = `http://localhost:5001/api/student/student/${id}`;
            const token = await getAccessTokenSilently();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                
            })
            const jsonData = await response.json();
            setStudent(jsonData);
        } catch (e){
            console.log(e);
        }
    };
    
    useEffect(() => {
        if(user["http://localhost:3000//app_metadata/profile"]?.student_id !== '') fetchData();
        console.log(student)
    }, []);

    return (
        <div>
           <div>{student.name}</div>
           <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
            <div className='text-2xl font-bold mb-4'>Class List</div>
            <ul>
                {student.classes && classNames.map((_class, index) => (
                    <Link to={`class/${_class}`} state={student.classes[_class]} key={index}>
                        <div className='"text-gray-700 no-underline px-10 py-5 m-5 rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white'>{_class[0].toUpperCase() + _class.substring(1)}</div>
                    </Link>
                ))}
            </ul>
            <div className='font-bold text-2xl mt-5 mb-2'>Time</div>
            <ul className='flex flex-col'>
                {student.days && student.days.map((time, index) => (
                    <li className="bg-white rounded-lg shadow-md p-7 m-4 min-w-min justify-between flex flex-col items-center space-y-5" key={index}>
                        <div className='text-lg font-bold uppercase text-gray-600'>{time.day}</div>
                        <div className='text-base text-gray-400'>{time.time}</div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default Student;
