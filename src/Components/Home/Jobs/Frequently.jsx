import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
const FrequentlyHiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch companies from the backend API
    axios
      .get('https://backend.akshayy.tech/featured-organizations')
      .then((response) => {
        const fetchedCompanies = response.data.map((company) => ({
          name: company.name,
          location: `${company.location.city}, ${company.location.state}`,
          industry: company.category || 'Unknown Industry',
          logo: company.logo || 'https://via.placeholder.com/150', // Fallback logo in case of missing logo
        }));
        setCompanies(fetchedCompanies);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const scrollByCardCount = (cardCount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: cardCount * containerRef.current.clientWidth,
        behavior: 'smooth',
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
    <div className="max-w-full mx-auto mb-4" style={{ margin: '6% 4% 4% 4%' }}>
      <h2 className="text-3xl text-[#041F96] font-bold mb-4">Our Partnered Institutes / Organisation</h2>
      <div className="flex items-center">
        <button onClick={scrollLeft} className="bg-gray-400 -ml-2 text-white p-2 rounded-full shadow-lg">
          &lt;
        </button>
        <div className="flex overflow-x-auto space-x-4 mt-12 mb-8 ml-4 mr-4" ref={containerRef}>
          {companies.map((company, index) => (
            <div key={index} className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 mb-3" style={{ minWidth: '270px', maxWidth: '400px' }}>
               <Link to={`/getOrg/${company._id}`} className="block w-full">
              
              <img src={company.logo} alt={`${company.name} Logo`} className="w-36 h-36 object-contain mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#041F96] mb-2">{company.name}</h3>
              <p className="text-sm text-gray-600">{company.location}</p>
              <p className="text-sm text-gray-600">{company.industry}</p>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="bg-gray-400 -mr-2 text-white p-2 rounded-full shadow-lg">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FrequentlyHiringCompanies;
