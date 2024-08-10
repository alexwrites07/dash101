import React, { useState } from 'react';
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import location icon from react-icons

const ManageJobs = () => {
  // Sample job data with additional tags
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Chemistry Tutor for IIT JEE',
      location: 'Patna',
      applicants: 2,
      createdDate: '2024-07-13',
      expiryDate: '2024-09-11',
      status: 'Published',
      featured: true, // Added featured status
      urgent: false, // Added urgent status
    },
    {
      id: 2,
      title: 'Physics Tutor for IIT JEE',
      location: 'Patna',
      applicants: 0,
      createdDate: '2024-07-02',
      expiryDate: '2024-08-11',
      status: 'Published',
      featured: false, // Added featured status
      urgent: true, // Added urgent status
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter and sort jobs based on search query and selected sort option
  const filteredJobs = jobs
    .filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else if (sortOption === 'oldest') {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
      return 0;
    });

  const handleLockJob = (jobId) => {
    console.log('Lock job:', jobId);
    // Implement lock job logic
  };

  const handleEditJob = (jobId) => {
    console.log('Edit job:', jobId);
    // Implement edit job logic
  };

  const handleRemoveJob = (jobId) => {
    console.log('Remove job:', jobId);
    // Implement remove job logic
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
                    <tr key={job.id}>
                      <td className="py-2 px-4 border-b">
                        <p className="font-semibold">{job.title}</p>
                        {job.featured && <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded-full ml-1">Featured</span>}
                        {job.urgent && <span className="bg-red-200 text-red-800 px-2 py-1 text-sm rounded-full ml-1">Urgent</span>}
                        <p className="text-gray-600 flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-500" />
                          {job.location}
                        </p>
                      </td>
                      <td className="py-2 px-4 border-b">{job.applicants} Applicant(s)</td>
                      <td className="py-2 px-4 border-b">
                        Created: {new Date(job.createdDate).toLocaleDateString()}
                        <br />
                        Expiry date: {new Date(job.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{job.status}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleLockJob(job.id)}
                          className="text-yellow-600 hover:text-yellow-800 mr-2"
                        >
                          🔒
                        </button>
                        <button
                          onClick={() => handleEditJob(job.id)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleRemoveJob(job.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✖
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
