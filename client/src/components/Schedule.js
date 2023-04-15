import React from 'react';
import "../styles/Schedule.css";
import { Link } from 'react-router-dom';

function Schedule({schedule}) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //console.log(schedule ? schedule : "loading");
    return (
        <div className="schedule-list">
            <div className='name'>Student List</div>
            <div className='week-list'>
                {schedule ? (
                    days.map((day, index) => {
                        const daySchedule = schedule.filter(student => {
                            return student.days.some(days => days.day === day);
                        });
                        let times = daySchedule.map(obj => {
                            return obj.days.filter(times => times.day === day)
                        });
                        times = times.map(arr => arr.map(day => day.time)).flat();
                        times = [...new Set(times.sort())];
                        //console.log(day);
                        //console.log(times.length > 0 ? times : "Nothing");
                        return (
                        <div className='week' key={index}>
                            <div className='day-of-week' key={index}>{day}</div>
                            <ul>
                                {
                                    times.map((time, index) => {
                                        let students = daySchedule.filter(student => {
                                            return student.days.some(days => days.day === day && days.time === time)
                                        });
                                        return (
                                            <div className='time-box' key={index}>
                                                <div className='time'>{time}</div>
                                                <div className='students'>
                                                    {students.map((student, index) => {
                                                        return (
                                                            <Link key={index} to={`/student/${student._id}`} state={{ student: student }}>
                                                                <div className='student-name'>{student.name}</div>
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )})
                ) :
                (
                    <div>loading students</div>
                )}
            </div>
        </div>
    );
}

export default Schedule;
