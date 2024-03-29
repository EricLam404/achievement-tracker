import React, { useEffect, useState } from "react";
import Link from "next/link";
import Add from "./buttons/Add";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function CurrentStudents() {
    const [updated, setUpdated] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [changed, setChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchData = async () => {
        try {
            const url = "api/students";
            const response = await fetch(`/api/proxy/?route=${url}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            setSchedule(jsonData);
        } catch (e) {
            setErrorMessage(e);
            console.log(e);
        }
    };

    useEffect(() => {
        if (!updated) fetchData();
        setUpdated(true);
    }, []);

    useEffect(() => {
        if (changed) {
            fetchData();
            setChanged(false);
        }
    }, [changed]);

    const handleChanged = () => {
        setChanged(true);
    };

    const getTimes = (day, daySchedule) => {
        const times = daySchedule
            .filter((student) => student.days.some((days) => days.day === day))
            .map((obj) => obj.days.filter((times) => times.day === day))
            .flat()
            .map((day) => day.time);

        return [...new Set(times)].sort();
    };

    const getStudents = (day, time, daySchedule) => {
        return daySchedule.filter((student) => {
            return student.days.some(
                (days) => days.day === day && days.time === time
            );
        });
    };

    const getDaySchedule = (day) => {
        return schedule.filter((student) =>
            student.days.some((days) => days.day === day)
        );
    };

    return (
        <div className="font-sans m-8 mx-auto w-full flex flex-col justify-center items-center px-5">
            <div className="text-2xl font-bold mb-6">Current Student List</div>
            <div className="grid grid-auto-fit-[200px] gap-4 w-full">
                {schedule ? (
                    days.map((day, index) => {
                        const daySchedule = getDaySchedule(day);
                        const times = getTimes(day, daySchedule);
                        return (
                            <div
                                className="flex flex-col items-center border border-gray-300 p-4 bg-gray-100"
                                key={index}
                            >
                                <div
                                    className="text-lg font-bold mb-4"
                                    key={index}
                                >
                                    {day}
                                </div>
                                <ul>
                                    {times.map((time, index) => {
                                        let students = getStudents(
                                            day,
                                            time,
                                            daySchedule
                                        );
                                        return (
                                            <div
                                                className="flex justify-between items-center flex-col w-full mt-4"
                                                key={index}
                                            >
                                                <div className="text-lg font-bold text-center">
                                                    {time}
                                                </div>
                                                <div className="flex flex-wrap justify-center items-center">
                                                    {students.map(
                                                        (student, index) => {
                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    href={{
                                                                        pathname: `/student/${student._id}`,
                                                                        query: {
                                                                            student:
                                                                                JSON.stringify(
                                                                                    student
                                                                                ),
                                                                        },
                                                                    }}
                                                                >
                                                                    <div className="text-sm m-2 p-2 rounded-sm bg-gray-200 hover:bg-gray-300">
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </div>
                                                                </Link>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <div>loading students</div>
                        {errorMessage && (
                            <>
                                <div>Error:</div>
                                <div>{JSON.stringify(errorMessage)}</div>
                            </>
                        )}
                    </>
                )}
            </div>
            <Add addType="Student" handleChanged={handleChanged} />
        </div>
    );
}

export default CurrentStudents;
