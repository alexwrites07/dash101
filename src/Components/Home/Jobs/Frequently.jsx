import React from 'react';

const FrequentlyHiringCompanies = () => {
  const companies = [
    {
      name: 'Company A',
      location: 'New York, NY',
      industry: 'Technology',
      logo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Company B',
      location: 'San Francisco, CA',
      industry: 'Finance',
      logo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Company C',
      location: 'Chicago, IL',
      industry: 'Healthcare',
      logo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Company D',
      location: 'Los Angeles, CA',
      industry: 'Marketing',
      logo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Company E',
      location: 'Boston, MA',
      industry: 'Education',
      logo: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="max-w-full mx-auto" style={{ margin: '6% 4% 4% 4%' }}>
      <h2 className="text-3xl text-blue-700 font-bold mb-4">Frequently Hiring Companies</h2>
      <div className="flex overflow-x-auto space-x-4 mt-12 mb-8">
        {companies.map((company, index) => (
          <div key={index} className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6" style={{ minWidth: '250px', maxWidth: '300px' }}>
            <img src={company.logo} alt={`${company.name} Logo`} className="w-24 h-36 object-contain mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{company.name}</h3>
            <p className="text-sm text-gray-600">{company.location}</p>
            <p className="text-sm text-gray-600">{company.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyHiringCompanies;
