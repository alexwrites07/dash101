import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';

const Tag = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterTag, setFilterTag] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tutors from backend API
    const fetchTutors = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend.akshayy.tech/admin/getTutors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setAllStudents(data.tutors || []);
    };

    fetchTutors();
  }, []);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    const sortedStudents = [...allStudents].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });
    setAllStudents(sortedStudents);
  };

  const handleEdit = (id) => {
    // Navigate to the edit page for the selected tutor
    navigate(`/edit-tags/${id}`);
  };

  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag ? student.tags.includes(filterTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(allStudents.flatMap((student) => student.tags))];

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <button
            onClick={handleSort}
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
          <select
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Tutors List</h2>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div key={student._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{student.fullName}</h3>
                    <p className="text-sm text-gray-600">{student.tags.join(', ')}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(student._id)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tutors found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
