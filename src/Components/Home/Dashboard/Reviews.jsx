import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Reviews = () => {
  const [reviews] = useState([
    { review: 'Review 1', fee: '$50', teacher: 'Teacher Name 1' },
    { review: 'Review 2', fee: '$60', teacher: 'Teacher Name 2' },
  ]);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex-1">
        <Header />
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Reviews</h3>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div>
                <p className="text-gray-800 text-lg font-medium">
                  {review.review}
                </p>
                <p className="text-gray-600 mt-2">Fee: {review.fee}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <p className="text-gray-700 font-semibold">
                  Following Teacher:
                </p>
                <p className="text-gray-900">{review.teacher}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
