import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StarRating = ({ count, rating, onRating,  reviewedId}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);
  const [selectedRevied, setSelectedRevied] = useState(reviewedId);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  const getColor = (index) => {
    if (hoverRating >= index) {
      return '#FFD700'; // Gold color for hovered stars
    } else if (!hoverRating && selectedRating >= index) {
      return '#FFD700'; // Gold color for rated stars
    }
    return '#E4E5E9'; // Grey color for unselected stars
  };

  const handleSubmit = async () => {
    if (!selectedRating || !description.trim()) {
      alert('Please provide a rating and a review.');
      return;
    }

    const payload = {
      rating: selectedRating,
      description,
      reviewedId: selectedRevied, 
      reviewedModel: 'Tutor',
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post('https://server.avyudha.com/reviews', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Review submitted successfully!');
      console.log(response.data);
      setDescription(''); // Clear the input after submission
      setSelectedRating(0); // Reset the rating
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please login and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        {[...Array(count)].map((_, index) => {
          index += 1;
          return (
            <svg
              key={index}
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill={getColor(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {
                setSelectedRating(index);
                onRating(index);
              }}
              className="cursor-pointer"
            >
              <path d="M12 .587l3.668 7.419 8.2 1.189-5.934 5.788 1.4 8.168-7.334-3.859-7.334 3.859 1.4-8.168-5.934-5.788 8.2-1.189z" />
            </svg>
          );
        })}
      </div>
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Write your review here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 text-white rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onRating: PropTypes.func,
};

StarRating.defaultProps = {
  count: 5,
  rating: 0,
  onRating: () => {},
};

export default StarRating;
