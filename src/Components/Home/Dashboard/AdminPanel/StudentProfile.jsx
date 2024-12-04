import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentProfileView = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('type');
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'admin') {
      const fetchAllData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const studentsRes = await axios.get('https://server.avyudha.com/admin/getStudents', { headers });
          setAllStudents(studentsRes.data.students);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchAllData();
    }
  }, [token, userType]);

  const handleEditClick = (studentId) => {
    navigate(`/edit-student/${studentId}`);
  };

  const handleDeleteClick = async (studentId) => {
    setSelectedStudentId(studentId);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: 'Student',
        entityId: studentId,
      };

      await axios.post('https://server.avyudha.com/admin/hardDeleteEntity', payload, { headers });
      alert('OTP has been sent to your email.');
      setIsOtpModalVisible(true);
    } catch (error) {
      console.error('Error sending delete request:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        entityType: 'Student',
        entityId: selectedStudentId,
        otp,
      };

      await axios.post('https://server.avyudha.com/admin/verifyAndHardDeleteEntity', payload, { headers });
      alert('Student profile deleted successfully');
      setAllStudents((prevStudents) => prevStudents.filter((student) => student._id !== selectedStudentId));
      setIsOtpModalVisible(false);
    } catch (error) {
      console.error('Error verifying OTP and deleting:', error);
    }
  };

  const filteredStudents = allStudents.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.parentphone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search students..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-6 w-5/5">
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student._id}
                  className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md"
                >
                  <div className="ml-64 flex justify-between items-center">
                    <h3 className="text-lg font-medium mr-4">{student.fullName}</h3>
                    <p className="text-gray-600 mr-4">{student.email}</p>
                    <p className="text-gray-600 mr-4">{student._id}</p><br></br>
                    <p className="text-gray-600 mr-4">Parent - {student.parentPhone}</p>
                    <p className="text-gray-600">Student - {student.phone}</p>

                  
                    <button
                      onClick={() => handleEditClick(student._id)}
                      className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student._id)}
                      className="ml-1 text-white bg-red-500 hover:bg-green-600 px-3 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
          </div>
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

export default StudentProfileView;
