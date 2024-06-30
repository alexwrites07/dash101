import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Article Title 1',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 1...',
    content: 'This is the full content of article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  {
    id: 2,
    title: 'Article Title 2',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 2...',
    content: 'This is the full content of article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  {
    id: 3,
    title: 'Article Title 3',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 3...',
    content: 'This is the full content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  {
    id: 4,
    title: 'Article Title 3',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 3...',
    content: 'This is the full content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },{
    id: 5,
    title: 'Article Title 3',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 3...',
    content: 'This is the full content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },{
    id: 6,
    title: 'Article Title 3',
    image: 'https://tse3.mm.bing.net/th?id=OIP.suTW5ERWLxNp9kiYpx3OkwHaFq&pid=Api&P=0&h=220',
    summary: 'This is a brief summary of the article 3...',
    content: 'This is the full content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  }
  // Add more articles as needed
];

const ArticleCard = ({ article }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-4 mb-8 flex-shrink-0">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <img
        src={article.image}
        alt="Article Image"
        className="rounded-lg mb-4 mx-auto"
        style={{ maxWidth: '100%' }}
      />
      <div className="px-4 overflow-x-auto" style={{ maxHeight: '200px' }}>
        <p className="text-gray-700 whitespace-nowrap">
          {showFullContent ? article.content : article.summary}
        </p>
      </div>
      <button
        onClick={() => setShowFullContent(!showFullContent)}
        className="text-blue-500 hover:underline mt-2 block mx-auto"
      >
        {showFullContent ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export const NewsSection = () => {
  return (
    <section className="bg-gray-100 py-8 mb-4">
       <h1 className="text-3xl text-center text-[#041F96] font-bold mb-8">Recent News Articles</h1>
      <div className="container mx-auto px-4 text-center overflow-x-auto" style={{ maxWidth: '100vw' }}>
       
        <div className="flex flex-no-wrap justify-start">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
