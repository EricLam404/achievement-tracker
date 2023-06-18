import React, { useEffect, useState} from 'react';
import Schedule from '../admin/Schedule';
import { useAuth0 } from "@auth0/auth0-react";
import Student from '../user/Student';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);
    const [update, setUpdate] = useState(false);
    const { user } = useAuth0();

    const fetchData = async () => {
        const response = await fetch('http://localhost:5001/api/student/students');
        const jsonData = await response.json();
        setScheduleData(jsonData);
        //console.log(jsonData);
    };
    
    useEffect(() => {
        fetchData();
        setUpdate(false);
    }, [update]);
    
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="App">
            <div className='flex justify-center items-center h-20 text-2xl font-bold text-white bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-shadow-sm shadow-sm'>Achievement Tracker</div>
            { user?.email.split("@")[1] === "test.com" ? 
                <Student /> :
                <Schedule schedule={scheduleData} setUpdate={setUpdate}/>
            }
        </div>
    );
}

export default Home;
