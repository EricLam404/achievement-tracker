import React, { useEffect, useState} from 'react';
import Schedule from '../admin/Schedule';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Student from '../user/Student';
import Header from './Header';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);
    const [update, setUpdate] = useState(false);
    const { user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

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

    useEffect(() => {
        if(Object.entries(user["http://localhost:3000//user_metadata/profile"]).length === 0) navigate('/create/profile');
      }, []);
    return (
        <div className="App">
            <Header/>
            { user?.email.split("@")[1] === process.env.REACT_APP_ADMIN_EMAIL ? 
                <Schedule schedule={scheduleData} setUpdate={setUpdate}/> :
                <Student /> 
            }
        </div>
    );
}

export default Home;
