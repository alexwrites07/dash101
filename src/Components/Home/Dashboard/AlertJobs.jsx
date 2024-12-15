import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
const AlertJobs = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [genderPreference, setgenderPreference] = useState('');
  const [requirement, setrequirement] = useState('');
  const [board, setboard] = useState('');
  const [categories, setCategories] = useState('');
  const [topicBasedLearning, setTopicBasedLearning] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in local storage');
      return;
    }

    // Prepare query string
    const queryString = new URLSearchParams({
      fullName: title,
      genderPreference,
      
      requirement,
      categories,
      board,
      
    }).toString();

    const payload = {
      uri: `https://server.avyudha.com/learning-needs?${queryString}`,
    };

    try {
      const response = await fetch('https:/server.avyudha.com/saveNeeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save filter');
      }

      const result = await response.json();
      alert('Alert saved successfully', result);
    } catch (error) {
      console.error('Error saving filter:', error.message);
    }
  };

  return (
    <div className="p-4">
          <div className="flex flex-col lg:ml-64 lg:flex-row">
      <Sidebar />
      <div className="flex-1  lg:ml-24">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full"> <h3 className='font-semibold'>Set Candidate Alerts</h3></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title (Full Name):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">GenderPreference:</label>
          <input
            type="text"
            value={genderPreference}
            onChange={(e) => setgenderPreference(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Requirements:</label>
          <input
            type="text"
            value={requirement}
            onChange={(e) => setrequirement(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Board:</label>
          <input
            type="text"
            value={board}
            onChange={(e) => setboard(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        {/* <div>
          <label className="block">Category:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Topic-Based Learning:</label>
          <input
            type="text"
            value={topicBasedLearning}
            onChange={(e) => setTopicBasedLearning(e.target.value)}
            className="border p-2 w-full"
          />
        </div> */}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
          Save Filter
        </button>
      </form>
    </div>
    </div></div>
  );
};

export default AlertJobs;
