import React from 'react';
import "../styles/Class.css";
import { useLocation } from "react-router-dom";
import PopupForm from './PopupForm';
import Delete from './Delete';
import Back from './Back';

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
                        <div className='class-date'>{item.classDate.substring(0, 10)}</div>
                        <div className='class-achievement'>{item.classAchievement}</div>
                        <div className='class-lesson'>{item.classLesson}</div>
                        <Delete _id={item._id} _name={name}/>
                    </li>
                ))}
            </ul>
            ) :
            (
                <div>No class achievements</div>
            )}
            <PopupForm _class={name} classNumber={classes?.length}/>
            <Back/>
        </div>
    );
}

export default Class;
