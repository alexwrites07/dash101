import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import axios from 'axios';

const JobsView = () => {
  const [allJobs, setAllJobs] = useState([]); // Initially, no jobs
  const [acceptedJobs, setAcceptedJobs] = useState([]); // Initially no accepted jobs
  const [declinedJobs, setDeclinedJobs] = useState([]); // Initially no declined jobs
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyMzgyMDM4NH0.oqjrMP1XvsPhYn2dKpDX4AE8rxC9ZlVWlqzBP7URnHM'; // Replace with your actual token

  // Fetch jobs from the API endpoint when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedJobs = response.data.jobs.map((job) => ({
          id: job._id,
          name: job.title,
          company: job.location.city,
          datePosted: job.lastDateToApply,
          isClosed: job.isClosed, // Added isClosed field
          applicantId: 'fakeApplicantId', // Placeholder for applicantId (replace with actual)
          jobId: job._id,
        }));

        setAllJobs(fetchedJobs);
        setAcceptedJobs(fetchedJobs.filter((job) => !job.isClosed)); // Only open jobs
        setDeclinedJobs(fetchedJobs.filter((job) => job.isClosed)); // Only closed jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Toggle job close/open status
  const toggleJobStatus = async (jobId) => {
    try {
      const response = await axios.patch(
        `https://backend.akshayy.tech/jobs/${jobId}/toggle-close`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message); // Log success message

      // Update the job status locally
      const updatedJob = response.data.job;
      const updatedJobs = allJobs.map((job) =>
        job.id === updatedJob._id ? { ...job, isClosed: updatedJob.isClosed } : job
      );
      setAllJobs(updatedJobs);
      setAcceptedJobs(updatedJobs.filter(job => !job.isClosed)); // Open jobs in accepted section
      setDeclinedJobs(updatedJobs.filter(job => job.isClosed)); // Closed jobs in declined section
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  const handleDecline = (job) => {
    toggleJobStatus(job.id); // Toggle status to "closed"
  };

  const handleAccept = (job) => {
    toggleJobStatus(job.id); // Toggle status to "open"
  };

  const filteredAcceptedJobs = acceptedJobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeclinedJobs = declinedJobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedJobs = filteredAcceptedJobs.sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.datePosted) - new Date(b.datePosted);
    } else {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }
  });

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <HiSortAscending className="w-6 h-6" />
            <span>Sort by Date</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job name..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          {/* Accepted Jobs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Accepted Jobs (Open)</h2>
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.name}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-gray-700">{new Date(job.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDecline(job)} // Move job to Declined (close)
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Close Job
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No accepted jobs.</p>
            )}
          </div>

          {/* Declined Jobs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Declined Jobs (Closed)</h2>
            {filteredDeclinedJobs.length > 0 ? (
              filteredDeclinedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.name}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-gray-700">{new Date(job.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleAccept(job)} // Move job to Accepted (open)
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Reopen Job
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No declined jobs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsView;
