import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaGraduationCap, FaMapMarkerAlt, FaStar } from "react-icons/fa";
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

  // return (
  //   <div className="relative max-w-full mx-auto mb-4" style={{ margin: '6% 5% 4% 5%', overflowX: 'hidden' }}>
  //     <div className="text-2xl text-center">Popular Teachers</div>
  //     <div className="text-sm text-center">Choose your favourite Tutor</div>

  //     <div className="mt-12 flex items-center relative mb-4">
  //       <button onClick={scrollLeft} className="absolute left-6 -mt-12 mb-4 bg-gray-400 text-white p-2 rounded-full shadow-lg" style={{ transform: 'translateX(-50%)' }}>
  //         &lt;
  //       </button>
  //       <div className="flex overflow-x-auto mx-auto px-4 ml-12 mr-12 mb-4" ref={containerRef} style={{ scrollSnapType: 'x mandatory' }}>
  //         {tutors.map((tutor, index) => (
  //           <div
  //             key={tutor._id}
  //             className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-4" // Added margin-bottom to create space
  //             style={{ flex: '0 0 auto', minWidth: '200px', maxWidth: '200px', scrollSnapAlign: 'center' }}
  //           >
  //             <Link to={`/getTutor/${tutor._id}`} >
  //             <img
  //               src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
  //               alt={tutor.fullName}
  //               className="rounded-full w-36 h-36 mb-4 mx-auto"
  //             />
  //             <h2 className="text-xl font-semibold text-[#041F96] mt-1 mb-2 text-center">{tutor.fullName}</h2>
  //             <p className="text-sm text-gray-600 mb-2 text-center">{tutor.highestQualification}</p>
  //             <p className="text-sm text-gray-600 text-center mb-4">{tutor.location.city}, {tutor.location.state}</p>
  //             </Link></div>
  //         ))}
  //       </div>
  //       <button onClick={scrollRight} className="absolute right-6 -mt-12 bg-gray-400 text-white p-2 rounded-full shadow-lg" style={{ transform: 'translateX(50%)' }}>
  //         &gt;
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative max-w-full mx-auto mb-4" style={{ margin: '6% 1% 4% 1%', overflowX: 'hidden' }}>
      <div className="text-3xl font-bold text-gray-800 mb-4 text-center">Popular Teachers</div>
      <div className="text-lg text-center">Choose your favourite Tutor</div>
  
      <div className="mt-12  flex items-center relative mb-4 -mx-8">
        <button onClick={scrollLeft} className="absolute font-bold left-8 -mt-12 mb-4 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-gray-500 transition">
          &lt;
        </button>
        <div
          className="flex overflow-x-auto mx-auto px-4 ml-24 mr-12 mb-4"
          ref={containerRef}
          style={{
            scrollSnapType: 'x mandatory',
            gap: '.01rem', // Adjusted for better spacing
          }}
        >
          {tutors.map((tutor, index) => (
            <div
              key={tutor._id}
              className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
              style={{
                flex: '0 0 auto',
                minWidth: '300px',
                maxWidth: '300px',
                scrollSnapAlign: 'center',
              }}
            >
              <Link to={`/getTutor/${tutor._id}`}>



    <div className="bg-white  p-6 flex flex-col items-center text-center h-64">
      {/* Tutor Image */}
      <img
        src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
        alt={tutor.fullName}
        className="rounded-full w-24 h-24 mb-4 mx-auto  object-cover"
      />

      {/* Tutor Name */}
      <div className="flex items-center text-[#041F96] text-xl font-semibold mb-2">
        <FaUserAlt className="mr-2 text-[#041F96]" />
        <h2>{tutor.fullName}</h2>
      </div>

      {/* Tutor Qualification */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaGraduationCap className="mr-2 text-gray-600" />
        <p>{tutor.highestQualification}</p>
      </div>

      {/* Tutor Location */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <p>
          {tutor.location.city}, {tutor.location.state}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < tutor.rating ? "text-yellow-500" : "text-gray-300"
            } w-5 h-5`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({tutor.rating || 0}/5)</span>
      </div>

      {/* Button */}
      {/* <button className="bg-[#041F96] text-white px-6 py-2 rounded-lg hover:bg-[#032c8a] transition duration-200">
        View Profile
      </button> */}
    </div>
  

              </Link>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="absolute right-8 font- bold -mt-12 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-gray-500 transition">
          &gt;
        </button>
      </div>
    </div>
  );
  
};

export default Categories;
