import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      // Fetching user data (Admin Profile)
      try {
        const response = await axios.get("https://server.avyudha.com/dashboard/Admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      // Fetching analytics data
      try {
        const analyticsResponse = await axios.get("https://server.avyudha.com/admin/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalyticsData(analyticsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData || !analyticsData) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-4xl font-semibold">Analytics</h3><br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Active Tutors</h3>
          <p className="text-3xl font-bold mt-4">{analyticsData.activeTutors}</p>
        </div>
        <div className="bg-green-500 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Active Students</h3>
          <p className="text-3xl font-bold mt-4">{analyticsData.activeStudents}</p>
        </div>
        <div className="bg-yellow-500 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Active Organizations</h3>
          <p className="text-3xl font-bold mt-4">{analyticsData.activeOrganizations}</p>
        </div>
        <div className="bg-purple-500 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Jobs Posted</h3>
          <p className="text-3xl font-bold mt-4">{analyticsData.jobs}</p>
        </div>
        <div className="bg-red-500 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Learning Needs</h3>
          <p className="text-3xl font-bold mt-4">{analyticsData.learningNeeds}</p>
        </div>

        {/* Growth Section */}
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-6 rounded-lg text-white shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-2xl font-semibold">Growth Metrics</h3>
          <div className="space-y-4 mt-4">
            <p>
              <strong>Tutor Growth:</strong> {analyticsData.growth.tutorGrowth}
            </p>
            <p>
              <strong>Student Growth:</strong> {analyticsData.growth.studentGrowth}
            </p>
            <p>
              <strong>Organization Growth:</strong> {analyticsData.growth.organizationGrowth}
            </p>
          </div>
        </div>
      </div><br></br><br></br>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* User Info Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Info</h2>
        <div className="space-y-2">
          <p>
            <strong>Full Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Email Verified:</strong> {userData.emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Recent Actions Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Actions</h2>
        <ul className="space-y-4">
          {userData.actions.map((action, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Action:</strong> {action.action}
              </p>
              <p>
                <strong>User Type:</strong> {action.userType}
              </p>
              <p>
                <strong>Timestamp:</strong> {new Date(action.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Analytics Section */}
      
    </div>
  );
};

export default AdminProfile;
