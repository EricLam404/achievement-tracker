import React from 'react';

function Schedule({schedule}) {
    return (
        <div className="student-list">
            <div className='name'>Student List</div>
            {schedule ? (
                <ul>
                    {schedule.map((item, index) => (
                        <li className='time' key={index}>
                        <div className='class-block'>
                            <div className='class-time'>{item.time}</div>
                            <ul>
                                {item.students.map((student, index) => (
                                    <div className='student-name' key={student.name}>
                                        {student.name}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </li>
                    ))}
                </ul>
            ) :
            (
                <div>loading students</div>
            )}
        </div>
    );
}

export default Schedule;
