import React from 'react';
import { Link } from 'react-router-dom';

const TuitionCards = () => {
  const cards = [
    { 
      title: 'Tuitions: Online/Offline', 
      description: 'Find online and offline tuitions.', 
      imageUrl: 'https://i.pinimg.com/736x/56/0d/df/560ddf345285e626238cb91226130480.jpg'
    },
    { 
      title: 'Language', 
      description: 'Learn new languages from experts.', 
      imageUrl: 'https://i.pinimg.com/736x/d6/9a/a5/d69aa5765e7469ababad53960ba5dc38.jpg'
    },
    { 
      title: 'Tutoring Jobs', 
      description: 'Discover tutoring job opportunities.', 
      imageUrl: 'https://i.pinimg.com/736x/60/91/03/609103f7cfa113fd312d0a4f4fbd7a77.jpg'
    },
    { 
      title: 'Arts & Craft', 
      description: 'Explore arts and craft classes.', 
      imageUrl: 'https://i.pinimg.com/736x/0e/18/d7/0e18d740c5319bca797ca08504f8aa86.jpg'
    },
    { 
      title: 'Painting', 
      description: 'Learn painting techniques from professionals.', 
      imageUrl: 'https://i.pinimg.com/736x/11/bc/9c/11bc9c4979e1fb6f6dde73ebec2194cc.jpg'
    },
    { 
      title: 'Music', 
      description: 'Join music classes for various instruments.', 
      imageUrl: 'https://i.pinimg.com/736x/73/30/d5/7330d57ce739edcfad16881ca03b6716.jpg'
    },
    { 
      title: 'Dance', 
      description: 'Dance classes for all skill levels.', 
      imageUrl: 'https://i.pinimg.com/736x/0b/88/c4/0b88c4af1333857d6394ab8d56947125.jpg'
    },
    { 
      title: 'Hobbies', 
      description: 'Pursue new hobbies and interests.', 
      imageUrl: 'https://i.pinimg.com/736x/49/46/c1/4946c1de74d1afc7c70702d564623d70.jpg'
    }
  ];

  // return (
  //   <div className="container mx-auto px-4 py-10">
  //     <h1 className="text-3xl font-bold text-center mb-8">Explore Categories</h1>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //       {cards.map((card, index) => (
  //         <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
  //           {/* <img 
  //             src={card.imageUrl} 
  //             alt={card.title} 
  //             className="w-full h-48 object-cover mb-4 rounded-lg" 
  //           /> */}
  //           <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
  //           <p className="text-gray-600">{card.description}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Categories
      </h1>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-lg rounded-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Link to ="/demo-form">
            <img 
              src={card.imageUrl} 
              alt={card.title} 
              className="w-full h-36 object-cover" 
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold mb-2 text-blue-800">
                {card.title}
              </h2>
              <p className="text-gray-600 text-xs leading-snug">
                {card.description}
              </p>
            </div>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
  
};

export default TuitionCards;
