import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Back from './Back';
import Delete from './Delete'

function Student() {
    const location = useLocation();
    const student = location.state?.student;
    const classes = student?.classes;
    const time = student?.days;
    //console.log(classes);
    
    return (
        <div className="student-list">
            <div className='class-list'>Class List</div>
            <ul>
                <Link to="class/electronics" state={{ class: "electronics", classes: classes.electronics }}>
                    <div>Electronics</div>
                </Link>
                <Link to="class/robotics" state={{ class: "robotics", classes: classes.robotics }}>
                    <div>Robotics</div>
                </Link>
                <Link to="class/coding" state={{ class: "coding", classes: classes.coding }}>
                    <div>Coding</div>
                </Link>
            </ul>
            <div className='time-list'>Time List</div>
            <ul>
                {time.map((time, index) => (
                    <li key={index}>
                        <div className='day'>{time.day}</div>
                        <div className='time'>{time.time}</div>
                        <Delete />
                    </li>
                ))}
            </ul>
            <Back/>
        </div>
    );
}

export default Student;
