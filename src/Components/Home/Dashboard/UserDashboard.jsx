import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaBriefcase, FaEye, FaStar, FaUserCheck, FaBell,FaBookmark,FaMoneyBillAlt,FaMapMarkerAlt } from 'react-icons/fa';

// Import necessary modules from Chart.js
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';

import { Line } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, // Register the CategoryScale for x-axis
  Title,
  Tooltip,
  Legend
);

// Sample data for the chart
const graphData = {
  labels: [
    'July 12, 2024',
    'July 14, 2024',
    'July 16, 2024',
    'July 18, 2024',
    'July 20, 2024',
    'July 22, 2024',
    'July 24, 2024',
    'July 26, 2024',
  ],
  datasets: [
    {
      label: 'Profile Views',
      data: [6, 1, 2, 0, 3, 0, 5, 1],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

// Options for the chart
const graphOptions = {
  scales: {
    x: {
      type: 'category', // Specify type as 'category' for x-axis
    },
    y: {
      beginAtZero: true,
    },
  },
};

const UserDashboard = () => {
  const statistics = {
    appliedJobs: 1,
    review: 0,
    views: 31,
    shortlisted: 2,
    profileViews: 0,
  };

  const notifications = [
    { message: 'You are invited to apply for the job Physics Tutor for IIT JEE.', time: '6 days ago' },
    { message: 'The application is undo approved on your job Chemistry Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
    { message: 'The application is approved on your job Chemistry Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
    { message: 'The application is removed on your job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
    { message: 'The application is approved on your job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '2 weeks ago' },
    { message: 'A new meeting is created on the job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '2 weeks ago' },
  ];

  const jobsAppliedRecently = [
    {
      user: 'vikashpanjiyar2000',
      jobTitle: 'Chemistry Tutor for IIT JEE',
      status: 'Pending',
      type: 'School Job',
      location: 'Patna',
      salary: '₹30,000 - ₹35,000 / month',
      urgency: 'Urgent',
      Time: 'Full Time',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header notificationCount={notifications.length} />

        <div className="lg:mt-12 lg:ml-64 p-2 lg:p-28 flex flex-col justify-center lg:justify-start">
          <div className="w-full">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
             
            {/* Application Statistics */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Applications Statistics</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
                      <FaBriefcase className="text-blue-500 text-2xl mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold">Applied Jobs</h3>
                        <p className="text-lg">{statistics.appliedJobs}</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
                      <FaStar className="text-blue-500 text-2xl mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold">Review</h3>
                        <p className="text-lg">{statistics.review}</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
                      <FaEye className="text-blue-500 text-2xl mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold">Views</h3>
                        <p className="text-lg">{statistics.views}</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
                      <FaUserCheck className="text-blue-500 text-2xl mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold">Shortlisted</h3>
                        <p className="text-lg">{statistics.shortlisted}</p>
                      </div>
                    </div>
                  </div>
                </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Graph and Stats) */}
              <div className="lg:col-span-2">
                {/* Profile Views Graph */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Your Profile Views</h2>
                  <Line data={graphData} options={graphOptions} />
                </div>
              </div>

              {/* Right Column (Notifications) */}
              <div className="lg:col-span-1">
                {/* Notifications */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                  {/* Add a fixed height and overflow-y for scrolling */}
                  <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <li key={index} className="bg-gray-100 p-3 rounded-lg flex items-start">
                        <FaBell className="text-blue-500 text-xl mr-4 mt-1" />
                        <div>
                          <p>{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

                {/* Jobs Applied Recently */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Jobs Applied Recently</h2>
                  <div className="space-y-4">
                    {jobsAppliedRecently.map((job, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-start">
                        {/* Profile Picture */}
                        <img src="https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                        
                        <div className="flex-1">
                          {/* Job Title and Status */}
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                            <span className={`text-sm ${job.status === 'Pending' ? 'bg-yellow-200' : 'bg-green-200'} rounded-full px-2 py-1`}>
                              {job.status}
                            </span>
                          </div>
                          {/* User Name */}
                          <p className="text-sm text-gray-600">{job.user}</p>
                          {/* Job Details */}
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <div className="flex items-center mr-4">
                              <FaBriefcase className="mr-1" /> {job.type}
                            </div>
                            <div className="flex items-center mr-4">
                              <FaMapMarkerAlt className="mr-1" /> {job.location}
                            </div>
                            <div className="flex items-center">
                              <FaMoneyBillAlt className="mr-1" /> {job.salary}
                            </div>
                          </div>
                          {/* Urgency */}
                          <div className="space-x-2">
                            <span className={`text-sm ${job.urgency.includes('Urgent') ? 'bg-red-200' : 'bg-blue-200'} rounded-full px-2 py-1 mt-2 inline-block`}>
                              {job.urgency}
                            </span>
                            <span className={`text-sm ${job.Time.includes('Full Time') ? 'bg-red-200' : 'bg-blue-200'} rounded-full px-2 py-1 mt-2 inline-block`}>
                              {job.Time}
                            </span>
                          </div>
                        </div>
                        
                        {/* Bookmark Component */}
                        <div className="ml-auto">
                          <FaBookmark className="w-6 h-6 text-gray-400 hover:text-blue-600 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
