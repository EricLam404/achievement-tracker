import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

function CreateProfile(){
  const [parentName, setParentName] = useState('');
  const [parentDOB, setParentDOB] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childDOB, setChildDOB] = useState('');

  const {user, isAuthenticated} = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let profile = {
      parent_name: parentName,
      parent_DOB: parentDOB,
      phone: phone,
      child_name: childName,
      child_DOB: childDOB
    };

    fetch("/api/user/metadata", {
        method: 'PUT',
        body: JSON.stringify(profile),
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="parentName" className="block font-medium mb-1">
            Parent's Name
          </label>
          <input
            type="text"
            id="parentName"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="parentDOB" className="block font-medium mb-1">
            Parent's Date of Birth
          </label>
          <input
            type="date"
            id="parentDOB"
            value={parentDOB}
            onChange={(e) => setParentDOB(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="childName" className="block font-medium mb-1">
            Child's Name
          </label>
          <input
            type="text"
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="childDOB" className="block font-medium mb-1">
            Child's Date of Birth
          </label>
          <input
            type="date"
            id="childDOB"
            value={childDOB}
            onChange={(e) => setChildDOB(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
            Create
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;