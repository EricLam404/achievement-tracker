import React from 'react';
import { Link, useLocation } from "react-router-dom";

import Add from './Add';
import Back from '../main/Back';
import Delete from './Delete'
import Archive from './Archive';

function Student() {
    const location = useLocation();
    const student = location.state?.student;
    const classes = student?.classes;
    const time = student?.days;
    const classNames = ['electronics', 'robotics', 'coding'];
    //console.log(classes);
    
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
            <div className='text-2xl font-bold mb-4'>Class List</div>
            <ul>
                {classNames.map((_class, index) => (
                    <Link to={`class/${_class}`} state={classes[_class]} key={index}>
                        <div className='"text-gray-700 no-underline px-10 py-5 m-5 rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white'>{_class[0].toUpperCase() + _class.substring(1)}</div>
                    </Link>
                ))}
            </ul>
            <div className='font-bold text-2xl mt-5 mb-2'>Time List</div>
            <ul className='flex flex-col'>
                {time.map((time, index) => (
                    <li className="bg-white rounded-lg shadow-md p-7 m-4 min-w-min justify-between flex flex-col items-center space-y-5" key={index}>
                        <div className='text-lg font-bold uppercase text-gray-600'>{time.day}</div>
                        <div className='text-base text-gray-400'>{time.time}</div>
                        <Delete _id={time._id} _name="Time"/>
                    </li>
                ))}
                <Add />
            </ul>
            <div className='flex flex-col justify-center items-center m-4 space-y-6'>
                <Delete _name="Student"/>
                <Archive />
            </div>
            <Back/>
        </div>
    );
}

export default Student;
