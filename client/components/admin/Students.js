import React from 'react'
import CurrentStudents from './CurrentStudents';
import Link from 'next/link';

const Students = () => {
    return(
        <div className='flex flex-col w-full items-center'>
            <Link href='/archieved'>
                <div className='btn mt-5'>Show Archieved Students</div>
            </Link>
            <CurrentStudents />
        </div>
    )
}

export default Students