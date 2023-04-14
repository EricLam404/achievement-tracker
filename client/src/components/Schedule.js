import React from 'react';
import "../styles/Schedule.css";

function Schedule({schedule}) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //console.log(schedule ? schedule : "loading");
    return (
        <div className="schedule-list">
            <div className='name'>Student List</div>
            <div className='week-list'>
                {schedule ? (
                    days.map((day, index) => {
                        const filteredData = schedule.filter(student => {
                            return student.days.some(days => days.day === day);
                        });
                        return (
                        <div className='week' key={index}>
                            <div className='day-of-week' key={index}>{day}</div>
                            <ul>
                                {
                                    filteredData.map((student, index) => {
                                        return (
                                            <div className='name' key={index}>{student.name}</div>
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