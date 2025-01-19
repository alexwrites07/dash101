import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ContactDashboard from "../ContactDashboard";
import { HiUser, HiStar, HiEye, HiBriefcase, HiBookmark, HiCheck } from "react-icons/hi";  // Use HiCheck instead of HiCheckCircle

const UserDashboard = () => {
  const [profileViews, setProfileViews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [type, setType] = useState(localStorage.getItem("type"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!type || !token) return;

    const fetchDashboardData = async () => {
      try {
        let url = "";
        let response;

        if (type === "student") {
          url = "https://server.avyudha.com/dashboard/Student";
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDashboardData({
            learningNeedsCount: response.data.learningNeeds?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            profileViewsCount: response.data.profileViews.count  || 0,
          });
        } else if (type === "tutor") {
          url = "https://server.avyudha.com/dashboard/Tutor";
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDashboardData({
            appliedJobsCount: response.data.appliedJobs?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            shortlistedJobsCount: response.data.shortlistedJobs?.length || 0,
            profileViewsCount: response.data.profileViews.count || 0,
          });
        } else if (type === "organization") {
          url = "https://server.avyudha.com/dashboard/Organization";
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDashboardData({
            jobPostingsCount: response.data.jobPostings?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            bookmarkedEmployeesCount: response.data.bookmarkedEmployees?.length || 0,
            profileViewsCount: response.data.profileViews.count  || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchNotifications = async () => {
      if (token) {
        try {
          const response = await axios.get("https://server.avyudha.com/notifications", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotifications(response.data || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchDashboardData();
    fetchNotifications();
    fetchProfileViews(); // Fetch profile views data
  }, [type, token]);

  const fetchProfileViews = async () => {
    const token = localStorage.getItem("token");
    let type = localStorage.getItem("type");

    if (type && token) {
      const endpointType = type + "s"; // Append 's' to the type
      try {
        const response = await axios.get(
          `https://server.avyudha.com/${endpointType}/whoViewedMyProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const viewsData = response.data.map((item) => {
          return item.name || item.fullName || "Unknown";
        });
        setProfileViews(viewsData);
      } catch (error) {
        console.error("Error fetching profile views:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="wallet-page min-h-screen lg:flex min-h-screen max-w-3xl lg:ml-64 py-8 px-4">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="mt-24 lg:ml-24 lg:mt-28 p-6 lg:p-10">
          <div className="flex flex-col lg:flex-col lg:space-x-8">
            {/* Dashboard Stats Section */}
            <div className="flex-1 bg-gradient-to-r mb-12 ml-8 from-blue-500 to-indigo-500 text-white p-8 rounded-lg mb-6 lg:mb-0 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              {type === "student" && (
                <>
                  <div className="flex items-center mb-6">
                    <HiUser className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Learning Needs</span>
                      <span className="block text-xl">{dashboardData.learningNeedsCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiStar className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Rating</span>
                      <span className="block text-xl">{dashboardData.ratingCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiEye className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Profile Views</span>
                      <span className="block text-xl">{dashboardData.profileViewsCount}</span>
                    </div>
                  </div>
                </>
              )}
              {type === "tutor" && (
                <>
                  <div className="flex items-center mb-6">
                    <HiBriefcase className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Applied Jobs</span>
                      <span className="block text-xl">{dashboardData.appliedJobsCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiStar className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Rating</span>
                      <span className="block text-xl">{dashboardData.ratingCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiCheck className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Shortlisted Jobs</span>
                      <span className="block text-xl">{dashboardData.shortlistedJobsCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiEye className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Profile Views</span>
                      <span className="block text-xl">{dashboardData.profileViewsCount}</span>
                    </div>
                  </div>
                </>
              )}
              {type === "organization" && (
                <>
                  <div className="flex items-center mb-6">
                    <HiBriefcase className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Job Postings</span>
                      <span className="block text-xl">{dashboardData.jobPostingsCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiStar className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Rating</span>
                      <span className="block text-xl">{dashboardData.ratingCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiBookmark className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Bookmarked Employees</span>
                      <span className="block text-xl">{dashboardData.bookmarkedEmployeesCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <HiEye className="text-3xl mr-4" />
                    <div>
                      <span className="text-lg font-semibold">Profile Views</span>
                      <span className="block text-xl">{dashboardData.profileViewsCount}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Views Section */}
            <div className="flex-1 bg-gradient-to-r mt-12 from-yellow-400 to-orange-500 text-white p-8 rounded-lg mb-6 lg:mb-0 shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-6">Who Viewed My Profile ({profileViews.length})</h2>
              {profileViews.length > 0 ? (
                <ul className="space-y-4">
                  {profileViews.map((view, index) => (
                    <li key={index} className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
                      {view}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No one has viewed your profile yet.</p>
              )}
            </div>

            {/* Notifications Section */}
            <div className="flex-1 bg-gradient-to-r mt-12 from-green-400 to-teal-500 text-white p-8 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6">Notifications ({notifications.length})</h2>
  {notifications.length > 0 ? (
    <ul>
      {notifications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest date
        .slice(0, 10) // Take the top 10 notifications
        .map((notif, index) => (
          <li
            key={index}
            className="bg-white text-gray-800 p-4 rounded-lg shadow-md mb-4"
          >
            <p>{notif.message}</p>
            <p className="text-sm text-gray-500">{formatDate(notif?.createdAt)}</p>
          </li>
        ))}
    </ul>
  ) : (
    <p>No notifications at the moment.</p>
  )}
</div>

          </div>
        </div>
        <div className="ml-36 my-4">
          <p className="text-2xl mb-6">Help and Support</p>
          <ContactDashboard/></div>
      </div>
    </div>
  );
};

export default UserDashboard;
