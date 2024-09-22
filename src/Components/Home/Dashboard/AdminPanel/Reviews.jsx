import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const Reviewsq = () => {
  const [allStudents, setAllStudents] = useState([
    { id: 1, name: 'John Doe', category: 'Math', description: 'Enthusiastic about learning Algebra.' },
    { id: 2, name: 'Jane Smith', category: 'Science', description: 'Passionate about Chemistry.' },
    { id: 3, name: 'Alex Johnson', category: 'English', description: 'Loves literature and grammar.' },
    { id: 4, name: 'Emily Davis', category: 'History', description: 'Interested in ancient civilizations.' },
  ]);

  const [Reviews1, setReviews1] = useState([
    { id: 1, reviewer: 'Alice', rating: 5, comment: 'Great tutor, very knowledgeable!' },
    { id: 2, reviewer: 'Bob', rating: 4, comment: 'Good experience, but could improve on time management.' },
    { id: 3, reviewer: 'Charlie', rating: 5, comment: 'Loved the sessions, highly recommend!' },
    { id: 4, reviewer: 'Dave', rating: 3, comment: 'Average experience, not as expected.' },
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedReviews1, setSelectedReviews1] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const filteredStudents = allStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory ? student.category === filterCategory : true;
      return matchesSearch && matchesFilter;
    });

    const sortedStudents = filteredStudents.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllStudents(sortedStudents);
  }, [searchQuery, filterCategory, sortOrder]);

  const addToSelected = (student) => {
    setSelectedStudents([...selectedStudents, student]);
    setAllStudents(allStudents.filter(s => s.id !== student.id));
  };

  const removeFromSelected = (student) => {
    setAllStudents([...allStudents, student]);
    setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
  };

  const addReviewToSelected = (review) => {
    setSelectedReviews1([...selectedReviews1, review]);
    setReviews1(Reviews1.filter(r => r.id !== review.id));
  };

  const removeReviewFromSelected = (review) => {
    setReviews1([...Reviews1, review]);
    setSelectedReviews1(selectedReviews1.filter(r => r.id !== review.id));
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
            placeholder="Search students..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
       

     

          {/* Reviews1 Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Reviews1</h2>
            {selectedReviews1.length > 0 ? (
              selectedReviews1.map(review => (
                <div key={review.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{review.reviewer}</h3>
                    <p className="text-sm text-gray-600">Rating: {review.rating}</p>
                    <p className="text-gray-700 truncate">{review.comment}</p>
                  </div>
                  <button
                    onClick={() => removeReviewFromSelected(review)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected Reviews1.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Reviews1</h2>
            {Reviews1.length > 0 ? (
              Reviews1.map(review => (
                <div key={review.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{review.reviewer}</h3>
                    <p className="text-sm text-gray-600">Rating: {review.rating}</p>
                    <p className="text-gray-700 truncate">{review.comment}</p>
                  </div>
                  <button
                    onClick={() => addReviewToSelected(review)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected Reviews1.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewsq;
