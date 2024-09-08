import React, { useState, useEffect } from 'react';
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";
import { FaMapMarkerAlt, FaPencilAlt, FaTimes, FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://backend.akshayy.tech/postedJobs', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleEditJob = (job) => {
    navigate(`/edit-job/`+job.job._id);
  };

  const handleRemoveJob = async (jobId) => {
    try {
      const response = await fetch(`https://backend.akshayy.tech/deleteJob/${jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(`Failed to delete the job: ${errorData.message || response.statusText}`);
      }
  
      // Update the job list after successful deletion
      setJobs((prevJobs) => prevJobs.filter((job) => job.job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleLockJob = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (job.job._id === jobId) {
        return { ...job, locked: !job.locked };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

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
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Applicants</th>
                    <th className="py-2 px-4 border-b">Created & Expired</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.job._id}>
                      <td className="py-2 px-4 border-b">
                        <p className="font-semibold">{job.job.title}</p>
                        {job.job.tags.find(tag => tag.active && tag.name === 'featured') && <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded-full ml-1">Featured</span>}
                        {job.job.tags.find(tag => tag.active && tag.name === 'urgent') && <span className="bg-red-200 text-red-800 px-2 py-1 text-sm rounded-full ml-1">Urgent</span>}
                        <p className="text-gray-600 flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-500" />
                          {`${job.job.location.city}, ${job.job.location.state}`}
                        </p>
                      </td>
                      <td className="py-2 px-4 border-b">{job.totalApplicants} Applicant(s)</td>
                      <td className="py-2 px-4 border-b">
                        Created: {new Date(job.job.createdAt).toLocaleDateString()}
                        <br />
                        Expiry date: {new Date(job.job.lastDateToApply).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{job.job.tags.find(tag => tag.active)?.name}</td>
                      <td className="py-2 px-4 border-b">
                        <button 
                            onClick={() => handleLockJob(job.job._id)}
                            className={`mr-2 ${job.locked ? 'text-green-600' : 'text-blue-600'} hover:${job.locked ? 'text-green-800' : 'text-blue-800'}`}
                          >
                            {job.locked ? <FaUnlock /> : <FaLock />}
                        </button>
                        <button onClick={() => handleEditJob(job)} className="mr-2 text-blue-500">
                            <FaPencilAlt />
                          </button>
                        <button onClick={() => handleRemoveJob(job.job._id)} className="text-blue-500">
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
