import React, { useState } from 'react'
import ArchievedStudents from './ArchivedStudents';
import CurrentStudents from './CurrentStudents';

const Students = () => {
    const [displayCurrent, setDisplayCurrent] = useState(true);

    const handleDisplay = () => {
        setDisplayCurrent(() => !displayCurrent);
    }

    return (
        <>
            <button className='btn' onClick={handleDisplay}>Show {displayCurrent ? "Archieved" : "Current"} Students</button>
            {displayCurrent ? <CurrentStudents /> : <ArchievedStudents/> }
        </>
    )
}

export default Students