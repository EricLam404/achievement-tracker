import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/Archive.css"

function Archive({_id}) {
    const [showArchive, setShowArchive] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    function archiveId(){
        const url = "/api/archive/student";
        const body = { studentId: id };

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
        <button className="archive-btn" onClick={() => setShowArchive(true)}>Archive Student</button>
        {showArchive && (
            <div className="popup-container">
            <div className="popup">
                <h2>Are you sure you want to archive student</h2>
                <div className="button-container">
                    <button type="submit" onClick={archiveId}>Archive Student</button>
                    <button type="button" onClick={() => setShowArchive(false)}>
                    Cancel
                    </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default Archive;
