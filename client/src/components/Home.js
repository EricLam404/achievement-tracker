import React, { useEffect, useState} from 'react';
import Schedule from './Schedule';

//import '../styles/Home.css';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5001/api/student/students');
            const jsonData = await response.json();
            setScheduleData(jsonData);
            //console.log(jsonData);
        };
        
        fetchData();    
    }, []);
    return (
        <div className="App">
            <div className='flex justify-center items-center h-20 text-2xl font-bold text-white bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-shadow-sm shadow-sm'>Achievement Tracker</div>
            <Schedule schedule={scheduleData}/>
        </div>
    );
}

export default Home;
