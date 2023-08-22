import React from 'react'
import Link from 'next/link';
import Add from '@/components/admin/buttons/Add';
import Archive from '@/components/admin/buttons/Archive';
import Delete from '@/components/admin/buttons/Delete';

import Back from '@/components/main/buttons/Back';

const Page = ({ searchParams }) => {
    const classNames = ['electronics', 'robotics', 'coding'];
    const student = searchParams.student ? JSON.parse(searchParams.student) : null;
    const classes = student?.classes;
    const time = student?.days;
    return (
        student ? 
        <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
            <div className='text-2xl font-bold mb-4'>Class List</div>
            <ul>
                {classNames.map((classType, index) => (
                    <Link 
                    key={index} 
                    href={{
                        pathname: `${student._id}/class/${classType}`,
                        query: {
                            class: JSON.stringify(classes[classType])
                        }
                    }} 
                    >
                        <div className='"text-gray-700 no-underline flex justify-center px-10 py-5 m-5 rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white'>{classType[0].toUpperCase() + classType.substring(1)}</div>
                    </Link>
                ))}
            </ul>
            <div className='font-bold text-2xl mt-5 mb-2'>Time List</div>
            <ul className='flex flex-col'>
                {time.map((time, index) => (
                    <li className="bg-white rounded-lg shadow-md p-7 m-4 min-w-min justify-between flex flex-col items-center space-y-5" key={index}>
                        <div className='text-lg font-bold uppercase text-gray-600'>{time.day}</div>
                        <div className='text-base text-gray-400'>{time.time}</div>
                        <Delete id={time._id} name="Time"/>
                    </li>
                ))}
                <Add addType="Time"/>
            </ul>
            <div className='flex flex-col justify-center items-center m-4 space-y-6'>
                <Delete id={student._id} name="Student"/>
                <Archive />
            </div>
            <Back/>
        </div>
        : <div>Student not found</div>
    );
}

export default Page;