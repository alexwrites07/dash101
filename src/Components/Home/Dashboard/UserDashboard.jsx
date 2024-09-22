import React, { useState, useEffect }  from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaBriefcase, FaEye, FaStar, FaUserCheck, FaBell, FaBookmark, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const statistics = {
    postedJobs: 1,
    review: 0,
    application: 31,
    shortlisted: 2,
    profileViews: 0,
  };

  // Calculate how many days ago a date is from now
   const calculateDaysAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const diffTime = Math.abs(now - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const endpoint = localStorage.getItem('type');
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://backend.akshayy.tech/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        
        // Sort notifications by the most recent first
        const sortedNotifications = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Add "time ago" field to each notification
        const notificationsWithTimeAgo = sortedNotifications.map((notification) => ({
          ...notification,
          timeAgo: `${calculateDaysAgo(notification.createdAt)} days ago`,
        }));

        setNotifications(notificationsWithTimeAgo);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const jobsAppliedRecently = [
    {
      job: 'Chemistry Tutor for IIT JEE',
      Title: 'vikashpanjiyar2000',
      status: 'Pending',
      type: 'School Job',
      location: 'Patna',
      salary: '₹30,000 - ₹35,000 / month',
      urgency: 'Urgent',
      Time: 'Full Time',
    },
  ];

  const profileViews = [
    {
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'John Doe',
      role: 'Tutor',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'Jane Smith',
      role: 'Employer',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/men/52.jpg',
      username: 'Mike Johnson',
      role: 'Student',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: 'Emily Brown',
      role: 'Tutor',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/men/73.jpg',
      username: 'David Wilson',
      role: 'Employer',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/women/23.jpg',
      username: 'Sophia Lee',
      role: 'Student',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/men/83.jpg',
      username: 'Chris Evans',
      role: 'Tutor',
    },
    {
      profilePic: 'https://randomuser.me/api/portraits/women/38.jpg',
      username: 'Anna Scott',
      role: 'Employer',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />

        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28  flex flex-col justify-center lg:justify-start">
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
                    <h3 className="text-xl font-semibold">Posted Jobs</h3>
                    <p className="text-lg">{statistics.postedJobs}</p>
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
                    <h3 className="text-xl font-semibold">Application</h3>
                    <p className="text-lg">{statistics.application}</p>
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
              {/* Left Column (Profile Views Card) */}
              <div className="lg:col-span-2">
                {/* Profile Views Card */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Total Number of Profile Views: 8</h2>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {profileViews.map((view, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-center">
                        <img src={view.profilePic} alt={`${view.username} Profile`} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h3 className="text-xl font-semibold">{view.username}</h3>
                          <p className="text-sm text-gray-600">{view.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Notifications) */}
              <div className="lg:col-span-1">
                {/* Notifications */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                  <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <li key={index} className="bg-gray-100 p-3 rounded-lg flex items-start">
                        <FaBell className="text-blue-500 text-xl mr-4 mt-1" />
                        <div>
                          <p>{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.timeAgo}</p>
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
                            <h3 className="text-xl font-semibold">{job.Title}</h3>
                            <span className={`text-sm ${job.status === 'Pending' ? 'bg-yellow-200' : 'bg-green-200'} rounded-full px-2 py-1`}>
                              {job.status}
                            </span>
                          </div>
                          {/* User Name */}
                          <p className="text-sm text-gray-600">{job.job}</p>
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
