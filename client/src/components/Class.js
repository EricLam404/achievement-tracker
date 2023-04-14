import React from 'react';
import "../styles/Class.css";

function Class({student_class}) {
    return (
        <div className="class">
            <div className='name'>{student_class ? student_class.name : 'loading name'}</div>
            <div className='class-type'>{"Class: Robotics" }</div>
            {student_class ? (
                <ul className='class-list'>
                    <li className='class' key="header">
                            <div className='class-number'>Class Number</div>
                            <div className='class-date'>Class Date</div>
                            <div className='class-achievement'>Class Achievement</div>
                            <div className='class-lesson'>Class Lesson</div>
                     </li>
                    {student_class.robotics.classes.map((item, index) => (
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
                <div>loading class achievements</div>
            )}
        </div>
    );
}

export default Class;
