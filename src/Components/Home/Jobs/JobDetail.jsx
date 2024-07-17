import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/jobs/${jobId}`);
        console.log('Job details:', response.data);
        setJob(response.data); // Assuming response.data contains job details
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="container mx-auto p-4">
      {job ? (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <img src={job.images[0]} alt="Company Logo" className="w-20 h-20 object-cover rounded-full" />
            <div>
              <p className="text-sm text-gray-600">{job.description}</p>
              <p className="text-sm text-gray-600">Location: {job.location.city}, {job.location.state} - {job.location.pinCode}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Key Responsibilities:</h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {job.keyResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Skills & Experience:</h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {job.skillAndExperience.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Experience: {job.experience}</p>
            <p className="text-sm text-gray-600">Career Level: {job.careerLevel}</p>
            <p className="text-sm text-gray-600">Qualification: {job.qualification}</p>
            <p className="text-sm text-gray-600">Salary: {job.salary}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobDetail;
