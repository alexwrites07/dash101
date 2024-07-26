import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppliedCompany = () => {
  const [appliedJobs, setAppliedJobs] = useState([
    { id: 1, jobTitle: 'Software Developer', company: 'Tech Co.', location: 'New York, NY', dateApplied: 'July 10, 2024', status: 'Under Review'},
    { id: 2, jobTitle: 'Graphic Designer', company: 'Design Studio', location: 'Los Angeles, CA', dateApplied: 'July 12, 2024', status: 'Interview Scheduled'},
    { id: 3, jobTitle: 'SEO Specialist', company: 'Digital Marketing Inc.', location: 'Chicago, IL', dateApplied: 'July 15, 2024', status: 'Rejected'},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const handleCancelApplication = (id) => {
    setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppliedJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === id) {
          return { ...job, previousStatus: job.status, status: newStatus };
        }
        return job;
      })
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredJobs = appliedJobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.dateApplied) - new Date(a.dateApplied);
    } else if (sortOption === 'oldest') {
      return new Date(a.dateApplied) - new Date(b.dateApplied);
    }
    return appliedJobs;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Applied Jobs</h1>
          <p className="text-lg mb-12 text-gray-700">List of companies where you have applied.</p>

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
            {sortedJobs.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-grey-100 text-grey">
                  <tr>
                    <th className="py-2 px-4 border-b">Job Title</th>
                    <th className="py-2 px-4 border-b">Date Applied</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="py-2 px-4 border-b">
                        <p className="font-semibold">{job.jobTitle}</p>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-600">{job.location}</p>
                      </td>
                      <td className="py-2 px-4 border-b">{job.dateApplied}</td>
                      <td className="py-2 px-4 border-b">
                        {job.status}
                        {job.previousStatus && (
                          <span className="ml-2 text-gray-500">(Old: {job.previousStatus})</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleCancelApplication(job.id)}
                          className="text-red-600 hover:text-red-800 mr-2"
                        >
                          &times;
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                        >
                          &#128065;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No applications submitted yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppliedCompany;
