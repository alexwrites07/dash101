import React from 'react';
import image from '../../assets/home//WhatsApp Image 2024-06-30 at 22.26.28.jpeg';
const jobCategories = [
  {
    title: 'Coaching',
    positionOpened: '20+ positions opened',
    location: 'Remote',
    logoSrc:{image},
  },
  {
    title: 'School',
    positionOpened: '15+ positions opened',
    location: 'New York, NY',
    logoSrc:{image},
  },
  {
    title: 'College',
    positionOpened: '10+ positions opened',
    location: 'San Francisco, CA',
    logoSrc:{image},
  },
  {
    title: 'Tuition',
    positionOpened: '8+ positions opened',
    location: 'Chicago, IL',
    logoSrc:{image},
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
              src={image}
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

export default Catagories;
