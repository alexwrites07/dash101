import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaBriefcase, FaEye, FaStar, FaUserCheck, FaBell } from 'react-icons/fa';

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
      urgency: 'Full Time Urgent',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        <div className="mt-16 lg:mt-24 lg:ml-64 p-4 lg:p-28 flex flex-col justify-center lg:justify-start">
          <div className="w-full">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

            {/* Application Statistics */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Applications Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                {/* <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
                  <FaEye className="text-blue-500 text-2xl mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">Your Profile Views</h3>
                    <p className="text-lg">{statistics.profileViews}</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
              <ul className="space-y-2">
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

            {/* Jobs Applied Recently */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Jobs Applied Recently</h2>
              <div className="space-y-4">
                {jobsAppliedRecently.map((job, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                    <p><strong>User:</strong> {job.user}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p><strong>Type:</strong> {job.type}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Urgency:</strong> {job.urgency}</p>
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
