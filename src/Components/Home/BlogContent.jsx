import React from 'react';
import { useParams } from 'react-router-dom';

// Sample blogs data (For demonstration, replace with actual data fetching in a real app)
const sampleBlogs = [
  {
    id: 1,
    title: 'How to Learn React',
    comments: 5,
    date: '2024-08-01',
    category: 'Programming',
    image: 'https://via.placeholder.com/800x400',
    description: 'React is a JavaScript library for building user interfaces...',
    images: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300'
    ],
    requirements: ['JavaScript knowledge', 'Basic HTML/CSS']
  },
  // Add more sample blogs as needed
];

const BlogContent = () => {
  const { id } = useParams();
  const blogId = parseInt(id, 10);
  const blog = sampleBlogs.find((b) => b.id === blogId);

  // Check if blog is undefined
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
      <div className="text-center mb-4">
        <span className="text-gray-500 mr-4">Comments: {blog.comments || 0}</span>
        <span className="text-gray-500 mr-4">Date: {blog.date || 'N/A'}</span>
        <span className="text-gray-500">Category: {blog.category || 'N/A'}</span>
      </div>
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-700 mb-4">{blog.description}</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-4">
        {blog.images && blog.images.length > 0 ? (
          blog.images.map((img, index) => (
            <img key={index} src={img} alt={`Blog image ${index + 1}`} className="w-full h-32 object-cover" />
          ))
        ) : (
          <p>No additional images available.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Requirements</h2>
        <ul className="list-disc list-inside">
          {blog.requirements && blog.requirements.length > 0 ? (
            blog.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))
          ) : (
            <li>No requirements specified.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogContent;
