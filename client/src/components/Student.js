import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Back from './Back';

function Student() {
    const location = useLocation();
    const student = location.state?.student;
    const classes = student?.classes;
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
            <Back/>
        </div>
    );
}

export default Student;
