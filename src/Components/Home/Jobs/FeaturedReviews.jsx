import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://server.avyudha.com/featured-reviews');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching featured reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Featured Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white border rounded-lg shadow-lg p-6  hover:shadow-2xl hover:-translate-y-2 transform transition duration-300">
              <div className="flex items-center space-x-4">
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{review.reviewerName}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{review.description || "No description provided."}</p>
              <p className="mt-2 text-sm text-gray-500">Reviewed on: {new Date(review.createdDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedReviews;
