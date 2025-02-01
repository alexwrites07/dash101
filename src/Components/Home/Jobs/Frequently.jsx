import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar,FaIndustry } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const FrequentlyHiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Animation duration
      offset: 200,    // Offset from the viewport
      easing: "ease-in-out",
      once: true,     // Trigger animation only once
    });

    // Fetch companies from the backend API
    axios
      .get("https://server.avyudha.com/featured-organizations")
      .then((response) => {
        const fetchedCompanies = response.data.map((company) => ({
          name: company.name,
          _id: company._id,
          location: `${company.location.city}, ${company.location.state}`,
          organizationType: company.organizationType || " ",
          rating :company.rating,
          logo: company.logo || "https://via.placeholder.com/150", // Fallback logo in case of missing logo
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
    scrollByCardCount(-1); // Scroll left by 1 card
  };

  const scrollRight = () => {
    scrollByCardCount(1); // Scroll right by 1 card
  };

  return (
    <div className="max-w-full mx-auto mb-4" style={{ margin: "6% 4% 4% 4%" }}>
      <h2 className="text-3xl text-[#041F96] font-bold mb-4">
        Our Partnered Institutes / Organisation
      </h2>
      <div className="flex items-center">
        <button
          onClick={scrollLeft}
          className="bg-gray-400 -ml-2 text-white p-2 rounded-full shadow-lg"
        >
          &lt;
        </button>
        <div
          className="flex overflow-x-auto space-x-4 mt-12 font-bold mb-8 ml-4 mr-4"
          ref={containerRef}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 mb-3 hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
              style={{ minWidth: "270px", maxWidth: "400px" }}
              data-aos="fade-up" // AOS animation
              data-aos-delay={index * 300} // Staggered animation
            >
              <Link to={`/getOrg/${company._id}`} className="block w-full">
                <img
                  src={`https://server.avyudha.com/org/download/logo/${company._id}`}
                  alt={`${company.name} Logo`}
                  className="w-36 h-36 object-contain mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-[#041F96] mb-2">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center mb-1">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-500 mr-2" />
                  {company.location}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaIndustry className="w-5 h-5 text-gray-500 mr-2" />
                  {company.organizationType}
                </p>
                <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < company.rating ? "text-yellow-500" : "text-gray-300"
            } w-5 h-5`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({company.rating || 0}/5)</span>
      </div>
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="bg-gray-400 -mr-2 text-white p-2 font-bold rounded-full shadow-lg"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FrequentlyHiringCompanies;
