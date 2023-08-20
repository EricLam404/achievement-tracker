import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const AddClass = ({ handlePopup, handleSubmit }) => {
    const classNames = ['electronics', 'robotics', 'coding'];
    const { classType } = useParams();

    //class
    const [classDate, setClassDate] = useState(new Date().toISOString().slice(0, 10));
    const [classAchievement, setClassAchievement] = useState('');
    const [classLesson, setClassLesson] = useState('');
    const [classLevel, setClassLevel] = useState('');

    const newClass = {
        id: id,
        classNumber: (classNumber + 1),
        classDate: classDate,
        classAchievement: classAchievement,
        classLesson: classLesson,
        classLevel: classLevel,
        classType: _class
    };

    function handleCancel() {
        setClassAchievement('');
        setClassLesson('');
        setClassLevel('');

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

    function classPopup(){
        return (
            <>
            <h2 className='font-bold text-2xl'>Add Class</h2>
            <form className="flex items-center flex-col p-4" onSubmit={handleSubmit}>
                <label className='labal' htmlFor="classDate">Class Date:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="date"
                    id="classDate"
                    value={classDate}
                    onChange={(event) => setClassDate(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classAchievement">Class Achievement:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classAchievement"
                    value={classAchievement}
                    onChange={(event) => setClassAchievement(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classLesson">Class Lesson:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classLesson"
                    value={classLesson}
                    onChange={(event) => setClassLesson(event.target.value)}
                    required
                />
                <label className='labal' htmlFor="classLevel">Class Level:</label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    id="classLevel"
                    value={classLevel}
                    onChange={(event) => setClassLevel(event.target.value)}
                    required
                />
                {buttons("Class")}
            </form>
            </>
        )
    }

    return (
        <>
            {classPopup()}
        </>
    )
}

export default AddClass