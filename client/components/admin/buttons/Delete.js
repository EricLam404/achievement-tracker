"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Delete = ({ id, name }) => {
    const [showDelete, setShowDelete] = useState(false);
    //const { getAccessTokenSilently } = useAuth0();
    const { studentId } = useParams();
    const router = useRouter();
    const classes = ["robotics", "electronics", "coding"];
    const sectionType = classes.includes(name) ? "Class" : name;

    async function deleteId() {
        let url = `http://localhost:5001/api/students/${studentId}`;
        let body = {};
        if (sectionType === "Class") {
            url += `/classes/${name}/${id}`;
            body = { studentId: studentId, classId: id, classType: name };
        } else if (sectionType === "Time") {
            url += `/times/${id}`;
            body = { studentId: studentId, timeId: id };
        } else if (sectionType === "Student") {
            body = { studentId: studentId };
        }
        //const token = await getAccessTokenSilently();

        fetch(url, {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.text())
            .then((message) => {
                router.replace("/");
            })
            .catch((error) => {
                console.error(error);
            });
        /*
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    })
    .then((response) => response.text())
    .then((message) => {
        navigate('/');
    })
    .catch((error) => {
        console.error(error);
    });
    */
    }

    return (
        <div>
            <button
                className="btn bg-red-500 border-none p-3 m3 hover:text-red-500"
                onClick={() => setShowDelete(true)}
            >
                Delete {sectionType}
            </button>
            {showDelete && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
                    <div className="bg-white p-4 rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                        <h2 className="text-xl font-bold m-5">
                            Are you sure you want to delete {sectionType}
                        </h2>
                        <div className="flex gap-2 justify-center items-center p-5">
                            <button
                                className="btn btn-sm btn-error bg-red-500 border-none hover:text-gray-200"
                                type="submit"
                                onClick={deleteId}
                            >
                                Delete {sectionType}
                            </button>
                            <button
                                className="btn btn-sm"
                                type="button"
                                onClick={() => setShowDelete(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Delete;
