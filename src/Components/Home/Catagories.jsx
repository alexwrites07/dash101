import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Categories = () => {
  const containerRef = useRef(null);
  const [tutors, setTutors] = useState([]);
  const cardWidth = 0.35; // Adjust as per your card width percentage

  // Function to fetch data from the API
  const fetchTutors = async () => {
    try {
      const response = await axios.get('https://server.avyudha.com/featured-tutors');
      setTutors(response.data); // Assuming the response is an array of tutor objects
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  useEffect(() => {
    fetchTutors(); // Fetch tutors when the component mounts
  }, []);

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
      <div className="text-2xl text-center">Popular Teachers</div>
      <div className="text-sm text-center">Choose your favourite Tutor</div>

      <div className="mt-12 flex items-center relative mb-4">
        <button onClick={scrollLeft} className="absolute left-6 -mt-12 mb-4 bg-gray-400 text-white p-2 rounded-full shadow-lg" style={{ transform: 'translateX(-50%)' }}>
          &lt;
        </button>
        <div className="flex overflow-x-auto mx-auto px-4 ml-12 mr-12 mb-4" ref={containerRef} style={{ scrollSnapType: 'x mandatory' }}>
          {tutors.map((tutor, index) => (
            <div
              key={tutor._id}
              className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-4" // Added margin-bottom to create space
              style={{ flex: '0 0 auto', minWidth: '200px', maxWidth: '200px', scrollSnapAlign: 'center' }}
            >
              <Link to={`/getTutor/${tutor._id}`} >
              <img
                src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
                alt={tutor.fullName}
                className="rounded-full w-36 h-36 mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-[#041F96] mt-1 mb-2 text-center">{tutor.fullName}</h2>
              <p className="text-sm text-gray-600 mb-2 text-center">{tutor.highestQualification}</p>
              <p className="text-sm text-gray-600 text-center mb-4">{tutor.location.city}, {tutor.location.state}</p>
              </Link></div>
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
