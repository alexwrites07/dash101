import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter, HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import './AdminSidebar.css'; // Ensure this file is in the same directory
import Header from '../Header';
import Sidebar from './AdminSidebar';
const WidgetCatagory = () => {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [unselectedPosts, setUnselectedPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const allPosts = [
    { id: 1, title: 'Post 1', category: 'Category A' },
    { id: 2, title: 'Post 2', category: 'Category B' },
    { id: 3, title: 'Post 3', category: 'Category A' },
    { id: 4, title: 'Post 4', category: 'Category C' },
  ];

  useEffect(() => {
    const filteredPosts = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory ? post.category === filterCategory : true;
      return matchesSearch && matchesFilter;
    });

    setUnselectedPosts(filteredPosts.filter(post => !selectedPosts.includes(post)));
  }, [searchQuery, filterCategory, selectedPosts]);

  const handleSort = () => {
    const sortedPosts = [...unselectedPosts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setUnselectedPosts(sortedPosts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const addToSelected = (post) => {
    setSelectedPosts([...selectedPosts, post]);
    setUnselectedPosts(unselectedPosts.filter((p) => p.id !== post.id));
  };

  const removeFromSelected = (post) => {
    setSelectedPosts(selectedPosts.filter((p) => p.id !== post.id));
    setUnselectedPosts([...unselectedPosts, post]);
  };

  return (
    <div className="admin-panel-container p-6">
      {/* Selected Posts Section */}  <Sidebar />
      <div className="section mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28">
      <Header />
 
      <div className=' '>
        <h2 className="section-title ">Selected Categories & Posts</h2>
        <div className="tools flex justify-between mb-4">
          <div className="flex space-x-4">
            <button onClick={handleSort} className="tool-button">
              <HiSortAscending className="w-6 h-6" />
              Sort
            </button>
            <button className="tool-button">
              <HiFilter className="w-6 h-6" />
              Filter
            </button>
            <button className="tool-button">
              <HiSearch className="w-6 h-6" />
              Search
            </button>
          </div>
        </div>
        <div className="posts-slider">
          {selectedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.category}</p>
              <button
                onClick={() => removeFromSelected(post)}
                className="action-button remove"
              >
                <HiMinusCircle className="w-6 h-6" /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Unselected Posts Section */}<br></br><br></br>
      <div className="section">
        <h2 className="section-title">Unselected Posts</h2>
        <div className="tools flex justify-between mb-4">
          <div className="flex space-x-4">
            <button onClick={handleSort} className="tool-button">
              <HiSortAscending className="w-6 h-6" />
              Sort
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="tool-button"
            />
            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              className="tool-button"
            >
              <option value="">All Categories</option>
              <option value="Category A">Category A</option>
              <option value="Category B">Category B</option>
              <option value="Category C">Category C</option>
            </select>
          </div>
        </div>
        <div className="posts-slider">
          {unselectedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.category}</p>
              <button
                onClick={() => addToSelected(post)}
                className="action-button add"
              >
                <HiPlusCircle className="w-6 h-6" /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default WidgetCatagory;
