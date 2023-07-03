import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Student() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [student, setStudent]= useState({});
    
    const fetchData = async () => {
        try{
            const id = user["http://localhost:3000//app_metadata/profile"]?.student_id;
            const url = `http://localhost:5001/api/student/student/${id}`;
            const token = await getAccessTokenSilently();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                
            })
            const jsonData = await response.json();
            setStudent(jsonData);
        } catch (e){
            console.log(e);
        }
    };
    
    useEffect(() => {
        if(user["http://localhost:3000//app_metadata/profile"]?.student_id !== '') fetchData();
    }, []);

    return (
        <div>
           <div>{student.name}</div>
        </div>
    );
}

export default Student;
