import React, { useEffect, useState} from 'react';
import './App.css';
import Class from './components/Class';
import Schedule from './components/Schedule';

function App() {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/student');
            const jsonData = await response.json();
            setScheduleData(jsonData);
            console.log("APP");
            console.log(jsonData);
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

export default App;
