import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PopupForm.css';

function PopupForm({ classNumber }) {
    const [showPopup, setShowPopup] = useState(false);
    const [classDate, setClassDate] = useState('');
    const [classAchievement, setClassAchievement] = useState('');
    const [classLesson, setClassLesson] = useState('');

    const classNames = ['electronics', 'robotics', 'coding'];
    const {_class} = useParams();
    const addClass = classNames.includes(_class);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const newClass = {
        id: id,
        classNumber: (classNumber + 1),
        classDate: classDate,
        classAchievement: classAchievement,
        classLesson: classLesson,
        classType: _class
    };

    const newTime = {
        id: id,
        day: day,
        time: time
    };

    function handleSubmit(event) {
        event.preventDefault();

        const url = addClass ? `/add-class/${_class}` : "/add-time";
        const body = addClass ?  newClass : newTime;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.text())
        .then((message) => {
            console.log(message);
            navigate('/');
            /*
            const student = JSON.parse(message);
            const classes = student.classes[_class];
            console.log(classes);
            handleClasses(classes);
            */
        })
        .catch((error) => {
            console.error(error);
        });
        setClassDate('');
        setClassAchievement('');
        setClassLesson('');
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

    function classPopup(){
        return (
            <>
            <h2>Add Class</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="button-container">
                    <button type="submit">Add Class</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            </>
        )
    }

    function timePopup(){
        return (<>
            <h2>Add Timeslot</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="button-container">
                    <button type="submit">Add Timeslot</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>

        </>)
    }

    return (
        <div>
        <button onClick={() => setShowPopup(true)}>Add {addClass ? "Class" : "Time"}</button>
        {showPopup && (
            <div className="popup-container">
            <div className="popup">
                {addClass ? classPopup() : timePopup()}
            </div>
            </div>
        )}
        </div>
    );
}

export default PopupForm;