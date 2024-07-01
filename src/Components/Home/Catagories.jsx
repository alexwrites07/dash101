import React from 'react';
import image from '../../assets/home/WhatsApp Image 2024-06-30 at 22.26.28.jpeg';

const jobCategories = [
  {
    title: 'Coaching',
    positionOpened: '20+ positions opened',
    location: 'Remote',
    logoSrc: image,
  },
  {
    title: 'School',
    positionOpened: '15+ positions opened',
    location: 'New York, NY',
    logoSrc: image,
  },
  {
    title: 'College',
    positionOpened: '10+ positions opened',
    location: 'San Francisco, CA',
    logoSrc: image,
  },
  {
    title: 'Tuition',
    positionOpened: '8+ positions opened',
    location: 'Chicago, IL',
    logoSrc: image,
  },
  {
    title: 'Class',
    positionOpened: '8+ positions opened',
    location: 'Chicago, IL',
    logoSrc: image,
  },
  {
    title: 'Music',
    positionOpened: '8+ positions opened',
    location: 'Chicago, IL',
    logoSrc: image,
  },
];

const Categories = () => {
  return (
    <div className="max-w-full mx-auto" style={{ margin: '10% 5% 5% 5%', overflowX: 'auto' }}>
      <div className='text-2xl text-center'>Popular Categories</div>
      <div className='text-sm text-center'>Choose your favourite category</div>

      <div className="mt-12 flex overflow-x-auto">
        {jobCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 mx-4" style={{ flex: '0 0 auto', minWidth: 'calc(20% - 8px)' }}>
            <img
              src={category.logoSrc}
              alt={category.title}
              className="rounded-full w-36 h-36 mb-4 mx-auto"
            />
            <h2 className="text-xl font-semibold text-[#041F96] mb-2 text-center">{category.title}</h2>
            <p className="text-sm text-gray-600 mb-2 text-center">{category.positionOpened}</p>
            <p className="text-sm text-gray-600 text-center">{category.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
