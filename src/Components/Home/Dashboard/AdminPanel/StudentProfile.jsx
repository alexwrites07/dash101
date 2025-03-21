import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import Header from "../Header";
import Sidebar from "./AdminSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentProfileView = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "admin") {
      fetchStudents();
    }
  }, [token, userType, startDate, endDate]);

  const fetchStudents = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let url = "https://server.avyudha.com/admin/getStudents";

      // Append startDate and endDate if they exist
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const { data } = await axios.get(url, { headers });
      setAllStudents(data.students);
      setFilteredStudents(data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (!searchQuery.trim()) {
        setFilteredStudents(allStudents);
        return;
      }
      searchStudents();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, allStudents]);

  const searchStudents = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let url = `https://server.avyudha.com/admin/students/search?query=${searchQuery}`;

      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const { data } = await axios.get(url, { headers });
      setFilteredStudents(data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFilteredStudents([]);
    }
  };

  const handleEditClick = (studentId) => navigate(`/edit-student/${studentId}`);

  const handleDeleteClick = async (studentId) => {
    setSelectedStudentId(studentId);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const payload = { entityType: "Student", entityId: studentId };

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
      const headers = { Authorization: `Bearer ${token}` };
      const payload = {
        entityType: "Student",
        entityId: selectedStudentId,
        otp,
      };

      await axios.post(
        "https://server.avyudha.com/admin/verifyAndHardDeleteEntity",
        payload,
        { headers }
      );
      alert("Student profile deleted successfully");
      setAllStudents((prev) => prev.filter((s) => s._id !== selectedStudentId));
      setFilteredStudents((prev) => prev.filter((s) => s._id !== selectedStudentId));
      setIsOtpModalVisible(false);
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
          <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start date..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End date"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="overflow-x-auto md:ml-80">
            {filteredStudents.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Parent Phone</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Student Phone</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{student.fullName}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{student._id}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.parentPhone}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(student._id)}
                          className="text-white bg-[#285196] px-3 py-2 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student._id)}
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
              <p className="text-gray-500">No students found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;
