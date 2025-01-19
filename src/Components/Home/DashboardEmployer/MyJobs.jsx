import React, { useState, useEffect } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Header from "./HeaderEmployer";
import { FaMapMarkerAlt, FaPencilAlt, FaTimes, FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ManageJobs = (JobId) => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    salary: '',
    careerLevel: '',
    experience: '',
    gender: 'Any',
    qualificationInput: '',
    tags: [],
    location: '',
    city: '',
    state: '',
    pinCode: '',
    category: '',
  });
  const [jobIdToEdit, setJobIdToEdit] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch posted jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://server.avyudha.com/postedJobs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setJobs(response.data); // Assuming the jobs data is in response.data
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [token]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  // Fetch applicants function
  const fetchApplicants = async (jobId) => {
    try {
      const response = await axios.get(`https://server.avyudha.com/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // No need for `response.json()` as `axios` already parses the JSON response
      const data = response.data;
  
      setApplicants((prevData) => ({
        ...prevData,
        [jobId]: data.applicants, // Store applicants under the specific job ID
      }));
    } catch (error) {
      console.error("Error fetching applicants:", error);
      alert("Failed to fetch applicants. Please try again.");
    }
  };
  
  // Delete applicant function
  const deleteApplicant = async (applicantId,jobIdToEdit) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `https://server.avyudha.com/jobs/${jobIdToEdit}/applicants/${applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Applicant deleted successfully.Please refresh!");
      setApplicants(applicants.filter((applicant) => applicant._id !== applicantId)); // Update the UI
    } catch (error) {
      // console.error("Error deleting applicant:", error);
      // alert("Failed to delete applicant. Please try again.");
    }
  };
  // Handle sorting by date
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) =>
      job.job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.job.lastDateToApply) - new Date(a.job.lastDateToApply);
      } else if (sortOption === 'oldest') {
        return new Date(a.job.lastDateToApply) - new Date(b.job.lastDateToApply);
      }
      return 0;
    });

  // Fetch job details for editing
  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axios.get(`https://server.avyudha.com/getjobs/${jobIdToEdit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const job = response.data;
      setJobData({
        title: job.title,
        description: job.description,
        salary: job.salary,
        careerLevel: job.careerLevel,
        experience: job.experience,
        gender: job.gender,
        qualificationInput: job.qualificationInput,
        tags: job.tags,
        location: job.location,
        city: job.city,
        state: job.state,
        pinCode: job.pinCode,
        category: job.category,
      });
      setJobIdToEdit(jobId);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Handle updating job details
  const handleUpdateJob = async () => {
    try {
      const response = await axios.put(
        `https://server.avyudha.com/updateJob/${jobIdToEdit}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Job updated:', response.data);
      // After successful update, navigate back to the job management page
      navigate('/manage-jobs');
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  // Toggle job open/close status
  const handleLockJob = async (jobId) => {
    try {
      const response = await axios.patch(
        `https://server.avyudha.com/jobs/${jobId}/toggle-close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedJob = response.data.job;
      const updatedJobs = jobs.map((job) =>
        job.job._id === updatedJob._id ? { ...job, job: { ...job.job, isClosed: updatedJob.isClosed } } : job
      );
      setJobs(updatedJobs);
      console.log('Job status toggled:', response.data.message);
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  // Handle editing a job
  const handleEditJob = (jobId) => {
    fetchJobDetails(jobId); // Fetch the job details to populate the fields
    navigate(`/edit-job-employer/${jobId}`); // Navigate to the job edit page
  };

  // Handle removing a job
  const handleRemoveJob = async (jobId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this job?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`https://server.avyudha.com/deleteJob/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.job._id !== jobId));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Manage Jobs</h1>
          <p className="text-lg mb-12 text-gray-700">Manage and track your job listings.</p>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded-lg w-full lg:w-1/3"
              />
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-lg ml-4"
              >
                <option value="default">Sort by</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {filteredJobs.length > 0 ? (
              <table className="min-w-full bg-white">
                {/* <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Applicants</th>
                    <th className="py-2 px-4 border-b">Created & Expired</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead> */}
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.job._id}>
                      <td className="py-2 px-4 border-b">
                        <Link to={`/getjobs/${job.job._id}`} className="text-blue-500 hover:underline">
                          <p className="font-semibold">{job.job.title}</p>
                        </Link>
                        {job.job.tags.find(tag => tag.active && tag.name === 'featured') && <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded-full ml-1">Featured</span>}
                        {job.job.tags.find(tag => tag.active && tag.name === 'urgent') && <span className="bg-red-200 text-red-800 px-2 py-1 text-sm rounded-full ml-1">Urgent</span>}
                        <p className="text-gray-600 flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-500" />
                          {`${job.job.location.city}, ${job.job.location.state}`}
                        </p>
                      </td>
                      <td className="py-2 px-4 border-b">{job.totalApplicants} Applicant(s)</td>
                      <td className="py-2 px-4 border-b">
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                onClick={() => fetchApplicants(job.job._id)}
              >
                View Applicants
              </button>

              {applicants[job.job._id] && applicants[job.job._id].length > 0 && (
                <div className="mt-4 bg-gray-100 border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Applicants</h3>
                  <ul className="space-y-2">
                    {applicants[job.job._id].map((applicant, ind) => (
                      <li key={ind}>
                        <p>
                        
                        <Link to={`/getTutor/${applicant._id}`} className="block w-full text-blue-600">
                           {applicant.fullName}
                          </Link>
                        </p>
                        <button
                className="mt-2 bg-red-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                onClick={() => deleteApplicant(applicant._id,job.job._id)}
              >
                Reject Applicant
              </button>
                        {/* <p>
                          <strong>Description:</strong> {applicant.description}
                        </p> */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </td>

                      <td className="py-2 px-4 border-b">{job.job.isClosed ? 'Closed' : 'Open'}</td>
                      <td className="py-2 px-4 border-b flex items-center">
                        <button 
                          onClick={() => handleLockJob(job.job._id)}
                          className={`mr-2 ${job.job.isClosed ? 'text-green-600' : 'text-blue-600'} hover:${job.job.isClosed ? 'text-green-800' : 'text-blue-800'}`}
                          title={job.job.isClosed ? 'Open' : 'Close'}
                        >
                          {job.job.isClosed ? <FaUnlock /> : <FaLock />}
                        </button>
                        <button 
                          onClick={() => handleEditJob(job.job._id)}
                          className="text-yellow-500 hover:text-yellow-800 mr-2"
                          title="Edit"
                        >
                          <FaPencilAlt />
                        </button>
                        <button 
                          onClick={() => handleRemoveJob(job.job._id)}
                          className="text-blue-500"
                          title="Delete"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No jobs found.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
