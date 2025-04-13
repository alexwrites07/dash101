import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaUserAlt, FaGraduationCap, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const [tutors, setTutors] = useState([]);
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null); // Reference to the wrapper div

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("https://server.avyudha.com/featured-tutors");
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    draggable: true,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Enable horizontal scrolling using trackpad/mouse pad
  useEffect(() => {
    const sliderContainer = sliderContainerRef.current;
    if (!sliderContainer || !sliderRef.current) return;

    const handleWheelScroll = (event) => {
      event.preventDefault();
      const { deltaX } = event; // Capture horizontal scroll
      if (deltaX > 0) {
        sliderRef.current.slickNext(); // Scroll right
      } else if (deltaX < 0) {
        sliderRef.current.slickPrev(); // Scroll left
      }
    };

    sliderContainer.addEventListener("wheel", handleWheelScroll);
    return () => sliderContainer.removeEventListener("wheel", handleWheelScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Popular Teachers</h2>
      <p className="text-lg text-center text-gray-600 mb-6">Choose your favourite Tutor</p>

      {/* Wrap the slider inside a div with ref */}
      <div ref={sliderContainerRef} className="overflow-hidden cursor-grab">
        <Slider {...settings} ref={sliderRef} className="px-4">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="px-2">
              <Link to={`/getTutor/${tutor._id}`}>
                <div className="bg-white mb-4 rounded-lg shadow-md p-6 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
                  {/* <img
                    src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
                    alt={tutor.fullName}
                    className="rounded-full w-24 h-24 mb-4 object-cover shadow-md"
                  /> */}
                  <div className="flex items-center text-[#041F96] text-xl font-semibold mb-2">
                    <FaUserAlt className="mr-2 text-[#041F96]" />
                    <h2>{tutor.fullName}</h2>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaGraduationCap className="mr-2 text-gray-600" />
                    <p>
                      {tutor?.highestQualification?.length > 10
                        ? `${tutor.highestQualification.slice(0, 10)}...`
                        : tutor.highestQualification}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FaMapMarkerAlt className="mr-2 text-gray-600" />
                    <p>
                      {tutor.location.city}, {tutor.location.state}
                    </p>
                  </div>
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
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
