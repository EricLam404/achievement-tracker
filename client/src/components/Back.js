import React from 'react';
import { useNavigate } from 'react-router-dom';

//import "../styles/Back.css"

function Back(){
    const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

    return(
        <button className='back-btn' onClick={handleBack}>Go Back</button>
    )
}

export default Back;