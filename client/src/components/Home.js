import React, { useEffect, useState} from 'react';
import '../styles/Home.css';
import Schedule from './Schedule';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/student/students');
            const jsonData = await response.json();
            setScheduleData(jsonData);
            //console.log(jsonData);
        };
        
        fetchData();    
    }, []);
    return (
        <div className="App">
        <div className='header'>Achievement Tracker</div>
        <Schedule schedule={scheduleData}/>
        </div>
    );
}

export default Home;
