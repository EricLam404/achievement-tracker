import React, { useEffect, useState} from 'react';
import "../styles/Schedule.css";

function Schedule({schedule}) {
    return (
        <div className="schedule-list">
            <div className='name'>Student List</div>
            {schedule ? (
                <div className='week-list'>
                    <div className='monday'>
                        <div className='day-of-week'>Monday</div>
                        <ul>
                            {
                                const mondayStudents = schedule.filter()
                            }
                        </ul>
                    </div>
                    <div className='tuesday'>
                        <div className='day-of-week'>Tuesday</div>
                        <ul>

                        </ul>
                    </div>
                    <div className='wednesday'>
                        <div className='day-of-week'>Wednesday</div>
                        <ul>

                        </ul>
                    </div>
                    <div className='thursday'>
                        <div className='day-of-week'>Thursday</div>
                        <ul>

                        </ul>
                    </div>
                    <div className='friday'>
                        <div className='day-of-week'>Friday</div>
                        <ul>

                        </ul>
                    </div>
                    <div className='saturday'>
                        <div className='day-of-week'>Saturday</div>
                        <ul>

                        </ul>
                    </div>
                    <div className='sunday'>
                        <div className='day-of-week'>Sunday</div>
                        <ul>

                        </ul>
                    </div>
                </div>
            ) :
            (
                <div>loading students</div>
            )}
        </div>
    );
}

export default Schedule;

/*
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
                */
