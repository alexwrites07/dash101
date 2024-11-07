import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Map from '../../MapDemo';

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [jobData, setJobData] = useState({
    title: '',
    location: {
      city: '',
      state: '',
      pinCode: '',
      coordinates: ['0', '0'],
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
    contactCost: 0,
    description: '',
    keyResponsibilities: '',
    skillAndExperience: '',
    lastDateToApply: '',
    maxApplicants: 0, // New field for max applicants
    isClosed: false,
    employer: '',
    jobCategories: [], // jobCategories is now an array of strings
    applicants: [],
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getjobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const applicants = response.data.job.applicants?.map((applicant) => applicant._id || 'Unknown');
        setJobData(response.data.job);
        const fetchedCoordinates = response.data.job.location?.coordinates;
        if (fetchedCoordinates && fetchedCoordinates.length === 2) {
          setCoordinates([parseFloat(fetchedCoordinates[0]), parseFloat(fetchedCoordinates[1])]);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
    console.log(coordinates);
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      jobCategories: value.split(',').map((item) => item.trim()), // Convert the comma-separated string to an array
    }));
  };
  const handleApplicantsChange = (e) => {
    const { value } = e.target;
    const applicantsList = value.split(',').map((item) => item.trim()); // Each applicant is entered as a comma-separated list
    setJobData((prevData) => ({
      ...prevData,
      applicants: applicantsList,  // Store as an array of strings (names/emails)
    }));
  };
  
  const handleMapChange = (updatedCoordinates) => {
    setCoordinates(updatedCoordinates);  
    setJobData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: updatedCoordinates,
      },
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

  const handleCoordinatesChange = (index, value) => {
    const updatedCoordinates = [...jobData.location.coordinates];
    updatedCoordinates[index] = value;
    setJobData((prevData) => ({
      ...prevData,
      location: { ...prevData.location, coordinates: updatedCoordinates },
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
        "contactCost": jobData.contactCost,
        "description": jobData.description,
        "lastDateToApply": jobData.lastDateToApply,
        "maxApplicants": jobData.maxApplicants,
        "isClosed": jobData.isClosed,
        "employer": jobData.employer,
        "jobCategories": jobData.jobCategories, // Include jobCategories array
        "applicants": jobData.applicants, // Include applicants field
      };

      await axios.put(
        `https://backend.akshayy.tech/job/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Job updated successfully");
      
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 mt-24 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">Edit Job</h2>
      <label className="block font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={jobData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Location Fields */}
      <label className="block font-medium text-gray-700">City</label>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={jobData.location.city || ''}
        onChange={(e) => handleNestedChange(e, 'location', 'city')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">State</label>
      <input
        type="text"
        name="state"
        placeholder="State"
        value={jobData.location.state || ''}
        onChange={(e) => handleNestedChange(e, 'location', 'state')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Pincode</label>
      <input
        type="text"
        name="pinCode"
        placeholder="Pin Code"
        value={jobData.location.pinCode || ''}
        onChange={(e) => handleNestedChange(e, 'location', 'pinCode')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block">
          Coordinates :
          <input
            type="text"
            name="location.coordinates"
            value={
              jobData.location?.coordinates
                ? `${jobData.location.coordinates[0]}, ${jobData.location.coordinates[1]}`
                : ''
            }
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));
              setJobData(prevData => ({
                ...prevData,
                location: {
                  ...prevData.location,
                  coordinates: [lat, lng],
                },
              }));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      
      {/* <Map
  coordinates={coordinates}
  onCoordinatesChange={handleMapChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  style={{ width: '100%', height: '500px',margin:'-900px' }} // Adjust the height as needed
/> */}

      {/* Salary Fields */}
      <label className="block font-medium text-gray-700">Min Salary</label>
      <input
        type="number"
        name="min"
        placeholder="Min Salary"
        value={jobData.salary.min || ''}
        onChange={(e) => handleNestedChange(e, 'salary', 'min')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Max Salary</label>
      <input
        type="number"
        name="max"
        placeholder="Max Salary"
        value={jobData.salary.max || ''}
        onChange={(e) => handleNestedChange(e, 'salary', 'max')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Period</label>
      <input
        type="text"
        name="period"
        placeholder="Salary Period (e.g., monthly)"
        value={jobData.salary.period || ''}
        onChange={(e) => handleNestedChange(e, 'salary', 'period')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Work Details Fields */}
      <label className="block font-medium text-gray-700">Work Commitment</label>
      <input
        type="text"
        name="commitment"
        placeholder="Commitment Level"
        value={jobData.workDetails.commitment || ''}
        onChange={(e) => handleNestedChange(e, 'workDetails', 'commitment')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Work Mode</label>
      <input
        type="text"
        name="mode"
        placeholder="Work Mode (e.g., remote)"
        value={jobData.workDetails.mode || ''}
        onChange={(e) => handleNestedChange(e, 'workDetails', 'mode')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Other Fields */}
      <label className="block font-medium text-gray-700">Experience</label>
      <input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={jobData.experience}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">gender</label>
      <input
        type="text"
        name="gender"
        placeholder="Gender Requirement"
        value={jobData.gender}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <label className="block font-medium text-gray-700">Categories</label>
       <input
          type="text"
          name="jobCategories"
          value={jobData.jobCategories?.join(', ')||''}
          onChange={handleCategoryChange}
          placeholder="Job Categories (comma separated)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
     
        />
    

      <label className="block font-medium text-gray-700">Qualification</label>
      <input

        type="text"
        name="qualification"
        placeholder="Qualification"
        value={jobData.qualification}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Designation</label>
      <input
        type="text"
        name="careerLevel"
        placeholder="Designation"
        value={jobData.careerLevel}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Contact Cost, Max Applicants, and Close Status */}
      <label className="block font-medium text-gray-700">Contact Cost</label>
      <input
        type="number"
        name="contactCost"
        placeholder="Contact Cost"
        value={jobData.contactCost}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block font-medium text-gray-700">Maximum Applicant</label>
      <input
        type="number"
        name="maxApplicants"
        placeholder="Max Applicants"
        value={jobData.maxApplicants}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    

      {/* Description, Key Responsibilities, Skills and Experience */}
      <label className="block font-medium text-gray-700">Description</label>
      <textarea
        name="description"
        placeholder="Job Description"
        value={jobData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
   <label className="block font-medium text-gray-700">Employer Id</label>

      {/* Employer Field */}
      <input
        type="text"
        name="employer"
        placeholder="Employer Id"
        value={jobData.employer}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleUpdate}
        className="px-6 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Job
      </button>
    </div>
  );
};

export default EditJob;
