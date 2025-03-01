import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header";
import Sidebar from "./AdminSidebar";

const TutorProfileView = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTutors();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300); // Debounce API call (300ms delay)

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]); // Auto-search on every searchQuery change

  const fetchTutors = async () => {
    try {
      const response = await axios.get(
        "https://server.avyudha.com/admin/getTutors",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTutors(response.data.tutors || []);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchTutors();
      return;
    }

    try {
      const response = await axios.get(
        `https://server.avyudha.com/admin/tutors/search?query=${searchQuery}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTutors(response.data || []);
    } catch (error) {
      console.error("Error searching tutors:", error);
    }
  };

  const handleEdit = (tutor) => {
    navigate(`/edit-tutor/${tutor._id}`);
  };

  const handleDeleteClick = async (tutorId) => {
    setSelectedStudentId(tutorId);
    try {
      await axios.post(
        "https://server.avyudha.com/admin/hardDeleteEntity",
        { entityType: "Tutor", entityId: tutorId },
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
        { entityType: "Tutor", entityId: selectedStudentId, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Tutor profile deleted successfully");
      setTutors((prev) => prev.filter((tutor) => tutor._id !== selectedStudentId));
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
                placeholder="Search tutors..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               </div>
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="overflow-x-auto md:ml-80">
            {tutors.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Full Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Tutor ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Contact Number
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor) => (
                    <tr key={tutor._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {tutor.fullName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tutor.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tutor._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tutor.contactNumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(tutor)}
                          className="text-white bg-[#285196] px-3 py-2 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tutor._id)}
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
              <p className="text-gray-500">No tutors found.</p>
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

export default TutorProfileView;
