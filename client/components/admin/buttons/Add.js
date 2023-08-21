'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddClass from './popups/AddClass';
import AddTime from './popups/AddTime';
import AddStudent from './popups/AddStudent';

const Add = ({ addType, classNumber }) => {
    const [showPopup, setShowPopup] = useState(false);
    //const { getAccessTokenSilently } = useAuth0();
    
    //id and return
    const { studentId, classType } = useParams();
    const router = useRouter();

    const classes = ['robotics', 'electronics', 'coding'];
    const sectionType = classes.includes(addType) ? "Class" : addType;

    function handlePopup(){
      setShowPopup(false);
    }

    async function handleAdd(body) {
        //const token = await getAccessTokenSilently();
        let url = `http://localhost:5001/api/students/${studentId}`
        if(sectionType === "Class"){
            url += `/classes/${classType}/${id}`;
        }
        else if(sectionType === "Time"){
            url += `/times/${id}`;
        }

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json'
          },
        })
        .then((response) => response.text())
        .then((message) => {
            router.replace('/');
        })
        .catch((error) => {
            console.error(error);
        });

        handlePopup();
    }

    return (
        <div className='flex justify-center items-center'>
        
        <button className='
        fixed bottom-4 right-4 inline-block bg-gray-700 text-white rounded-[0.5rem] text-lg px-8 py-4 shadow-md transition-all duration-200 ease-in-out cursor-pointer text-center
        ' 
        onClick={() => setShowPopup(true)}>Add {sectionType}</button>
        {showPopup && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 flex items-center justify-center bg-white rounded-2xl shadow-md p-8 font-roboto backdrop-blur">
                <div className="bg-white p-4 flex flex-col items-center rounded-md shadow-md text-black w-[calc(15vw + 300px)]">
                    {
                      sectionType === "Class" ? <AddClass handleAdd={handleAdd} handlePopup={handlePopup} classNumber={classNumber}/>
                      : sectionType === "Time" ? <AddTime handleAdd={handleAdd} handlePopup={handlePopup}/>
                      : sectionType === "Student" ? <AddStudent handleAdd={handleAdd} handlePopup={handlePopup}/>
                      : <div>Error Adding</div>
                    }
                </div>
            </div>
        )}
        </div>
    );
}


export default Add;

/*

//alerts
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
}, [showSuccess]);
useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
}, [showError]);

{showSuccess && (
    <div className="fixed top-4 left-[10vw] w-[80vw] alert alert-success shadow-lg" style={{ transition: 'opacity 0.5s ease', opacity: showSuccess ? 1 : 0 }}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{addClass ? "Class" : addStudent ? "Student" : "Time"} saved successfully!</span>
        </div>
    </div>
)}
{showError && (
    <div className="fixed top-4 left-[10vw] w-[80vw] alert alert-error shadow-lg" style={{ transition: 'opacity 0.5s ease', opacity: 1 }}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! {addClass ? "Class" : addStudent ? "Student" : "Time"} failed to save.</span>
        </div>
  </div>
)}

fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
    },
})
.then((response) => response.text())
.then((message) => {
    setShowSuccess(true);
    //console.log(message);
    if(addStudent) setUpdate(true);
    navigate('/');
})
.catch((error) => {
    setShowError(true);
    console.error(error);
});
        
*/