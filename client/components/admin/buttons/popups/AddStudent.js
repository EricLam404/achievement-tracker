import React, { useState } from 'react';

const AddStudent = ({ handlePopup, handleAdd }) => {
    //student
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [started, setStarted] = useState(new Date().toISOString().slice(0, 10));

    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    function handleSubmit(){
        const newStudent = {
            name: name,
            email: email,
            dob: dob,
            age: age,
            phone: phone,
            address: address,
            started: started,
            days: [{
                day: day,
                time: time
            }],
            classes: {
                robotics: [],
                electronics: [],
                coding: [],
            }
        } 
        handleAdd(newStudent);
    }

    function handleCancel() {
        setName('');
        setEmail('');
        setDob('');
        setAge('');
        setPhone('');
        setAddress('');

        handlePopup();
    }

    function buttons(name){
      return(
          <div className="flex justify-center items-center pt-5">
              <button className='
              px-10 py-2 mx-4 my-0 border-none rounded-md text-lg font-bold text-white bg-gray-600 cursor-pointer transition duration-300 ease-in-out
              '
              type="submit" onSubmit={handleSubmit}>Add New {name}</button>
              <button className='
              px-10 py-2 mx-4 my-0 border-none rounded-md text-lg font-bold text-white bg-red-500 cursor-pointer transition duration-300 ease-in-out
              '
              type="button" onClick={handleCancel}>Cancel</button>
          </div>
      )
    }

    function studentPopup(){
        return (<>
            <h2 className='font-bold text-2xl'>Add New Student</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="name">Student Name:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="email">Email:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="dob">Date of birth:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="age">Age:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="phone">Phone Number:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="address">Address:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="started">Started:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="Date"
                    id="started"
                    value={started}
                    onChange={(event) => setStarted(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="day">Day:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="time">Time:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                />

                {buttons("Student")}
            </form>
            </>
        )
    }
    return (
        <>
            {studentPopup()}
        </>
    )
}

export default AddStudent