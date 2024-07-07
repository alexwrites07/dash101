import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const YourProfile = () => {
  const [educationNote, setEducationNote] = useState('');
  const [experienceNote, setExperienceNote] = useState('');
  const [skillsNote, setSkillsNote] = useState('');
  const [educationNotes, setEducationNotes] = useState([]);
  const [experienceNotes, setExperienceNotes] = useState([]);
  const [skillsNotes, setSkillsNotes] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };

  const savePersonalInfo = () => {
    // Here you can implement the save functionality for personal info
    console.log('Full Name:', fullName);
    console.log('Date of Birth:', dob);
    console.log('Gender:', gender);
    console.log('Age:', age);
    console.log('Email:', email);
    alert('Personal information saved!');
  };

  const saveEducationNotes = () => {
    // Here you can implement the save functionality for education notes
    console.log('Education Notes:', educationNotes);
    alert('Education notes saved!');
  };

  const saveExperienceNotes = () => {
    // Here you can implement the save functionality for experience notes
    console.log('Experience Notes:', experienceNotes);
    alert('Experience notes saved!');
  };

  const saveSkillsNotes = () => {
    // Here you can implement the save functionality for skills notes
    console.log('Skills Notes:', skillsNotes);
    alert('Skills notes saved!');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Profile</h1>
         

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={savePersonalInfo}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save 
            </button>
          </div>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Education</h2>
            <ul className="mb-4">
              {educationNotes.map((note, index) => (
                <li key={index} className="text-md text-gray-700 mb-2">{note}</li>
              ))}
            </ul>
            <textarea
              value={educationNote}
              onChange={(e) => setEducationNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            ></textarea>
            <button
              onClick={() => addNote(educationNote, setEducationNotes, setEducationNote)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Note
            </button>
            <button
              onClick={saveEducationNotes}
              className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-green-700"
            >
              Save 
            </button>
          </section>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Experience</h2>
            <ul className="mb-4">
              {experienceNotes.map((note, index) => (
                <li key={index} className="text-md text-gray-700 mb-2">{note}</li>
              ))}
            </ul>
            <textarea
              value={experienceNote}
              onChange={(e) => setExperienceNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            ></textarea>
            <button
              onClick={() => addNote(experienceNote, setExperienceNotes, setExperienceNote)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Note
            </button>
            <button
              onClick={saveExperienceNotes}
              className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-green-700"
            >
              Save 
            </button>
          </section>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Skills</h2>
            <ul className="mb-4">
              {skillsNotes.map((note, index) => (
                <li key={index} className="text-md text-gray-700 mb-2">{note}</li>
              ))}
            </ul>
            <textarea
              value={skillsNote}
              onChange={(e) => setSkillsNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            ></textarea>
            <button
              onClick={() => addNote(skillsNote, setSkillsNotes, setSkillsNote)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Note
            </button>
            <button
              onClick={saveSkillsNotes}
              className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-green-700"
            >
              Save 
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
