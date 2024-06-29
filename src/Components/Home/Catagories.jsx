import React from 'react';

const jobCategories = [
  {
    title: 'Software Engineer',
    positionOpened: '20+ positions opened',
    location: 'Remote',
    logoSrc: 'https://via.placeholder.com/150',
  },
  {
    title: 'Data Analyst',
    positionOpened: '15+ positions opened',
    location: 'New York, NY',
    logoSrc: 'https://via.placeholder.com/150',
  },
  {
    title: 'Marketing Specialist',
    positionOpened: '10+ positions opened',
    location: 'San Francisco, CA',
    logoSrc: 'https://via.placeholder.com/150',
  },
  {
    title: 'UX/UI Designer',
    positionOpened: '8+ positions opened',
    location: 'Chicago, IL',
    logoSrc: 'https://via.placeholder.com/150',
  },
];

const Catagories = () => {
  return (
    <div className="max-w-full mx-auto " style={{ margin: '10% 4% 4% 4%' }}>
    <div className='text-2xl text-center'>Popular Catagories</div>
    <div className='text-2xs text-center'>Choose your favourite catagory</div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {jobCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <img
              src={category.logoSrc}
              alt={category.title}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">{category.title}</h2>
            <p className="text-sm text-gray-600 mb-2 text-center">{category.positionOpened}</p>
            <p className="text-sm text-gray-600 text-center">{category.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catagories;
