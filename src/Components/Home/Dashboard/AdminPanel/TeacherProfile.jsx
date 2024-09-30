import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import Header from '../Header';
import Sidebar from './AdminSidebar';

const TutorProfileView = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Store selected student for deletion
  const [otp, setOtp] = useState(''); // Store OTP input
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false); // Control OTP modal
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://backend.akshayy.tech/admin/getTutors', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
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
    setSelectedTutors(selectedTutors.filter(selected => selected._id !== tutor._id));
  };

  const filteredTutors = tutors.filter(tutor =>
    tutor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTutors = filteredTutors.sort((a, b) => {
    if (sortOrder === 'asc') {
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
        entityType: 'Tutor',
        entityId: studentId,
      };

      await axios.post('https://backend.akshayy.tech/admin/hardDeleteEntity', payload, { headers });
      alert('OTP has been sent to your email.'); // Notify the admin
      console.log (payload);
      setIsOtpModalVisible(true); // Show OTP input modal
    } catch (error) {
      console.error('Error sending delete request:', error);
    }
  };

  // Handle OTP verification and final deletion (Step 2: verify OTP and delete)
  const handleConfirmDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: 'Tutor',
        entityId: selectedStudentId,
        otp,
      };
     
      await axios.post('https://backend.akshayy.tech/admin/verifyAndHardDeleteEntity', payload, { headers });
      alert('Tutor profile deleted successfully');
      setAllStudents((prevStudents) => prevStudents.filter((student) => student._id !== selectedStudentId)); // Update UI
      setIsOtpModalVisible(false); // Hide OTP input modal
    } catch (error) {
      console.error('Error verifying OTP and deleting:', error);
    }
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <HiSortAscending className="w-6 h-6" />
            <span>Sort</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutors..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            {/* <h2 className="text-2xl font-semibold">Selected Tutors</h2> */}
            {selectedTutors.length > 0 ? (
              selectedTutors.map(tutor => (
                <div key={tutor._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{tutor.fullName}</h3>
                    <p className="text-gray-700 truncate">{tutor.email}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(tutor)}
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

          <div className="space-y-4">
            {/* <h2 className="text-2xl font-semibold">Unselected Tutors</h2> */}
            {sortedTutors.length > 0 ? (
              sortedTutors.map(tutor => (
                <div key={tutor._id} className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{tutor.fullName}</h3>
                    <h3 className="text-lg font-medium">{tutor.email}</h3>
                    <button
                      onClick={() => addToSelected(tutor)} // Navigate to edit on click
                      className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(tutor._id)} // Handle deletion
                      className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tutors.</p>
            )}
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
    </div>
  );
};

export default TutorProfileView;
