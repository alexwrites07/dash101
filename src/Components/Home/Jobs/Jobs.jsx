import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const maxVisibleJobs = 4;

  useEffect(() => {
    // Fetch jobs from the backend API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/featured-jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  const visibleJobs = showAll ? jobs.length : maxVisibleJobs;

  return (
    <div className="max-w-full mx-auto" style={{ margin: '6% 4% 0 4%' }}>
      <h2 className="text-3xl text-[#041F96] font-bold mb-4">Featured Jobs</h2>

      {/* Job Listings */}
      {jobs.slice(0, visibleJobs).map((job, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Link to={`/getjobs/${job._id}`} className="block">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold text-[#041F96] mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.location.city}, {job.location.state}</p>
              <p className="text-sm text-gray-600 mb-2">{job.experience} experience</p>
              <p className="text-sm text-gray-600 mb-2">{job.salary.min} - {job.salary.max} {job.salary.period}</p>
            </div>
            <div className="md:flex-1 flex justify-between mt-4 md:mt-0">
              <p className="text-sm text-gray-600">{job.workDetails.commitment}</p>
              <p className="text-sm text-gray-600">Apply by: {new Date(job.lastDateToApply).toLocaleDateString()}</p>
            </div>
          </div>
          </Link>
        </div>
      ))}

      {/* Show More / Show Less Button */}
      {!showAll && (
        <button
          className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
          onClick={toggleShowMore}
        >
          Show More
        </button>
      )}
      {showAll && (
        <button
          className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
          onClick={toggleShowMore}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default FeaturedJobs;
