import React, { useRef } from 'react';

const companies = [
  {
    name: 'College A',
    location: 'New York, NY',
    industry: 'Technology',
    logo: 'https://media.cntraveler.com/photos/56953a3965492c403b26f6f0/master/pass/ucla-cr-alamy.jpg',
  },
  {
    name: 'School B',
    location: 'San Francisco, CA',
    industry: 'Finance',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Emmanuel_College_Front_Court%2C_Cambridge%2C_UK_-_Diliff.jpg',
  },
  {
    name: 'College C',
    location: 'Chicago, IL',
    industry: 'Healthcare',
    logo: 'https://media.cntraveler.com/photos/56953a3965492c403b26f6f0/master/pass/ucla-cr-alamy.jpg',
  },
  {
    name: 'School D',
    location: 'Los Angeles, CA',
    industry: 'Marketing',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Emmanuel_College_Front_Court%2C_Cambridge%2C_UK_-_Diliff.jpg',
  },
  {
    name: 'College E',
    location: 'Boston, MA',
    industry: 'Education',
    logo: 'https://media.cntraveler.com/photos/56953a3965492c403b26f6f0/master/pass/ucla-cr-alamy.jpg',
  },
  {
    name: 'College F',
    location: 'Boston, MA',
    industry: 'Education',
    logo: 'https://media.cntraveler.com/photos/56953a3965492c403b26f6f0/master/pass/ucla-cr-alamy.jpg',
  },
  {
    name: 'College Z',
    location: 'Boston, MA',
    industry: 'Education',
    logo: 'https://media.cntraveler.com/photos/56953a3965492c403b26f6f0/master/pass/ucla-cr-alamy.jpg',
  },
];

const FrequentlyHiringCompanies = () => {
  const containerRef = useRef(null);

  const scrollByCardCount = (cardCount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: cardCount * containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    scrollByCardCount(-1); // Scroll left by 2 cards
  };

  const scrollRight = () => {
    scrollByCardCount(1); // Scroll right by 2 cards
  };

  return (
    <div className="max-w-full mx-auto mb-4" style={{ margin: '6% 4% 4% 4%' }}>
      <h2 className="text-3xl text-[#041F96] font-bold mb-4">Frequently Hiring Institutes</h2>
      <div className="flex items-center">
        <button onClick={scrollLeft} className="bg-gray-400 -ml-2 text-white p-2 rounded-full shadow-lg">
          &lt;
        </button>
        <div className="flex overflow-x-auto space-x-4 mt-12 mb-8 ml-4 mr-4" ref={containerRef}>
          {companies.map((company, index) => (
            <div key={index} className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 mb-3" style={{ minWidth: '270px', maxWidth: '400px' }}>
              <img src={company.logo} alt={`${company.name} Logo`} className="w-36 h-36 object-contain mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#041F96] mb-2">{company.name}</h3>
              <p className="text-sm text-gray-600">{company.location}</p>
              <p className="text-sm text-gray-600">{company.industry}</p>
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
