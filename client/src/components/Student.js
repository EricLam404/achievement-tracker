import React from 'react';
import { Link, useLocation } from "react-router-dom";

import Add from './Add';
import Back from './Back';
import Delete from './Delete'
import Archive from './Archive';

//import "../styles/Student.css"

function Student() {
    const location = useLocation();
    const student = location.state?.student;
    const classes = student?.classes;
    const time = student?.days;
    const classNames = ['electronics', 'robotics', 'coding'];
    //console.log(classes);
    
    return (
        <div className="student-list">
            <div className='class-list'>Class List</div>
            <ul>
                {classNames.map((_class, index) => (
                    <Link className='class-link' to={`class/${_class}`} state={classes[_class]} key={index}>
                        <div>{_class[0].toUpperCase() + _class.substring(1)}</div>
                    </Link>
                ))}
            </ul>
            <div className='time-list'>Time List</div>
            <ul className='times'>
                {time.map((time, index) => (
                    <li className="timeslot" key={index}>
                        <div className='day'>{time.day}</div>
                        <div className='time'>{time.time}</div>
                        <Delete _id={time._id} _name="Time"/>
                    </li>
                ))}
                <Add />
            </ul>
            <div className='buttons'>
                <Delete _name="Student"/>
                <Archive />
            </div>
            <Back/>
        </div>
    );
}

export default Student;
