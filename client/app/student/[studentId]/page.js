'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import Add from '@/components/admin/buttons/Add';
import Archive from '@/components/admin/buttons/Archive';
import Delete from '@/components/admin/buttons/Delete';
import Back from '@/components/main/buttons/Back';
import QRCode from 'qrcode';
import ReactToPrint from 'react-to-print';

const Page = ({ searchParams }) => {
    const classNames = ['electronics', 'robotics', 'coding'];
    const student = searchParams.student ? JSON.parse(searchParams.student) : null;
    const classes = student?.classes;
    const time = student?.days;

    const [qrCode, setqrCode] = useState("");
    const [updated, setUpdated] = useState(false);
    const link = `http://localhost:3000/${student?._id}`;

    const componentRef = useRef();

    const generateQRCode = async () => {
        try {
            const qrCodeDataURL = await QRCode.toDataURL(link);
            setqrCode(qrCodeDataURL);
            setUpdated(true);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    useEffect(()=> {
        if(!updated) generateQRCode();
    }, []);

    return (
        student ? 
        <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center font-sans text-base text-gray-700 leading-relaxed">
            <div className='text-2xl mb-4'>Student id: {student?._id}</div>
            <ReactToPrint
                trigger={() => <button className='btn bg-gray-300 hover:bg-gray-400'>Print Student QR Code Out</button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} className='flex flex-col justify-center items-center'>
                <div className='text-lg'>Student: {student?.name}</div>
                <div>QR Code: </div>
                {qrCode && <img src={qrCode} alt="QR Code" />}
            </div>
            <div className='text-2xl font-bold mb-4'>Classes</div>
            <ul>
                {classNames.map((classType, index) => (
                    <Link 
                    key={index} 
                    href={{
                        pathname: `${student._id}/class/${classType}`,
                        query: {
                            class: JSON.stringify(classes[classType])
                        }
                    }} 
                    >
                        <div className='"text-gray-700 no-underline flex justify-center px-10 py-5 m-5 rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white'>{classType[0].toUpperCase() + classType.substring(1)}</div>
                    </Link>
                ))}
            </ul>
            <div className='font-bold text-2xl mt-5 mb-2'>Time List</div>
            <ul className='flex flex-col'>
                {time.map((time, index) => (
                    <li className="bg-white rounded-lg shadow-md p-7 m-4 min-w-min justify-between flex flex-col items-center space-y-5" key={index}>
                        <div className='text-lg font-bold uppercase text-gray-600'>{time.day}</div>
                        <div className='text-base text-gray-400'>{time.time}</div>
                        <Delete id={time._id} name="Time"/>
                    </li>
                ))}
                <Add addType="Time"/>
            </ul>
            <div className='flex flex-col justify-center items-center m-4 space-y-6'>
                <Delete id={student._id} name="Student"/>
                <Archive />
            </div>
            <div>
                <h1 className='text-xl font-semibold'>Student Information</h1>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            E-mail: 
                        </div>
                        <div className=''>
                            {student.email} 
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            Date of birth: 
                        </div>
                        <div className=''>
                            {student.dob}
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            Age: 
                        </div>
                        <div className=''>
                            {student.age}
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            Phone Number: 
                        </div>
                        <div className=''>
                            {student.phone}  
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            Address: 
                        </div>
                        <div className=''>
                            {student.address} 
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='font-semibold'>
                            Started: 
                        </div>
                        <div className=''>
                            {student.started.substr(0, 10)}
                        </div>
                    </div>
                </div>
            </div>
            <Back/>
        </div>
        : <div>Student not found</div>
    );
}

export default Page;