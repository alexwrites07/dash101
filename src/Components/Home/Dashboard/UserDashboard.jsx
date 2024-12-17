import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Dummy Sidebar Component


// Main Component
const UserDashboard = () => {
  const [profileViews, setProfileViews] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch Profile Views
    const fetchProfileViews = async () => {
      const token = localStorage.getItem("token");
      let type = localStorage.getItem("type");
      console.log(type);

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
          // Extract name or fullName
          const viewsData = response.data.map((item) => {
            return item.name || item.fullName || "Unknown";
          });
          setProfileViews(viewsData);
        } catch (error) {
          console.error("Error fetching profile views:", error);
        }
      }
    };

    // Fetch Notifications
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "https://server.avyudha.com/notifications",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotifications(response.data || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchProfileViews();
    fetchNotifications();
  }, []);
  return (
    <div className="wallet-page min-h-screen lg:flex min-h-screen max-w-5xl lg:ml-64 py-8 px-4">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="mt-24 lg:ml-24 lg:mt-28 p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Who Viewed My Profile */}
            <div className="flex-1 bg-white p-4 md mb-6 lg:mb-0">
              <h2 className="text-xl font-semibold mb-4">
                Who Viewed My Profile ({profileViews.length})
              </h2>
              {profileViews.length > 0 ? (
                <ul>
                  {profileViews.map((view, index) => (
                    <li
                      key={index}
                      className="border-b py-2 text-gray-700 hover:text-blue-500"
                    >
                      {view}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No one has viewed your profile yet.</p>
              )}
            </div>

            {/* Notifications */}
            <div className="flex-1 bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-semibold mb-4">Notifications ({notifications.length})</h2>
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((notif, index) => (
                    <li
                      key={index}
                      className="border-b py-2 text-gray-700 hover:text-blue-500"
                    >
                      {notif.message}
                      <div className="text-sm text-gray-500">
                        {notif?.createdAt?.split("T")[0] }
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
