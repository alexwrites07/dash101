import React, { useState, useEffect } from "react";
import { HiSearch, HiSortAscending } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To handle navigation
import Header from "../Header";
import Sidebar from "./AdminSidebar";

const TutorProfileView = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Store selected student for deletion
  const [otp, setOtp] = useState(""); // Store OTP input
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false); // Control OTP modal
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://server.avyudha.com/admin/getTutors",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTutors(data.tutors || []);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  const addToSelected = (tutor) => {
    // Instead of adding to selected, navigate to edit page
    navigate(`/edit-tutor/${tutor._id}`); // Redirect to edit page with tutor ID
  };

  const removeFromSelected = (tutor) => {
    setSelectedTutors(
      selectedTutors.filter((selected) => selected._id !== tutor._id)
    );
  };

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.contactNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor._id.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const sortedTutors = filteredTutors.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return b.fullName.localeCompare(a.fullName);
    }
  });
  const handleDeleteClick = async (studentId) => {
    setSelectedStudentId(studentId);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: "Tutor",
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
        entityType: "Tutor",
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
        <div className="flex w-full justify-between space-x-4 mb-6">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          <div className="md:w-3/4 w-full flex flex-col md:flex-row justify-start gap-4">
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutors..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="overflow-x-auto md:ml-80">
            {sortedTutors.length > 0 ? (
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
                    {/* <th className="border border-gray-300 px-4 py-2 text-left">
                      Balance
                    </th> */}
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Contact Number
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTutors.map((tutor) => (
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
                      {/* <td className="border border-gray-300 px-4 py-2">
                        {tutor.balance}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {tutor.contactNumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => addToSelected(tutor)}
                          className="text-white bg-[#285196] px-3 py-2 rounded-md mr-2"
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
              <p className="text-gray-500">No tutors.</p>
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