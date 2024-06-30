import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Article Title 1',
    image: 'https://via.placeholder.com/350x350',
    summary: 'This is a brief summary of the article 1...',
    content: 'This is the full content of article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  {
    id: 2,
    title: 'Article Title 2',
    image: 'https://via.placeholder.com/350x350',
    summary: 'This is a brief summary of the article 2...',
    content: 'This is the full content of article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  {
    id: 3,
    title: 'Article Title 3',
    image: 'https://via.placeholder.com/350x350',
    summary: 'This is a brief summary of the article 3...',
    content: 'This is the full content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
  },
  // Add more articles as needed
];

const ArticleCard = ({ article }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 m-4 w-full md:w-1/4">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <img
        src={article.image}
        alt="Article Image"
        className="rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-4">
        {showFullContent ? article.content : article.summary}
      </p>
      <button
        onClick={() => setShowFullContent(!showFullContent)}
        className="text-blue-500 hover:underline"
      >
        {showFullContent ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

const RecentArticles = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl text-center text-blue-700 font-bold mb-8">Recent News Articles</h1>
        <div className="flex flex-wrap justify-center">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div>
      {/* Other components like header, main content, etc. */}
      <RecentArticles />
      {/* Other components like footer, etc. */}
    </div>
  );
};

export default App;
