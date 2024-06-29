import React from 'react';

const TeachingSection = () => {
  return (
    <div className="max-w-full mx-auto" style={{ margin: '6% 4% 4% 4%' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-8">
          <h2 className="text-3xl text-blue-700 font-bold mb-4">Want to Teach?</h2>
          <p className="text-lg text-gray-800 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget neque non
            ligula interdum venenatis.
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none">
            Upload Your CV
          </button>
        </div>
        <div className="flex-1 ml-24">
          <img
            src="https://via.placeholder.com/350x350"
            alt="Teaching Image"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TeachingSection;
