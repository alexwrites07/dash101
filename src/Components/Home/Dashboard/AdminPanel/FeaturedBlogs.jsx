import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const BlogPage = () => {
  const [allBlogs, setAllBlogs] = useState([
    { 
      id: 1, 
      title: 'The Future of AI', 
      author: 'Jane Doe', 
      description: 'A deep dive into the advancements in artificial intelligence and its impact on industries.', 
      image: 'https://via.placeholder.com/300x200', 
      date: 'September 1, 2024' 
    },
    { 
      id: 2, 
      title: 'Understanding Blockchain', 
      author: 'John Smith', 
      description: 'Exploring the fundamentals of blockchain technology and its applications.', 
      image: 'https://via.placeholder.com/300x200', 
      date: 'August 22, 2024' 
    },
    { 
      id: 3, 
      title: 'Top Web Development Trends', 
      author: 'Alice Johnson', 
      description: 'An overview of the latest trends in web development for 2024.', 
      image: 'https://via.placeholder.com/300x200', 
      date: 'August 10, 2024' 
    },
  ]);

  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const filteredBlogs = allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedBlogs = filteredBlogs.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setAllBlogs(sortedBlogs);
  }, [searchQuery, sortOrder]);

  const addToSelected = (blog) => {
    setSelectedBlogs([...selectedBlogs, blog]);
    setAllBlogs(allBlogs.filter(b => b.id !== blog.id));
  };

  const removeFromSelected = (blog) => {
    setAllBlogs([...allBlogs, blog]);
    setSelectedBlogs(selectedBlogs.filter(b => b.id !== blog.id));
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
            placeholder="Search blogs..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Selected Blogs Section */}
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold mb-4">Selected Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedBlogs.length > 0 ? (
              selectedBlogs.map(blog => (
                <div key={blog.id} className="border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {blog.author} • {blog.date}</p>
                    <p className="text-gray-700 mb-4">{blog.description}</p>
                    <button
                      onClick={() => removeFromSelected(blog)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected blogs.</p>
            )}
          </div>
        </div>

        {/* Unselected Blogs Section */}
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold mb-4">Unselected Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs.length > 0 ? (
              allBlogs.map(blog => (
                <div key={blog.id} className="border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {blog.author} • {blog.date}</p>
                    <p className="text-gray-700 mb-4">{blog.description}</p>
                    <button
                      onClick={() => addToSelected(blog)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
