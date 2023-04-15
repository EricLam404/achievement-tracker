import React from 'react';
import "../styles/Class.css";
import { useLocation } from "react-router-dom";
import PopupForm from './PopupForm';

function Class() {
    const location = useLocation();
    const name = location.state?.class;
    const classes = location.state?.classes;

    return (
        <div className="class">
            <div className='class-type'>{"Class: " + name}</div>
            {classes ? (
                <ul className='class-list'>
                <li className='class' key="header">
                        <div className='class-number'>Class Number</div>
                        <div className='class-date'>Class Date</div>
                        <div className='class-achievement'>Class Achievement</div>
                        <div className='class-lesson'>Class Lesson</div>
                 </li>
                {classes.map((item, index) => (
                    <li className='class' key={index}>
                        <div className='class-number'>{item.classNumber}</div>
                        <div className='class-date'>{item.classDate}</div>
                        <div className='class-achievement'>{item.classAchievement}</div>
                        <div className='class-lesson'>{item.classLesson}</div>
                    </li>
                ))}
            </ul>
            ) :
            (
                <div>No class achievements</div>
            )}
            <PopupForm _class={name} classNumber={classes?.length} handleClasses={handleClasses}/>
        </div>
    );
}

export default Class;
