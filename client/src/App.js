import React, { useEffect, useState} from 'react';
import './App.css';
import Class from './components/Class';

function App() {
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/student');
            const jsonData = await response.json();
            setStudentData(jsonData);
        };
        
        fetchData();    
    }, []);
    return (
        <div className="App">
        <div className='header'>Achievement Tracker</div>
        <Class student_class={studentData}/>
        </div>
    );
}

export default App;
