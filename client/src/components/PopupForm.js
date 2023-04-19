import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PopupForm.css';

function PopupForm({ _class, classNumber }) {
    const [showPopup, setShowPopup] = useState(false);
    const [classDate, setClassDate] = useState('');
    const [classAchievement, setClassAchievement] = useState('');
    const [classLesson, setClassLesson] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`/add-class/${_class}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                classNumber: (classNumber + 1),
                classDate: classDate,
                classAchievement: classAchievement,
                classLesson: classLesson,
                classType: _class
            }),
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
        setClassDate('');
        setClassAchievement('');
        setClassLesson('');
        setShowPopup(false);
    }

    return (
        <div>
        <button onClick={() => setShowPopup(true)}>Add Class</button>
        {showPopup && (
            <div className="popup-container">
            <div className="popup">
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
                    <button type="button" onClick={handleCancel}>
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
}

export default PopupForm;
