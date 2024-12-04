import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    by: '',
    body: '',
    images: [],
    tags: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected files

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://server.avyudha.com/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedBlog = response.data;

        const tagsString = fetchedBlog.tags ? fetchedBlog.tags.join(', ') : '';
        setBlog({ ...fetchedBlog, tags: tagsString });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Get selected files
    setSelectedFiles(files);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Append blog fields to formData
    formData.append('by', blog.by);
    formData.append('body', blog.body);
    formData.append('tags', blog.tags);

    // Append files to formData
    selectedFiles.forEach((file) => formData.append('images', file));

    try {
      await axios.put(`https://server.avyudha.com/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/blogs'); // Navigate back to blogs page after saving
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={blog.by}
          onChange={(e) => setBlog({ ...blog, by: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          value={blog.body}
          onChange={(e) => setBlog({ ...blog, body: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={blog.tags}
          onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">Uploaded Images:</h3>
        <div className="flex flex-wrap gap-4">
          {blog.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Blog Image ${index + 1}`}
              className="w-24 h-24 object-cover border border-gray-300"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditBlogPage;
