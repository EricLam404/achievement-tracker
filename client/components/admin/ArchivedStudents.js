import React, { useEffect, useState } from "react";
import Link from "next/link";

function ArchievedStudents() {
    const [updated, setUpdated] = useState(false);
    const [schedule, setSchedule] = useState(null);

    const fetchData = async () => {
        try {
            const url = "api/students/archieved";
            const response = await fetch(`/api/proxy/?route=${url}`, {
                method: "GET",
            });
            
            const jsonData = await response.json();
            setSchedule(jsonData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!updated) fetchData();
        setUpdated(true);
    }, []);

    return (
        <div className="font-sans m-8 mx-auto w-full flex flex-col justify-center items-center px-5">
            <div className="text-2xl font-bold mb-6">
                Archieved Student List
            </div>
            <div className="flex flex-col">
                {schedule ? (
                    schedule.map((archievedStudent, index) => {
                        const student = archievedStudent.student;
                        return (
                            <Link
                                key={index}
                                href={{
                                    pathname: `/archieved/${student._id}`,
                                    query: {
                                        student: JSON.stringify(student),
                                    },
                                }}
                            >
                                <div className="text-lg font-semibold m-2 p-5 rounded-sm bg-gray-200 hover:bg-gray-300">
                                    {student.name}
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div>loading archieved students</div>
                )}
            </div>
        </div>
    );
}

export default ArchievedStudents;
