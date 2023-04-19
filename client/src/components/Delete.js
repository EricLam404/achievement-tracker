import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Delete({_id, _class}) {
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    function deleteClass(){
        console.log("fetch")
        fetch(`/delete-class/${_class}`, {
            method: 'DELETE',
            body: JSON.stringify({
                studentId: id,
                classId: _id
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
    }

    return (
        <div>
        <button onClick={() => setShowDelete(true)}>Delete Class</button>
        {showDelete && (
            <div className="popup-container">
            <div className="popup">
                <h2>Delete Class</h2>
                <div className="button-container">
                    <button type="submit" onClick={deleteClass}>Delete Class</button>
                    <button type="button" onClick={() => setShowDelete(false)}>
                    Cancel
                    </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default Delete;
