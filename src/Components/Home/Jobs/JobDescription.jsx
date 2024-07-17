import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map'; // Import the Map component
import '../Home.css';

const JobDescription = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getjobs/${jobId}`);
        setJob(response.data); // Assuming response.data contains job details
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  const statusTag = job.tags.find(tag => tag.name === "open");
  const isActive = statusTag && statusTag.active;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#041F96] p-6 rounded-lg shadow-lg text-white flex flex-col sm:flex-row md:justify-between items-center mb-6">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <img src={job.images[0]} alt={job.title} className="w-full h-56 object-cover rounded-md" />
        </div>
        <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Location:</strong> {job.location.city}, {job.location.state} ({job.location.pinCode})</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Qualification:</strong> {job.qualification}</p>
            <p><strong>Career:</strong> {job.careerLevel}</p>
            <p><strong>Application Deadline:</strong> {new Date(job.lastDateToApply).toLocaleDateString()}</p>
            {isActive ? (
              <button
                onClick={openModal}
                className="bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 mt-2"
              >
                Apply
              </button>
            ) : (
              <p className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-semibold mx-auto -ml-1">
                Closed
              </p>
            )}
          </div>
        </div>
        <div className="md:w-1/4 flex flex-col items-end">
          {/* Additional content if needed */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="text-gray-600 md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
            <p className="text-black mb-4">{job.description}</p>
            <h2 className="text-xl font-semibold mb-2">Key Responsibilities</h2>
            <ul className="list-disc list-inside mb-4">
              {job.keyResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-6">Required Skills & Experience</h2>
            <ul className="list-disc list-inside mb-4">
              {job.skillAndExperience.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="md:w-2/5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Location</h2>
            <Map coordinates={job.location.coordinates} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
            <form>
              <input type="file" className="mb-4 w-full" />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
