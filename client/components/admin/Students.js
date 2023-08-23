import React, { useState } from 'react'
import ArchievedStudents from './ArchivedStudents';
import CurrentStudents from './CurrentStudents';

const Students = () => {
    const [displayCurrent, setDisplayCurrent] = useState(true);

    const handleDisplay = () => {
        setDisplayCurrent(() => !displayCurrent);
    }

    return (
        <div className='flex flex-col w-full items-center'>
            <button className='btn w-[30%] mt-5' onClick={handleDisplay}>Show {displayCurrent ? "Archieved" : "Current"} Students</button>
            {displayCurrent ? <CurrentStudents /> : <ArchievedStudents/> }
        </div>
    )
}

export default Students