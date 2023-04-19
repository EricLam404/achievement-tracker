import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Delete({_id, _name}) {
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const classes = ['robotics', 'electronics', 'coding'];
    const _type = classes.includes(_name) ? "Classes" : "Time";

    function deleteId(){
        const url = _type === "Classes" ? `/delete-class/${_name}` : "/delete-time";
        const body = _type === "Classes" ? { studentId: id, classId: _id } : { studentId: id, timeId: _id  };
        fetch(url, {
            method: 'DELETE',
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
    }

    return (
        <div>
        <button onClick={() => setShowDelete(true)}>Delete {_type}</button>
        {showDelete && (
            <div className="popup-container">
            <div className="popup">
                <h2>Delete Class</h2>
                <div className="button-container">
                    <button type="submit" onClick={deleteId}>Delete {_type}</button>
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
