import React, { useState, useEffect } from "react";
import { HiSearch, HiSortAscending } from "react-icons/hi";
import Header from "../Header";

import Sidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for making API requests

const EmployerProfileView = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedEmployers, setSelectedEmployers] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Store selected student for deletion

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [otp, setOtp] = useState(""); // Store OTP input
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false); // Control OTP modal
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "https://server.avyudha.com/admin/getOrgs",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the bearer token in headers
            },
          }
        );
        setOrganizations(response.data.organizations);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, [token]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addToSelected = (employer) => {
    setSelectedEmployers([...selectedEmployers, employer]);
    setOrganizations(organizations.filter((e) => e.name !== employer.name));
  };

  const removeFromSelected = (employer) => {
    setOrganizations([...organizations, employer]);
    setSelectedEmployers(
      selectedEmployers.filter((e) => e.name !== employer.name)
    );
  };

  // Function to handle edit button click
  const handleEdit = (id) => {
    navigate(`/edit-employer/${id}`); // Redirect to the edit page with the employer's ID
  };

  // Apply search filtering
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contactNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.website?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  // Sort organizations
  const sortedOrganizations = filteredOrganizations.sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
  const handleDeleteClick = async (studentId) => {
    setSelectedStudentId(studentId);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: "Organization",
        entityId: studentId,
      };

      await axios.post(
        "https://server.avyudha.com/admin/hardDeleteEntity",
        payload,
        { headers }
      );
      alert("OTP has been sent to your email."); // Notify the admin
      console.log(payload);
      setIsOtpModalVisible(true); // Show OTP input modal
    } catch (error) {
      console.error("Error sending delete request:", error);
    }
  };

  // Handle OTP verification and final deletion (Step 2: verify OTP and delete)
  const handleConfirmDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: "Organization",
        entityId: selectedStudentId,
        otp,
      };

      await axios.post(
        "https://server.avyudha.com/admin/verifyAndHardDeleteEntity",
        payload,
        { headers }
      );
      alert("Tutor profile deleted successfully");
      setAllStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== selectedStudentId)
      ); // Update UI
      setIsOtpModalVisible(false); // Hide OTP input modal
    } catch (error) {
      console.error("Error verifying OTP and deleting:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Header />
        <div className="flex justify-between w-full space-x-4 mb-6">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-4 justify-start">
            {/* <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center justify-center space-x-2 bg-[#285196] text-white px-4 py-2 rounded-md"
            >
              <HiSortAscending className="w-6 h-6" />
              <span>Sort</span>
            </button> */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search employers..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 w-full">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:ml-80">Selected Organizations</h2>
            {selectedEmployers.length > 0 ? (
              selectedEmployers.map((employer) => (
                <div
                  key={employer.name}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{employer.name}</h3>
                    <p className="text-gray-700 truncate">{employer.email}</p>
                    <p className="text-gray-700 truncate">{employer._id}</p>
                    <p className="text-gray-700 truncate">
                      {employer.contactNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(employer)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
            
          <div className="md:ml-80 overflow-x-auto">
            {sortedOrganizations.length > 0 ? (
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
                  {sortedOrganizations.map((org) => (
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
    </div>
  );
};

export default EmployerProfileView;