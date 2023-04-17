import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Delete({_class}) {
    const { id } = useParams();
    const navigate = useNavigate();

    function deleteClass(){
        fetch(`/delete-class/${_class}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
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

        </div>
    );
}

export default Delete;
