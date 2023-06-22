import React, { useEffect, useState} from 'react';
import Schedule from '../admin/Schedule';
import { useAuth0 } from "@auth0/auth0-react";
import Student from '../user/Student';
import Header from './Header';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);
    const [update, setUpdate] = useState(false);
    const { user, getAccessTokenSilently } = useAuth0();

    const fetchData = async () => {
        try{
            const url = 'http://localhost:5001/api/student/students';
            const token = await getAccessTokenSilently();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            const jsonData = await response.json();
        setScheduleData(jsonData);
        } catch (e){
            console.log(e);
        }
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
            <Header/>
            { user?.email.split("@")[1] === process.env.REACT_APP_ADMIN_EMAIL ? 
                <Student /> :
                <Schedule schedule={scheduleData} setUpdate={setUpdate}/>
            }
        </div>
    );
}

export default Home;
