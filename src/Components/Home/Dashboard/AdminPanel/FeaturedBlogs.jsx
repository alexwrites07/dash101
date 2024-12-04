import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import axios from 'axios';

const BlogPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [newBlog, setNewBlog] = useState({
    by: '',
    tags: '',
    body: ''
  });
  const [imageFile, setImageFile] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://server.avyudha.com/blogs', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAllBlogs(response.data);
          setFilteredBlogs(response.data); // Set the initial filtered blogs
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      }
    };

    fetchBlogs();
  }, []);

  // Filter and sort blogs
  useEffect(() => {
    // Apply filtering based on the search query
    const filtered = allBlogs.filter(
      blog =>
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.by?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting based on the selected sort order
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title?.localeCompare(b.title);
      } else {
        return b.title?.localeCompare(a.title);
      }
    });

    setFilteredBlogs(sorted);
  }, [searchQuery, sortOrder, allBlogs]);

  const addToSelected = (blog) => {
    setSelectedBlogs([...selectedBlogs, blog]);
    setFilteredBlogs(filteredBlogs.filter(b => b._id !== blog._id));
  };

  const removeFromSelected = (blog) => {
    setFilteredBlogs([...filteredBlogs, blog]);
    setSelectedBlogs(selectedBlogs.filter(b => b._id !== blog._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('by', newBlog.by);
    formData.append('tags', newBlog.tags.split(','));
    formData.append('body', newBlog.body);

    if (imageFile && imageFile.length > 0) {
      for (let i = 0; i < imageFile.length; i++) {
        formData.append('images', imageFile[i]);
      }
    }

    try {
      await axios.post('https://server.avyudha.com/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
        
      setNewBlog({ by: '', tags: '', body: '' });
      setImageFile([]);
      window.location.reload();
    } catch (error) {
      console.error('Error creating new blog:', error);
    }
  };

  const getImageId = (imagePath) => {
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
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

        <div className="w-3/5 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Author"
              value={newBlog.by}
              onChange={(e) => setNewBlog({ ...newBlog, by: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newBlog.tags}
              onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <textarea
              placeholder="Body"
              value={newBlog.body}
              onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFile(e.target.files)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Selected Blogs Section */}
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold mb-4">Selected Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedBlogs.length > 0 ? (
              selectedBlogs.map(blog => (
                <div key={blog._id} className="border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <img src={blog.images[0]} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {blog.by} • {new Date(blog.date).toDateString()}</p>
                    <p className="text-gray-700 mb-4">{blog.body}</p>
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
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(blog => (
                <div key={blog._id} className="border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <img
                    src={`https://server.avyudha.com/blogs/${blog._id}/download/image/${getImageId(blog.images[blog.images.length - 1])}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {blog.by} • {new Date(blog.date).toDateString()}</p>
                    <p className="text-gray-700 mb-4">{blog.body}</p>
                    <button
                      onClick={() => window.location.href = `/edit-blog/${blog._id}`}
                      className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No blogs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
