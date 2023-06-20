import React from 'react';
import { useNavigate } from 'react-router-dom';

function Back(){
    const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

    return(
        <button className='btn' onClick={handleBack}>Go Back</button>
    )
}

export default Back;