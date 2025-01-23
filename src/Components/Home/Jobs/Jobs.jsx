import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaChalkboardTeacher,FaCalendarAlt,FaMapMarkerAlt, FaRegCalendarAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
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

      AOS.init({
        duration: 1000, // Animation duration
        once: true,     // Trigger animation only once
      });
   
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
        <div className="flex justify-between items-start w-full">
          <a
    href="/jobpost" className="text-3xl font-bold mb-4 text-[#041F96]">Featured Jobs</a>
   </div>
          {jobs.slice(0, visibleJobs).map((job, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2x">
              <Link to={`/getjobs/${job._id}`} className="block">
              <div
      className=" rounded-lg p-6"
      data-aos="zoom-in" // Animation type
    >
      {/* Job Title */}
      <div className="flex items-center text-[#041F96] text-xl font-semibold mb-2">
        <FaBriefcase className="mr-2 text-[#041F96]" />
        <h3>{job.title}</h3>
      </div>

      {/* Job Location */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <p>
          {job.location.city}, {job.location.state}
        </p>
      </div>

      {/* Job Experience */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaClock className="mr-2 text-gray-600" />
        <p>{job.experience} experience</p>
      </div>

      {/* Job Salary */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaMoneyBillWave className="mr-2 text-gray-600" />
        <p>
          {job.salary.min} - {job.salary.max} {job.salary.period}
        </p>
      </div>

      {/* Application Deadline */}
      <div className="flex items-center text-gray-600 text-sm">
        <FaRegCalendarAlt className="mr-2 text-gray-600" />
        <p>Apply by: {new Date(job.lastDateToApply).toLocaleDateString()}</p>
      </div>
    </div></Link>
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
        <div className="flex justify-between items-start w-full">
          <a
    href="/needpost" className="text-3xl font-bold mb-4 text-[#041F96]">Featured Learning Needs</a>
       </div>
          {learningNeeds.slice(0, visibleNeeds).map((need, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2x">
              <Link to={`/getNeed/${need._id}`} className="block">
              <div
      className=" rounded-lg p-6"
      data-aos="zoom-in" // Animation type
    >
      {/* Requirement */}
      <div className="flex items-center text-[#041F96] text-xl font-semibold mb-2">
        <FaChalkboardTeacher className="mr-2 text-[#041F96]" />
        <h3>{need.requirement}</h3>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <p>
          {need.location.city}, {need.location.state}
        </p>
      </div>

      {/* Board */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaChalkboardTeacher className="mr-2 text-gray-600" />
        <p>{need.board} board</p>
      </div>

      {/* Availability */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaClock className="mr-2 text-gray-600" />
        <p>Available: {need.available}</p>
      </div>

      {/* Start Date */}
      <div className="flex items-center text-gray-600 text-sm">
        <FaCalendarAlt className="mr-2 text-gray-600" />
        <p>Start: {need.start}</p>
      </div>
    </div></Link>
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
