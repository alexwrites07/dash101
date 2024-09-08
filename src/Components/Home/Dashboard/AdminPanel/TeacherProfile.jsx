import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const TutorProfileView = () => {
  const [allTutors, setAllTutors] = useState([
    { id: 1, name: 'Michael Scott', subject: 'Business Management', description: 'Expert in business strategies and management.' },
    { id: 2, name: 'Pam Beesly', subject: 'Art', description: 'Passionate about painting and fine arts.' },
    { id: 3, name: 'Jim Halpert', subject: 'Marketing', description: 'Specializes in digital marketing strategies.' },
    { id: 4, name: 'Dwight Schrute', subject: 'Agriculture', description: 'Knowledgeable in sustainable farming techniques.' },
  ]);

  const [selectedTutors, setSelectedTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterSubject, setFilterSubject] = useState('');

  useEffect(() => {
    const filteredTutors = allTutors.filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterSubject ? tutor.subject === filterSubject : true;
      return matchesSearch && matchesFilter;
    });

    const sortedTutors = filteredTutors.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllTutors(sortedTutors);
  }, [searchQuery, filterSubject, sortOrder]);

  const addToSelected = (tutor) => {
    setSelectedTutors([...selectedTutors, tutor]);
    setAllTutors(allTutors.filter(t => t.id !== tutor.id));
  };

  const removeFromSelected = (tutor) => {
    setAllTutors([...allTutors, tutor]);
    setSelectedTutors(selectedTutors.filter(t => t.id !== tutor.id));
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
          <select
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Business Management">Business Management</option>
            <option value="Art">Art</option>
            <option value="Marketing">Marketing</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Tutors</h2>
            {selectedTutors.length > 0 ? (
              selectedTutors.map(tutor => (
                <div key={tutor.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.subject}</p>
                    <p className="text-gray-700 truncate">{tutor.description}</p>
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
              <p className="text-gray-500">No selected tutors.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Tutors</h2>
            {allTutors.length > 0 ? (
              allTutors.map(tutor => (
                <div key={tutor.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.subject}</p>
                    <p className="text-gray-700 truncate">{tutor.description}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(tutor)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected tutors.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileView;
