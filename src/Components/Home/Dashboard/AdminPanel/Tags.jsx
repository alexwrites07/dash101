import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const Tag = () => {
  const [allStudents, setAllStudents] = useState([
    { id: 1, name: 'John Doe', tag: 'Math', description: 'Enthusiastic about learning Algebra.', tags: ['Algebra', 'Calculus'] },
    { id: 2, name: 'Jane Smith', tag: 'Science', description: 'Passionate about Chemistry.', tags: ['Chemistry', 'Physics'] },
    { id: 3, name: 'Alex Johnson', tag: 'English', description: 'Loves literature and grammar.', tags: ['Literature', 'Grammar'] },
    { id: 4, name: 'Emily Davis', tag: 'History', description: 'Interested in ancient civilizations.', tags: ['Ancient History', 'World History'] },
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filtertag, setFiltertag] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    const filteredStudents = allStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filtertag ? student.tag === filtertag : true;
      const matchesTag = filterTag ? student.tags.includes(filterTag) : true;
      return matchesSearch && matchesFilter && matchesTag;
    });

    const sortedStudents = filteredStudents.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllStudents(sortedStudents);
  }, [searchQuery, filtertag, filterTag, sortOrder]);

  const addToSelected = (student) => {
    setSelectedStudents([...selectedStudents, student]);
    setAllStudents(allStudents.filter(s => s.id !== student.id));
  };

  const removeFromSelected = (student) => {
    setAllStudents([...allStudents, student]);
    setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
  };

  const allTags = [...new Set(allStudents.flatMap(student => student.tags))];

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
          <select
            onChange={(e) => setFiltertag(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
          </select>
        </div>

        {/* Display Tags */}
        <div className="flex flex-wrap justify-start w-3/5 mb-6">
          {allTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 m-1 rounded-full text-sm ${filterTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {tag}
            </button>
          ))}
          {filterTag && (
            <button
              onClick={() => setFilterTag('')}
              className="px-3 py-1 m-1 bg-red-500 text-white rounded-full text-sm"
            >
              Clear Tag Filter
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Students</h2>
            {selectedStudents.length > 0 ? (
              selectedStudents.map(student => (
                <div key={student.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.tag}</p>
                    <p className="text-gray-700 truncate">{student.description}</p>
                    <p className="text-sm text-gray-500">{student.tags.join(', ')}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(student)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected students.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Students</h2>
            {allStudents.length > 0 ? (
              allStudents.map(student => (
                <div key={student.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.tag}</p>
                    <p className="text-gray-700 truncate">{student.description}</p>
                    <p className="text-sm text-gray-500">{student.tags.join(', ')}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(student)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected students.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
