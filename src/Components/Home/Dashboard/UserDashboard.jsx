import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ContactDashboard from "../ContactDashboard";
import { HiUser, HiStar, HiEye, HiBriefcase, HiBookmark, HiCheck } from "react-icons/hi";

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
        let url = `https://server.avyudha.com/dashboard/${type}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (type === "student") {
          setDashboardData({
            learningNeedsCount: response.data.learningNeeds?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            profileViewsCount: response.data.profileViews?.count || 0,
          });
        } else if (type === "tutor") {
          setDashboardData({
            appliedJobsCount: response.data.appliedJobs?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            shortlistedJobsCount: response.data.shortlistedJobs?.length || 0,
            profileViewsCount: response.data.profileViews?.count || 0,
          });
        } else if (type === "organization") {
          setDashboardData({
            jobPostingsCount: response.data.jobPostings?.length || 0,
            ratingCount: response.data.ratingCount || 0,
            bookmarkedEmployeesCount: response.data.bookmarkedEmployees?.length || 0,
            profileViewsCount: response.data.profileViews?.count || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://server.avyudha.com/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchProfileViews = async () => {
      try {
        const response = await axios.get(
          `https://server.avyudha.com/${type}s/whoViewedMyProfile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfileViews(response.data.map((item) => item.name || item.fullName || "Unknown"));
      } catch (error) {
        console.error("Error fetching profile views:", error);
      }
    };

    fetchDashboardData();
    fetchNotifications();
    fetchProfileViews();
  }, [type, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen flex  from-gray-100 max-w-5xl mt-12 lg:ml-64 ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="mt-24 p-8 lg:p-12 text-black">
          <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {type === "student" && (
    <>
      <DashboardCard icon={<HiUser />} title="Learning Needs" count={dashboardData.learningNeedsCount} />
      <DashboardCard icon={<HiStar />} title="Rating" count={dashboardData.ratingCount} />
      <DashboardCard icon={<HiEye />} title="Profile Views" count={dashboardData.profileViewsCount} />
    </>
  )}
  {type === "tutor" && (
    <>
      <DashboardCard icon={<HiBriefcase />} title="Applied Jobs" count={dashboardData.appliedJobsCount} />
      <DashboardCard icon={<HiStar />} title="Rating" count={dashboardData.ratingCount} />
      <DashboardCard icon={<HiCheck />} title="Shortlisted Jobs" count={dashboardData.shortlistedJobsCount} />
      <DashboardCard icon={<HiEye />} title="Profile Views" count={dashboardData.profileViewsCount} />
    </>
  )}
  {type === "organization" && (
    <>
      <DashboardCard icon={<HiBriefcase />} title="Job Postings" count={dashboardData.jobPostingsCount} />
      <DashboardCard icon={<HiStar />} title="Rating" count={dashboardData.ratingCount} />
      <DashboardCard icon={<HiBookmark />} title="Bookmarked Employees" count={dashboardData.bookmarkedEmployeesCount} />
      <DashboardCard icon={<HiEye />} title="Profile Views" count={dashboardData.profileViewsCount} />
    </>
  )}
</div>


          {/* Profile Views Section */}
          <DashboardSection title={`Who Viewed My Profile (${profileViews.length})`}bgColor="bg-blue-100" >
            {profileViews.length > 0 ? (
              <ul className="space-y-4">
                {profileViews.map((view, index) => (
                  <li key={index} className="bg-white text-gray-800 p-4 rounded-lg shadow-md">{view}</li>
                ))}
              </ul>
            ) : (
              <p>No one has viewed your profile yet.</p>
            )}
          </DashboardSection>

          {/* Notifications Section */}
          <DashboardSection title={`Notifications (${notifications.length})`} bgColor="bg-blue-100">
            {notifications.length > 0 ? (
              <ul>
                {notifications.slice(0, 10).map((notif, index) => (
                  <li key={index} className="bg-white text-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <p>{notif.message}</p>
                    <p className="text-sm text-gray-500">{formatDate(notif.createdAt)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications at the moment.</p>
            )}
          </DashboardSection>

          {/* Help & Support */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Help and Support</h2>
            <ContactDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components for Dashboard UI
const DashboardCard = ({ icon, title, count }) => (
  <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center border border-blue-300">
    <div className="text-4xl text-blue-700 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      <p className="text-2xl font-bold text-blue-800">{count}</p>
    </div>
  </div>
);


const DashboardSection = ({ title, children, bgColor }) => (
  <div className={`mt-12 p-8 rounded-lg shadow-lg ${bgColor}`}>
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {children}
  </div>
);

export default UserDashboard;
