import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar, FaIndustry } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const FrequentlyHiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
      once: true,
    });

    axios
      .get("https://server.avyudha.com/featured-organizations")
      .then((response) => {
        const fetchedCompanies = response.data.map((company) => ({
          name: company.name,
          _id: company._id,
          location: `${company.location.city}, ${company.location.state}`,
          organizationType: company.organizationType || " ",
          rating: company.rating,
          logo: company.logo || "https://via.placeholder.com/150",
        }));
        setCompanies(fetchedCompanies);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const scrollByCardCount = (cardCount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: cardCount * containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    scrollByCardCount(-1);
  };

  const scrollRight = () => {
    scrollByCardCount(1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        scrollRight(); // Swipe left -> Move right
      } else {
        scrollLeft(); // Swipe right -> Move left
      }
    }
  };

  return (
    <div className="max-w-full mx-auto mb-4" style={{ margin: "6% 4% 4% 4%" }}>
      <h2 className="text-3xl text-[#041F96] font-bold mb-4">
        Our Featured Institutes / Organisation
      </h2>
      <div className="flex items-center">
       
        
        <div
          className="flex overflow-x-auto space-x-4 mt-12 font-bold mb-8 ml-4 mr-4"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 mb-3 hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
              style={{ minWidth: "270px", maxWidth: "400px" }}
              data-aos="fade-up"
              data-aos-delay={index * 300}
            >
              <Link to={`/getOrg/${company._id}`} className="block w-full">
                <img
                  src={`https://server.avyudha.com/org/download/logo/${company._id}`}
                  alt={`${company.name}`}
                  className="rounded-full w-24 h-24 mb-4 object-cover shadow-md mx-auto"
                />
                <h3 className="text-xl font-semibold text-[#041F96] mb-2 text-center">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center justify-center text-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-500 mr-2" />
                  {company.location}
                </p>
                <p className="text-sm text-gray-600 flex items-center justify-center text-center mb-4">
                  <FaIndustry className="w-5 h-5 text-gray-500 mr-2" />
                  {company.organizationType}
                </p>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < company.rating ? "text-yellow-500" : "text-gray-300"
                      } w-5 h-5`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({company.rating || 0}/5)
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
    
      </div>
    </div>
  );
};

export default FrequentlyHiringCompanies;
