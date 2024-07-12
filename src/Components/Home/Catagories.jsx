import React, { useRef } from 'react';
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
  const containerRef = useRef(null);
  const cardWidth = 0.35; // Adjust as per your card width percentage

  const scrollByCardCount = (cardCount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: cardCount * containerRef.current.clientWidth * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    scrollByCardCount(-2); // Scroll left by 2 cards
  };

  const scrollRight = () => {
    scrollByCardCount(2); // Scroll right by 2 cards
  };

  return (
    <div className="relative max-w-full mx-auto mb-4" style={{ margin: '6% 5% 4% 5%', overflowX: 'hidden' }}>
      <div className="text-2xl text-center">Popular Categories</div>
      <div className="text-sm text-center">Choose your favourite category</div>

      <div className="mt-12 flex items-center relative mb-4">
        <button onClick={scrollLeft} className="absolute left-6 -mt-12 mb-4 bg-gray-400 text-white p-2 rounded-full shadow-lg" style={{ transform: 'translateX(-50%)' }}>
          &lt;
        </button>
        <div className="flex overflow-x-auto mx-auto px-4 ml-12 mr-12 mb-4" ref={containerRef} style={{ scrollSnapType: 'x mandatory' }}>
          {jobCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-4" // Added margin-bottom to create space
              style={{ flex: '0 0 auto', minWidth: '350px', maxWidth: '400px', scrollSnapAlign: 'center' }}
            >
              <img
                src={category.logoSrc}
                alt={category.title}
                className="rounded-full w-36 h-36 mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-[#041F96] mb-2 text-center">{category.title}</h2>
              <p className="text-sm text-gray-600 mb-2 text-center">{category.positionOpened}</p>
              <p className="text-sm text-gray-600 text-center mb-4">{category.location}</p>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="absolute right-6 -mt-12 bg-gray-400 text-white p-2 rounded-full shadow-lg" style={{ transform: 'translateX(50%)' }}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Categories;
