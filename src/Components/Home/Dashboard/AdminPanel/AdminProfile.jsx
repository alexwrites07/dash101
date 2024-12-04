// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");  // Get token from localStorage
      try {
        const response = await axios.get(
          'https://server.avyudha.com/dashboard/Admin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 ">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <div className="space-y-2">
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Email Verified:</strong> {userData.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Recent Actions</h2>
        <ul className="space-y-4">
          {userData.actions.map((action, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Action:</strong> {action.action}</p>
              <p><strong>User Type:</strong> {action.userType}</p>
              <p><strong>Timestamp:</strong> {new Date(action.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
