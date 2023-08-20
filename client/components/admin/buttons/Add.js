'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'

const Add = ({ classNumber, addStudent, setUpdate }) => {
    //const { getAccessTokenSilently } = useAuth0();
    const classNames = ['electronics', 'robotics', 'coding'];
    const {_class} = useParams();

    //alerts
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    //id and return
    const { id } = useParams();

    const addClass = classNames.includes(_class);
    //class
    const [showPopup, setShowPopup] = useState(false);
    const [classDate, setClassDate] = useState(new Date().toISOString().slice(0, 10));
    const [classAchievement, setClassAchievement] = useState('');
    const [classLesson, setClassLesson] = useState('');
    const [classLevel, setClassLevel] = useState('');

    //time
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    //student
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [started, setStarted] = useState(new Date().toISOString().slice(0, 10));

    const newClass = {
        id: id,
        classNumber: (classNumber + 1),
        classDate: classDate,
        classAchievement: classAchievement,
        classLesson: classLesson,
        classLevel: classLevel,
        classType: _class
    };

    const newTime = {
        id: id,
        day: day,
        time: time
    };

    const newStudent = {
        name: name,
        email: email,
        dob: dob,
        age: age,
        phone: phone,
        address: address,
        started: started,
        days: [{
            day: day,
            time: time
        }],
        classes: {
            robotics: [],
            electronics: [],
            coding: [],
        }
    }   
    useEffect(() => {
        if (showSuccess) {
          const timer = setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
    }, [showSuccess]);
    useEffect(() => {
        if (showError) {
          const timer = setTimeout(() => {
            setShowError(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
    }, [showError]);

    async function handleSubmit(event) {
        event.preventDefault();

        const url = "http://localhost:5001/api/student/add/" + (addClass ? `class/${_class}` : addStudent ? "student" : "time");
        const body = addClass ?  newClass :  addStudent ? newStudent : newTime;
        //const token = await getAccessTokenSilently();
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json'
          },
        })
        .then((response) => response.text())
        .then((message) => {
            setShowSuccess(true);
            if(addStudent) setUpdate(true);
            navigate('/');
        })
        .catch((error) => {
            setShowError(true);
            console.error(error);
        });
        /*
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.text())
        .then((message) => {
            setShowSuccess(true);
            //console.log(message);
            if(addStudent) setUpdate(true);
            navigate('/');
        })
        .catch((error) => {
            setShowError(true);
            console.error(error);
        });
        */
        handleCancel();
    }

    function handleCancel() {
        if(addClass){
            setClassAchievement('');
            setClassLesson('');
            setClassLevel('');
        }
        else if(addStudent){
            setName('');
            setEmail('');
            setDob('');
            setAge('');
            setPhone('');
            setAddress('');
        }
        else {
            setDay('');
            setTime('');
        }

        setShowPopup(false);
    }

    function buttons(name){
        return(
            <div className="flex justify-center items-center pt-5">
                <button className='
                px-10 py-2 mx-4 my-0 border-none rounded-md text-lg font-bold text-white bg-gray-600 cursor-pointer transition duration-300 ease-in-out
                '
                type="submit">Add New {name}</button>
                <button className='
                px-10 py-2 mx-4 my-0 border-none rounded-md text-lg font-bold text-white bg-red-500 cursor-pointer transition duration-300 ease-in-out
                '
                type="button" onClick={handleCancel}>Cancel</button>
            </div>
        )
    }

    function classPopup(){
        return (
            <>
            <h2>Add Class</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="classDate">Class Date:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="date"
                    id="classDate"
                    value={classDate}
                    onChange={(event) => setClassDate(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classAchievement">Class Achievement:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classAchievement"
                    value={classAchievement}
                    onChange={(event) => setClassAchievement(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classLesson">Class Lesson:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classLesson"
                    value={classLesson}
                    onChange={(event) => setClassLesson(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classLevel">Class Level:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classLevel"
                    value={classLevel}
                    onChange={(event) => setClassLevel(event.target.value)}
                    required
                />
                {buttons("Class")}
            </form>
            </>
        )
    }

    function timePopup(){
        return (<>
            <h2>Add Timeslot</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="day">Class Day of the Week:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="time">Class time ex: 11:00:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                />
                {buttons("Timeslot")}
            </form>

        </>)
    }
    function studentPopup(){
        return (<>
            <h2>Add New Student</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="name">Student Name:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="email">Email:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="dob">Date of birth:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="age">Age:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="phone">Phone Number:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="address">Address:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="started">Started:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="Date"
                    id="started"
                    value={started}
                    onChange={(event) => setStarted(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="day">Day:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="time">Time:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                />

                {buttons("Student")}
            </form>
            </>
        )
    }

    return (
        <div className='flex justify-center items-center'>
        
        <button className='
        fixed bottom-4 right-4 inline-block bg-gray-700 text-white rounded-[0.5rem] text-lg px-8 py-4 shadow-md transition-all duration-200 ease-in-out cursor-pointer text-center
        ' 
        onClick={() => setShowPopup(true)}>Add {addClass ? "Class" : addStudent ? "Student" : "Time"}</button>
        {showPopup && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
                <div className="bg-white p-4 rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                    {addClass ? classPopup() : addStudent ? studentPopup() : timePopup()}
                </div>
            </div>
        )}
        {showSuccess && (
            <div className="fixed top-4 left-[10vw] w-[80vw] alert alert-success shadow-lg" style={{ transition: 'opacity 0.5s ease', opacity: showSuccess ? 1 : 0 }}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{addClass ? "Class" : addStudent ? "Student" : "Time"} saved successfully!</span>
                </div>
            </div>
        )}
        {showError && (
            <div className="fixed top-4 left-[10vw] w-[80vw] alert alert-error shadow-lg" style={{ transition: 'opacity 0.5s ease', opacity: 1 }}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error! {addClass ? "Class" : addStudent ? "Student" : "Time"} failed to save.</span>
                </div>
          </div>
        )}
        </div>
    );
}


export default Add;