import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//import '../styles/Add.css';

function PopupForm({ classNumber, addStudent }) {
    const classNames = ['electronics', 'robotics', 'coding'];
    const {_class} = useParams();

    //id and return
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [age, setAge] = useState(6);
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

    function handleSubmit(event) {
        event.preventDefault();

        const url = "http://localhost:5001/api/student/add/" + (addClass ? `class/${_class}` : addStudent ? "student" : "time");
        const body = addClass ?  newClass :  addStudent ? newStudent : newTime;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.text())
        .then((message) => {
            //console.log(message);
            if(addStudent) window.location.reload();
            else navigate('/');
        })
        .catch((error) => {
            console.error(error);
        });
        setClassDate('');
        setClassAchievement('');
        setClassLesson('');
        setClassLevel('');
        setShowPopup(false);
    }

    function handleCancel() {
        if(addClass){
            setClassDate('');
            setClassAchievement('');
            setClassLesson('');
        }
        else {
            setDay('');
            setTime('');
        }

        setShowPopup(false);
    }

    function buttons(name){
        return(
            <div className="flex justify-center items-center">
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
                <label htmlFor="classDate">Class Date:</label>
                <input
                    type="date"
                    id="classDate"
                    value={classDate}
                    onChange={(event) => setClassDate(event.target.value)}
                    required
                />
                <label htmlFor="classAchievement">Class Achievement:</label>
                <input
                    type="text"
                    id="classAchievement"
                    value={classAchievement}
                    onChange={(event) => setClassAchievement(event.target.value)}
                    required
                />
                <label htmlFor="classLesson">Class Lesson:</label>
                <input
                    type="text"
                    id="classLesson"
                    value={classLesson}
                    onChange={(event) => setClassLesson(event.target.value)}
                    required
                />
                <label htmlFor="classLevel">Class Level:</label>
                <input
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
                <label htmlFor="day">Class Day of the Week:</label>
                <input
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label htmlFor="time">Class time ex: 11:00:</label>
                <input
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
                <label htmlFor="name">Student Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label htmlFor="dob">Date of birth:</label>
                <input
                    type="text"
                    id="dob"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    required
                />
                <label htmlFor="age">Age:</label>
                <input
                    type="text"
                    id="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                />
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
                <label htmlFor="started">Started:</label>
                <input
                    type="Date"
                    id="started"
                    value={started}
                    onChange={(event) => setStarted(event.target.value)}
                    required
                />
                <label htmlFor="day">Day:</label>
                <input
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label htmlFor="time">Time:</label>
                <input
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
        ' onClick={() => setShowPopup(true)}>Add {addClass ? "Class" : addStudent ? "Student" : "Time"}</button>
        {showPopup && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
            <div className="bg-white p-4 rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                {addClass ? classPopup() : addStudent ? studentPopup() : timePopup()}
            </div>
            </div>
        )}
        </div>
    );
}


export default PopupForm;