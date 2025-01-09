import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedJobsAndNeeds = () => {
  const [jobs, setJobs] = useState([]);
  const [learningNeeds, setLearningNeeds] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllNeeds, setShowAllNeeds] = useState(false);
  const maxVisibleItems = 4;

  useEffect(() => {
    // Fetch jobs and learning needs from the backend API
    const fetchData = async () => {
      try {
        const [jobsResponse, needsResponse] = await Promise.all([
          axios.get('https://server.avyudha.com/featured-jobs'),
          axios.get('https://server.avyudha.com/featured-needs'),
        ]);
        setJobs(jobsResponse.data);
        setLearningNeeds(needsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleShowMoreJobs = () => setShowAllJobs(!showAllJobs);
  const toggleShowMoreNeeds = () => setShowAllNeeds(!showAllNeeds);

  const visibleJobs = showAllJobs ? jobs.length : maxVisibleItems;
  const visibleNeeds = showAllNeeds ? learningNeeds.length : maxVisibleItems;

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      {/* <h1 className="text-4xl font-bold text-center mb-8 text-[#041F96]">Featured Sections</h1> */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Featured Jobs Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-[#041F96]">Featured Jobs</h2>
          {jobs.slice(0, visibleJobs).map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <Link to={`/getjobs/${job._id}`} className="block">
                <h3 className="text-xl font-semibold text-[#041F96] mb-2">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {job.location.city}, {job.location.state}
                </p>
                <p className="text-sm text-gray-600 mb-2">{job.experience} experience</p>
                <p className="text-sm text-gray-600 mb-2">
                  {job.salary.min} - {job.salary.max} {job.salary.period}
                </p>
                <p className="text-sm text-gray-600">Apply by: {new Date(job.lastDateToApply).toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
          <button
            className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#03357A] focus:outline-none"
            onClick={toggleShowMoreJobs}
          >
            {showAllJobs ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Featured Learning Needs Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-[#041F96]">Featured Learning Needs</h2>
          {learningNeeds.slice(0, visibleNeeds).map((need, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#041F96] mb-2">{need.requirement}</h3>
              <p className="text-sm text-gray-600 mb-2">{need.location.city}, {need.location.state}</p>
              <p className="text-sm text-gray-600 mb-2">{need.board} board</p>
              {/* <p className="text-sm text-gray-600 mb-2">Gender Preference: {need.genderPreference}</p> */}
              <p className="text-sm text-gray-600 mb-2">Available: {need.available}</p>
              <p className="text-sm text-gray-600">Start: {need.start}</p>
            </div>
          ))}
          <button
            className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#03357A] focus:outline-none"
            onClick={toggleShowMoreNeeds}
          >
            {showAllNeeds ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsAndNeeds;
