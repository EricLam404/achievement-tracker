import React from 'react';
import { useParams, useLocation } from "react-router-dom";
import Add from './Add';
import Delete from './Delete';
import Back from './Back';

function Class() {
    const location = useLocation();
    const classes = location.state;
    const {_class} = useParams();

    return (
        <div className="class">
            <div className='text-4xl font-bold mb-8"'>{"Class: " + _class[0].toUpperCase() + _class.substring(1)}</div>
            {classes ? (
                <ul className='list-none flex flex-col mt-8 mx-10 md:mx-20 lg:mx-32 p-0'>
                <li className='grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center' key="header">
                        <div className='font-bold text-blue-700 text-lg'>Class Number</div>
                        <div className='text-lg'>Class Date</div>
                        <div className='font-bold text-lg'>Class Achievement</div>
                        <div className='text-lg'>Class Lesson</div>
                 </li>
                {classes.map((item, index) => (
                    <li className='grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center' key={index}>
                        <div className='font-bold text-blue-700 text-lg'>{item.classNumber}</div>
                        <div className='text-lg'>{item.classDate.substring(0, 10)}</div>
                        <div className='font-bold text-lg'>{item.classAchievement}</div>
                        <div className='text-lg'>{item.classLesson}</div>
                        <Delete _id={item._id} _name={_class}/>
                    </li>
                ))}
            </ul>
            ) :
            (
                <div>No class achievements</div>
            )}
            <Add classNumber={classes?.length}/>
            <Back/>
        </div>
    );
}

export default Class;
