import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header";
import Sidebar from "./AdminSidebar";

const TutorProfileView = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
  }, [searchQuery, startDate, endDate]); // Auto-search on every searchQuery, startDate, or endDate change

  const fetchTutors = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let url = "https://server.avyudha.com/admin/getTutors"; // Changed endpoint to fetch teachers
  
      // Append startDate and endDate if they exist
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
  
      const { data } = await axios.get(url, { headers });
      setTutors(data.tutors); // Assuming the response contains 'tutors' array
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };
  

  const handleSearch = async () => {
    if (!searchQuery.trim() && !startDate && !endDate) {
      fetchTutors();
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const queryParams = new URLSearchParams();
  
      if (searchQuery.trim()) queryParams.append("query", searchQuery);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);
  
      const url = `https://server.avyudha.com/admin/getTutors?${queryParams.toString()}`;
  
      const response = await axios.get(url, { headers });
      setTutors(response.data.tutors || []);
    }catch (error) {
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
            {/* Search Field */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutors..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Date Filters */}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="overflow-x-auto md:ml-80">
            {tutors.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-center">Created</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Tutor ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Contact Number</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor) => (
                    <tr key={tutor._id} className="hover:bg-gray-50">
                       <td className="border border-gray-300 px-4 py-2">{new Date(tutor.createdAt).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})}</td>
                      <td className="border border-gray-300 px-4 py-2">{tutor.fullName}</td>
                      <td className="border border-gray-300 px-4 py-2">{tutor.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{tutor._id}</td>
                      <td className="border border-gray-300 px-4 py-2">{tutor.contactNumber}</td>
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
        </div>
      </div>
    </div>
  );
};

export default TutorProfileView;
