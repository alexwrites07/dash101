import React, { useState } from 'react';
import Sidebar from '../Dashboard/AdminPanel/AdminSidebar';
import Header from './Header';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// BlogCard Component
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        <p className="text-gray-700">{blog.summary}</p>
        <p className="text-gray-500 text-sm mt-2">Date: {blog.date}</p>
        <p className="text-gray-500 text-sm">Comments: {blog.comments}</p>
        <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline mt-2 block">
          Read more
        </Link>
      </div>
    </div>
  );
};

// BlogGrid Component
const BlogGrid = ({ blogs }) => {
  if (!blogs || !Array.isArray(blogs)) {
    return <div>No blogs available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Blogs</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

// // Sidebar Component
// const Sidebar = ({ categories, onCategoryClick }) => {
//   return (
//     <div className="w-full sm:w-1/3 lg:w-1/4 p-4 bg-gray-100">
//       <h3 className="text-xl font-bold mb-4">Categories</h3>
//       <ul>
//         {categories.map((category, index) => (
//           <li
//             key={index}
//             className="cursor-pointer text-blue-500 hover:underline mb-2"
//             onClick={() => onCategoryClick(category)}
//           >
//             {category}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// Blog Component
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample data
  const blogs = [
    {
      id: 1,
      title: 'How to Learn React',
      summary: 'React is a JavaScript library for building user interfaces...',
      image: 'https://via.placeholder.com/400x300',
      date: '2024-01-01',
      comments: 5,
      category: 'Programming',
    },
    {
      id: 2,
      title: 'Understanding Redux',
      summary: 'Redux is a predictable state container for JavaScript apps...',
      image: 'https://via.placeholder.com/400x300',
      date: '2024-02-15',
      comments: 3,
      category: 'Programming',
    },
    {
      id: 3,
      title: 'Advanced JavaScript Concepts',
      summary: 'JavaScript is a versatile language that allows you to...',
      image: 'https://via.placeholder.com/400x300',
      date: '2024-03-10',
      comments: 8,
      category: 'JavaScript',
    },
    {
      id: 4,
      title: 'Web Development Trends in 2024',
      summary: 'Discover the latest trends in web development for 2024...',
      image: 'https://via.placeholder.com/400x300',
      date: '2024-04-01',
      comments: 2,
      category: 'Web Development',
    },
    // Add more sample blog entries as needed
  ];

  // const categories = [...new Set(blogs.map((blog) => blog.category))];

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || blog.category === selectedCategory)
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">
        <Sidebar/>
      <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-24 flex flex-col items-center lg:items-start">
        <div className="flex justify-center my-4">
          <input
            type="text"
            placeholder="Search blogs..."
            className="border rounded-lg py-2 px-4 w-3/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <BlogGrid blogs={filteredBlogs} />
      </div>
      
      </div>
    </div>
  );
};

export default Blog;
