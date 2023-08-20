import React, { useState } from 'react';

const AddTime = ({ handlePopup, handleSubmit}) => {
    //time
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    const newTime = {
        id: id,
        day: day,
        time: time
    };

    function handleCancel() {
        setDay('');
        setTime('');

        handlePopup();
    }

    function buttons(name){
      return(
          <div className="flex justify-center items-center pt-5">
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

    function timePopup(){
        return (<>
            <h2 className='font-bold text-2xl'>Add Timeslot</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="day">Class Day of the Week:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="time">Class time ex: 11:00:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
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

    return (
        <>
            {timePopup()}
        </>
    )
}

export default AddTime