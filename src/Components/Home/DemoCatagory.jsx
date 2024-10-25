import React from 'react';

const TuitionCards = () => {
  const cards = [
    { 
      title: 'Tuitions: Online/Offline', 
      description: 'Find online and offline tuitions.', 
      imageUrl: 'https://source.unsplash.com/400x300/?education'
    },
    { 
      title: 'Language', 
      description: 'Learn new languages from experts.', 
      imageUrl: 'https://source.unsplash.com/400x300/?language'
    },
    { 
      title: 'Tutoring Jobs', 
      description: 'Discover tutoring job opportunities.', 
      imageUrl: 'https://source.unsplash.com/400x300/?job,teaching'
    },
    { 
      title: 'Arts & Craft', 
      description: 'Explore arts and craft classes.', 
      imageUrl: 'https://source.unsplash.com/400x300/?art,craft'
    },
    { 
      title: 'Painting', 
      description: 'Learn painting techniques from professionals.', 
      imageUrl: 'https://source.unsplash.com/400x300/?painting'
    },
    { 
      title: 'Music', 
      description: 'Join music classes for various instruments.', 
      imageUrl: 'https://source.unsplash.com/400x300/?music'
    },
    { 
      title: 'Dance', 
      description: 'Dance classes for all skill levels.', 
      imageUrl: 'https://source.unsplash.com/400x300/?dance'
    },
    { 
      title: 'Hobbies', 
      description: 'Pursue new hobbies and interests.', 
      imageUrl: 'https://source.unsplash.com/400x300/?hobby'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            {/* <img 
              src={card.imageUrl} 
              alt={card.title} 
              className="w-full h-48 object-cover mb-4 rounded-lg" 
            /> */}
            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionCards;
