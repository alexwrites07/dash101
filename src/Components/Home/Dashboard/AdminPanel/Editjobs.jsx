import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extracts the job ID from the URL
  const [jobData, setJobData] = useState({
    title: '',
    location: {
      city: '',
      state: '',
      pinCode: '',
      coordinates: ['', ''],
      type: 'Point',
    },
    salary: {
      min: '',
      max: '',
      period: '',
    },
    workDetails: {
      commitment: '',
      mode: '',
    },
    experience: '',
    gender: '',
    qualification: '',
    careerLevel: '',
    description: '',
    keyResponsibilities: '', // Initialize as a string
    skillAndExperience: '', // Initialize as a string
    lastDateToApply: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getjobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobData(response.data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, field, subfield) => {
    const { value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [subfield]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        "title": jobData.title,
        "location.city": jobData.location.city,
        "location.state": jobData.location.state,
        "location.pinCode": jobData.location.pinCode,
        "location.coordinates": jobData.location.coordinates,
        "location.type": jobData.location.type,
        "salary.min": jobData.salary.min,
        "salary.max": jobData.salary.max,
        "salary.period": jobData.salary.period,
        "workDetails.commitment": jobData.workDetails.commitment,
        "workDetails.mode": jobData.workDetails.mode,
        "experience": jobData.experience,
        "gender": jobData.gender,
        "qualification": jobData.qualification,
        "careerLevel": jobData.careerLevel,
        "description": jobData.description,
        "keyResponsibilities": typeof jobData.keyResponsibilities === 'string' 
          ? jobData.keyResponsibilities.split(',').map(item => item.trim()) 
          : [], // Ensure it's an array
        "skillAndExperience": typeof jobData.skillAndExperience === 'string' 
          ? jobData.skillAndExperience.split(',').map(item => item.trim()) 
          : [], // Ensure it's an array
        "lastDateToApply": jobData.lastDateToApply,
      };

      await axios.put(
        `https://backend.akshayy.tech/job/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Success");
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 mt-24 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">Edit Job</h2>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={jobData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={jobData.location?.city || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'location', 'city')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={jobData.location?.state || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'location', 'state')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="pinCode"
        placeholder="Pin Code"
        value={jobData.location?.pinCode || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'location', 'pinCode')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="min"
        placeholder="Min Salary"
        value={jobData.salary?.min || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'salary', 'min')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="max"
        placeholder="Max Salary"
        value={jobData.salary?.max || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'salary', 'max')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="period"
        placeholder="Salary Period (e.g., monthly, annually)"
        value={jobData.salary?.period || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'salary', 'period')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="commitment"
        placeholder="Work Commitment"
        value={jobData.workDetails?.commitment || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'workDetails', 'commitment')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="mode"
        placeholder="Work Mode (e.g., remote, in-office)"
        value={jobData.workDetails?.mode || ''} // Optional chaining with default
        onChange={(e) => handleNestedChange(e, 'workDetails', 'mode')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="experience"
        placeholder="Experience Required"
        value={jobData.experience || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="gender"
        placeholder="Preferred Gender (if any)"
        value={jobData.gender || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="qualification"
        placeholder="Required Qualification"
        value={jobData.qualification || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="careerLevel"
        placeholder="Career Level"
        value={jobData.careerLevel || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={jobData.description || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="keyResponsibilities"
        placeholder="Key Responsibilities (comma-separated)"
        value={jobData.keyResponsibilities || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="skillAndExperience"
        placeholder="Required Skills and Experience (comma-separated)"
        value={jobData.skillAndExperience || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="lastDateToApply"
        value={jobData.lastDateToApply || ''} // Optional chaining with default
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpdate}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Update Job
      </button>
    </div>
  );
};

export default EditJob;
