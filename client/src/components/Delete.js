import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/Delete.css"

function Delete({_id, _name}) {
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const classes = ['robotics', 'electronics', 'coding'];
    const _type = classes.includes(_name) ? "Class" : _name;

    function deleteId(){
        let url = "/api/student/delete/", body = "";
        if(_type === "Class"){
            url += `class/${_name}`;
            body = { studentId: id, classId: _id, classType: _name};
        }
        else if(_type === "Time"){
            url += "time";
            body = { studentId: id, timeId: _id  };
        }
        else if(_type === "Student"){
            url += "student";
            console.log(url);
            body = { studentId: id};
        }

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
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
        <button className='delete-btn' onClick={() => setShowDelete(true)}>Delete {_type}</button>
        {showDelete && (
            <div className="popup-container">
            <div className="popup">
                <h2>Delete {_type}</h2>
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
