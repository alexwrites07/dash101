import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const TestimonialPage = () => {
  const [allTestimonials, setAllTestimonials] = useState([
    { id: 1, name: 'John Doe', testimonial: 'This service is excellent! I had a great experience.' },
    { id: 2, name: 'Jane Smith', testimonial: 'Amazing quality and support. Highly recommend!' },
    { id: 3, name: 'Alex Johnson', testimonial: 'Very professional and reliable. Will use again.' },
    { id: 4, name: 'Emily Davis', testimonial: 'The best service I have ever used. Worth every penny!' },
  ]);

  const [filteredTestimonials, setFilteredTestimonials] = useState(allTestimonials);
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterTestimonial, setFilterTestimonial] = useState('');

  useEffect(() => {
    const filtered = allTestimonials.filter(testimonial => {
      const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTestimonial = filterTestimonial ? testimonial.testimonial.toLowerCase().includes(filterTestimonial.toLowerCase()) : true;
      return matchesSearch && matchesTestimonial;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredTestimonials(sorted);
  }, [searchQuery, filterTestimonial, sortOrder, allTestimonials]);

  const addToSelected = (testimonial) => {
    setSelectedTestimonials([...selectedTestimonials, testimonial]);
    setFilteredTestimonials(filteredTestimonials.filter(t => t.id !== testimonial.id));
  };

  const removeFromSelected = (testimonial) => {
    setFilteredTestimonials([...filteredTestimonials, testimonial]);
    setSelectedTestimonials(selectedTestimonials.filter(t => t.id !== testimonial.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex flex-col w-3/5 space-y-4 mb-6">
          <Header />
          <div className="flex items-center space-x-4 mb-4">
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
              placeholder="Search by name..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={filterTestimonial}
              onChange={(e) => setFilterTestimonial(e.target.value)}
              placeholder="Filter by testimonial..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-6">
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
              {filteredTestimonials.length > 0 ? (
                filteredTestimonials.map(testimonial => (
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
    </div>
  );
};

export default TestimonialPage;
