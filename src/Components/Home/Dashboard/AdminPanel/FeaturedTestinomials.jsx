import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const TestimonialPage = () => {
  const [allTestimonials, setAllTestimonials] = useState([
    { id: 1, name: 'John Doe', testimonial: 'This service is excellent! I had a great experience.' },
    { id: 2, name: 'Jane Smith', testimonial: 'Amazing quality and support. Highly recommend!' },
    { id: 3, name: 'Alex Johnson', testimonial: 'Very professional and reliable. Will use again.' },
    { id: 4, name: 'Emily Davis', testimonial: 'The best service I have ever used. Worth every penny!' },
  ]);

  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const filteredTestimonials = allTestimonials.filter(testimonial => {
      const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory ? testimonial.category === filterCategory : true;
      return matchesSearch && matchesFilter;
    });

    const sortedTestimonials = filteredTestimonials.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllTestimonials(sortedTestimonials);
  }, [searchQuery, filterCategory, sortOrder]);

  const addToSelected = (testimonial) => {
    setSelectedTestimonials([...selectedTestimonials, testimonial]);
    setAllTestimonials(allTestimonials.filter(t => t.id !== testimonial.id));
  };

  const removeFromSelected = (testimonial) => {
    setAllTestimonials([...allTestimonials, testimonial]);
    setSelectedTestimonials(selectedTestimonials.filter(t => t.id !== testimonial.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6  mt-24">
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
            placeholder="Search testimonials..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
            <option value="Category3">Category 3</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          {/* Selected Testimonials Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Testimonials</h2>
            {selectedTestimonials.length > 0 ? (
              selectedTestimonials.map(testimonial => (
                <div key={testimonial.id} className="flex flex-col p-4 border border-gray-200 rounded-md space-y-2">
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-gray-700">{testimonial.testimonial}</p>
                  <button
                    onClick={() => removeFromSelected(testimonial)}
                    className="text-white w-24 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected testimonials.</p>
            )}
          </div>

          {/* Unselected Testimonials Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Testimonials</h2>
            {allTestimonials.length > 0 ? (
              allTestimonials.map(testimonial => (
                <div key={testimonial.id} className="flex flex-col p-4 border border-gray-200 rounded-md space-y-2">
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-gray-700">{testimonial.testimonial}</p>
                  <button
                    onClick={() => addToSelected(testimonial)}
                    className="text-white w-24 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected testimonials.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
