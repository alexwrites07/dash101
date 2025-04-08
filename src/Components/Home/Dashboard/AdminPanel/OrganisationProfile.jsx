import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./AdminSidebar";

const OrgProfileView = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(""); // New state for start date
  const [endDate, setEndDate] = useState(""); // New state for end date

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
      fetchOrganizations();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, startDate, endDate]);

  const fetchOrganizations = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await axios.get(
        `https://server.avyudha.com/admin/getOrgs?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrganizations(response.data.organizations || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleSearch = async () => {
    let url = "";
    const queryParams = new URLSearchParams();
    try
    {
      const headers = { Authorization: `Bearer ${token}` };
      let url = "";
      const queryParams = new URLSearchParams();
    
      if (searchQuery.trim()) {
        // Use search endpoint and append query directly
        queryParams.append("query", searchQuery);
        url = `https://server.avyudha.com/admin/organizations/search?${queryParams.toString()}`;
      }
    
      const response = await axios.get(url, { headers });
      setOrganizations(response.data || []);
      
    }  catch (error) {
      console.error("Error searching organizations:", error);
    }
  };

  const handleEdit = (org) => {
    navigate(`/edit-employer/${org}`);
  };

  const handleDeleteClick = async (orgId) => {
    setSelectedOrgId(orgId);
    try {
      await axios.post(
        "https://server.avyudha.com/admin/hardDeleteEntity",
        { entityType: "Organization", entityId: orgId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("OTP has been sent to your email.");
      setIsOtpModalVisible(true);
    } catch (error) {
      console.error("Error sending delete request:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.post(
        "https://server.avyudha.com/admin/verifyAndHardDeleteEntity",
        { entityType: "Organization", entityId: selectedOrgId, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Organization profile deleted successfully");
      setOrganizations((prev) => prev.filter((org) => org._id !== selectedOrgId));
      setIsOtpModalVisible(false);
    } catch (error) {
      console.error("Error verifying OTP and deleting:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Header />
        <div className="flex w-full justify-between space-x-4 mb-6">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          <div className="md:w-3/4 w-full flex flex-col md:flex-row justify-start gap-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search organizations..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="overflow-x-auto md:ml-80">
            {organizations.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-center">Created</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Organization ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Contact Number</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org._id} className="hover:bg-gray-50">
                                   <td className="border border-gray-300 px-4 py-2">{new Date(org.createdAt).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})}</td>
                      <td className="border border-gray-300 px-4 py-2">{org.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{org.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{org._id}</td>
                      <td className="border border-gray-300 px-4 py-2">{org.contactNumber}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(org._id)}
                          className="text-white bg-[#285196] px-3 py-2 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(org._id)}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No organizations found.</p>
            )}
          </div>

          {isOtpModalVisible && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Enter OTP to confirm deletion</h2>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
                />
                <div className="flex justify-end space-x-4">
                  <button onClick={() => setIsOtpModalVisible(false)} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                  <button onClick={handleConfirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Confirm Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgProfileView;
