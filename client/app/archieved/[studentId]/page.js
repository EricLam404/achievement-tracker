import React from 'react'
import Link from 'next/link';
import Back from '@/components/main/buttons/Back';

const Page = ({ searchParams }) => {
    const classNames = ['electronics', 'robotics', 'coding'];
    const student = searchParams.student ? JSON.parse(searchParams.student) : null;
    const classes = student?.classes;
    const time = student?.days;
    for(let i = 0; i < classNames.length; i++){
        if(student.classes[classNames[i]].length === 0){
            classNames.splice(i, 1);
        }
    }

    return (
        student ? 
        <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
            <div className='text-2xl font-bold mb-4'>Classes</div>
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
                    </li>
                ))}
            </ul>
            <Back/>
        </div>
        : <div>Student not found</div>
    );
}

export default Page;