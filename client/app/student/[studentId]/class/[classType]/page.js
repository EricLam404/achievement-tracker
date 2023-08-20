'use client'

import React from 'react';
import { useParams } from 'next/navigation'

import Add from '@/components/admin/buttons/Add';
import Delete from '@/components/admin/buttons/Delete';
import Back from '@/components/main/buttons/Back';

function Class({ searchParams }) {
    const classes = JSON.parse(searchParams.class);
    const { classType } = useParams();

    return (
        <div className="flex flex-col items-center">
            <div className='text-4xl font-bold mb-8"'>{"Class: " + classType[0].toUpperCase() + classType.substring(1)}</div>
            {classes ? (
                <ul className='list-none flex flex-col mt-8 mx-10 md:mx-20 lg:mx-32 p-0'>
                <li className='grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center' key="header">
                        <div className='font-bold text-blue-700 text-lg'>Class Number</div>
                        <div className='text-lg'>Class Date</div>
                        <div className='font-bold text-lg'>Class Achievement</div>
                        <div className='text-lg'>Class Lesson</div>
                 </li>
                {classes.map((classObject, index) => (
                    <li className='grid grid-cols-[1fr,2fr,5fr,2fr,minmax(calc(8vw+60px),1fr)] bg-gray-100 rounded-lg shadow-md mb-4 p-8 items-center' key={index}>
                        <div className='font-bold text-blue-700 text-lg'>{classObject.classNumber}</div>
                        <div className='text-lg'>{classObject.classDate.substring(0, 10)}</div>
                        <div className='font-bold text-lg'>{classObject.classAchievement}</div>
                        <div className='text-lg'>{classObject.classLesson}</div>
                        <Delete name={classType} id={classObject._id} />
                    </li>
                ))}
            </ul>
            ) :
            (
                <div>No {classType} achievements</div>
            )}
            <Add classNumber={classes?.length}/>
            <Back/>
        </div>
    );
}

export default Class;
