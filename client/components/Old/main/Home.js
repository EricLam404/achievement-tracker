'use client'

import React, { useEffect, useState} from 'react';
import Schedule from '../admin/Schedule';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Student from '../user/Student';
import Header from '../../main/Header';

function Home() {
    const [scheduleData, setScheduleData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [showParent, setShowParent] = useState(false);
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
        if(Object.entries(user["http://localhost:3000//user_metadata/profile"]).length === 0 && showParent) navigate('/create/profile');
    }, [showParent]);

    function handleToggle(){
        setShowParent(() => {
            return !showParent;
        })
    }

    function isAdmin(){
        return (user?.email.split("@")[1] === process.env.REACT_APP_ADMIN_EMAIL);
    }

    return (
        <div className="App">
            <Header />
            {isAdmin() ? (
            <div>
                <div> 
                    <div>Parent View</div>
                    <input type="checkbox" className='toggle' onClick={handleToggle}/>
                </div>
                {showParent ? (
                    <Student />
                ) : (
                    <Schedule schedule={scheduleData} setUpdate={setUpdate} />
                )}
            </div>
            ) : (
            <Student />
            )}
        </div>
    );
}

export default Home;
