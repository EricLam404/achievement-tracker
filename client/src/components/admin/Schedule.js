import React from 'react';
import { Link } from 'react-router-dom';
import Add from './Add';

function Schedule({schedule, setUpdate}) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //console.log(schedule ? schedule : "loading");
    return (
        <>
        <div className='flex justify-center items-center h-20 text-2xl font-bold text-white bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-shadow-sm shadow-sm'>Achievement Tracker</div>
        <div className="font-sans m-8 mx-auto max-w-80 flex flex-col justify-center items-center px-5">
            <div className='text-2xl font-bold mb-6'>Student List</div>
            <div className='grid grid-auto-fit-[200px] gap-4 w-full'>
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
                        <div className='flex flex-col items-center border border-gray-300 p-4 bg-gray-100' key={index}>
                            <div className='text-lg font-bold mb-4' key={index}>{day}</div>
                            <ul>
                                {
                                    times.map((time, index) => {
                                        let students = daySchedule.filter(student => {
                                            return student.days.some(days => days.day === day && days.time === time)
                                        });
                                        return (
                                            <div className='flex justify-between items-center flex-col w-full mt-4' key={index}>
                                                <div className='text-lg font-bold text-center'>{time}</div>
                                                <div className='flex flex-wrap justify-center items-center'>
                                                    {students.map((student, index) => {
                                                        return (
                                                            <Link key={index} to={`/student/${student._id}`} state={{ student: student }}>
                                                                <div className='text-sm m-2 p-2 rounded-sm bg-gray-200 hover:bg-gray-300'>{student.name}</div>
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
            <Add addStudent={true} setUpdate={setUpdate}/>
        </div>
    </>
    );
}

export default Schedule;
