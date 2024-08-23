import React, { useState, Link} from 'react';
import Sidebar from './Sidebar';
import Header from '../DashboardEmployer/HeaderEmployer';

const LearningNeeds = () => {
  const [learningNeeds] = useState([
    {
      title: 'Post Title 1',
      connected: 5,
      datePosted: 'August 10, 2024',
      tags: ['Math', 'Algebra', 'High School'],
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      title: 'Post Title 2',
      connected: 3,
      datePosted: 'August 12, 2024',
      tags: ['Science', 'Physics', 'Grade 10'],
      imageUrl: 'https://via.placeholder.com/150'
    },
  ]);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28">
        <Header />
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Learning Needs</h3>
        {learningNeeds.map((need, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 lg:w-[800px]">
            <div className="flex mb-4">
              <img src={need.imageUrl} alt={need.title} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <p className="text-xl font-semibold text-gray-800">{need.title}</p>
                <p className="text-gray-600 text-sm">Posted on {need.datePosted}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {need.tags.map((tag, i) => (
                <span key={i} className="bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 mb-4">Connected: {need.connected}</p>
            <button className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Book a Demo
            </button>
          </div>
        ))}
         <Link to ='/demo-form'><button className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Book a Demo
            </button>
            </Link> 
      </div>
    </div>
  );
};

export default LearningNeeds;
