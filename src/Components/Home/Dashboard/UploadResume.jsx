import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Replace with actual token and tutor ID
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWUyNTBmMDEwYjA4NTJhNzU0ZTliZiIsImlhdCI6MTcyMTkwMjE4Mn0.pvPZFwt9VjiRwnNBAWGBjfgd2EK_9B0oQMENsJU0JcM';
const tutorId = '66992c29aedf900d3688eb7e';

const UploadResume = () => {
  const [educationFields, setEducationFields] = useState([{ title: '', academy: '', year: '', description: '' }]);
  const [experienceFields, setExperienceFields] = useState([{ title: '', startDate: '', endDate: '', company: '', description: '' }]);
  const [awardFields, setAwardFields] = useState([{ title: '', year: '', description: '' }]);

  useEffect(() => {
    fetchEducationDetails();
  }, []);

  const fetchEducationDetails = async () => {
    try {
      const response = await fetch(`https://backend.akshayy.tech/tutor/education/${tutorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setEducationFields(data);
    } catch (error) {
      console.error('Error fetching education details:', error);
    }
  };

  const addEducationDetails = async (newEducation) => {
    try {
      const response = await fetch('https://backend.akshayy.tech/addEducationDetails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEducation)
      });
      if (response.ok) {
        fetchEducationDetails();
      }
    } catch (error) {
      console.error('Error adding education details:', error);
    }
  };

  const deleteEducationDetails = async (educationId) => {
    try {
      const response = await fetch(`https://backend.akshayy.tech/tutor/education`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ educationId })
      });
      if (response.ok) {
        fetchEducationDetails();
      }
    } catch (error) {
      console.error('Error deleting education details:', error);
    }
  };

  const handleAddField = (setFields, defaultField) => {
    setFields(prevFields => [...prevFields, defaultField]);
  };

  const handleRemoveField = (index, setFields, fields) => {
    const field = fields[index];
    if (field._id) {
      // Delete from backend if the field has an _id (indicating it's saved)
      deleteEducationDetails(field._id);
    } else {
      // Just remove from state if not yet saved
      setFields(prevFields => prevFields.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, value, fieldName, fields, setFields) => {
    const newFields = fields.map((field, i) => (i === index ? { ...field, [fieldName]: value } : field));
    setFields(newFields);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Upload Resume</h1>
          <p className="text-lg mb-12 text-gray-700">This is where you upload your resume.</p>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Upload Your Resume</h2>
            <div className="flex mb-4">
              <label htmlFor="resume-upload" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Choose File
              </label>
              <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
            <p className="text-sm text-gray-600">Accepted file formats: PDF, DOC, DOCX</p>
          </div>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Education</h2>
            {educationFields.map((field, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold mb-2">Education {index + 1}</h3>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Title</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.title}
                    onChange={(e) => handleChange(index, e.target.value, 'title', educationFields, setEducationFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Academy</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.academy}
                    onChange={(e) => handleChange(index, e.target.value, 'academy', educationFields, setEducationFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Year</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.year}
                    onChange={(e) => handleChange(index, e.target.value, 'year', educationFields, setEducationFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Description</label>
                  <textarea
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.description}
                    onChange={(e) => handleChange(index, e.target.value, 'description', educationFields, setEducationFields)}
                  />
                </div>
                <button
                  onClick={() => handleRemoveField(index, setEducationFields, educationFields)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-4"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddField(setEducationFields, { title: '', academy: '', year: '', description: '' })}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Another Education
            </button>
            <button
              onClick={() => {
                // Save all new fields to the backend
                educationFields.forEach(field => {
                  if (!field._id) {
                    addEducationDetails(field);
                  }
                });
              }}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4"
            >
              Save Education Details
            </button>
          </div>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Experience</h2>
            {experienceFields.map((field, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold mb-2">Experience {index + 1}</h3>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Title</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.title}
                    onChange={(e) => handleChange(index, e.target.value, 'title', experienceFields, setExperienceFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Start Date</label>
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.startDate}
                    onChange={(e) => handleChange(index, e.target.value, 'startDate', experienceFields, setExperienceFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">End Date</label>
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.endDate}
                    onChange={(e) => handleChange(index, e.target.value, 'endDate', experienceFields, setExperienceFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Company</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.company}
                    onChange={(e) => handleChange(index, e.target.value, 'company', experienceFields, setExperienceFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Description</label>
                  <textarea
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.description}
                    onChange={(e) => handleChange(index, e.target.value, 'description', experienceFields, setExperienceFields)}
                  />
                </div>
                <button
                  onClick={() => handleRemoveField(index, setExperienceFields, experienceFields)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-4"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddField(setExperienceFields, { title: '', startDate: '', endDate: '', company: '', description: '' })}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Another Experience
            </button>
          </div>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Portfolio</h2>
            <div className="flex mb-4">
              <label htmlFor="portfolio-upload" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Browse
              </label>
              <input type="file" id="portfolio-upload" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Awards</h2>
            {awardFields.map((field, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold mb-2">Award {index + 1}</h3>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Title</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.title}
                    onChange={(e) => handleChange(index, e.target.value, 'title', awardFields, setAwardFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Year</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.year}
                    onChange={(e) => handleChange(index, e.target.value, 'year', awardFields, setAwardFields)}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="mb-1">Description</label>
                  <textarea
                    className="p-2 border border-gray-300 rounded-lg"
                    value={field.description}
                    onChange={(e) => handleChange(index, e.target.value, 'description', awardFields, setAwardFields)}
                  />
                </div>
                <button
                  onClick={() => handleRemoveField(index, setAwardFields, awardFields)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-4"
                >
                  Remove Award
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddField(setAwardFields, { title: '', year: '', description: '' })}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Another Award
            </button>
          </div>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4">
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
