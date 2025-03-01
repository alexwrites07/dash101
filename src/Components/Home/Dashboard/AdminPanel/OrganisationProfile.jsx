import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import Header from "../Header";
import Sidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerProfileView = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [otp, setOtp] = useState(""); 
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "https://server.avyudha.com/admin/organizations/search?query=999",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, [token]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEdit = (id) => {
    navigate(`/edit-employer/${id}`);
  };

  const handleDeleteClick = async (employerId) => {
    setSelectedEmployerId(employerId);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: "Organization",
        entityId: employerId,
      };

      await axios.post(
        "https://server.avyudha.com/admin/hardDeleteEntity",
        payload,
        { headers }
      );
      alert("OTP has been sent to your email.");
      setIsOtpModalVisible(true);
    } catch (error) {
      console.error("Error sending delete request:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: "Organization",
        entityId: selectedEmployerId,
        otp,
      };

      await axios.post(
        "https://server.avyudha.com/admin/verifyAndHardDeleteEntity",
        payload,
        { headers }
      );
      alert("Employer profile deleted successfully");
      setOrganizations((prev) =>
        prev.filter((org) => org._id !== selectedEmployerId)
      );
      setIsOtpModalVisible(false);
    } catch (error) {
      console.error("Error verifying OTP and deleting:", error);
    }
  };

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contactNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.website?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Header />
        <div className="flex justify-between w-full space-x-4 mb-6">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-4 justify-start">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search employers..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="md:ml-96 overflow-x-auto ">
          {filteredOrganizations.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Organization Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Organization ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Contact Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Website
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org) => (
                  <tr key={org._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {org.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {org.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {org._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {org.contactNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {org.website}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-2">
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
            <p className="text-gray-500">No Organizations.</p>
          )}
        </div>

        {isOtpModalVisible && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Enter OTP to confirm deletion
              </h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOtpModalVisible(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfileView;
