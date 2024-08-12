import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ count, rating, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);


  const getColor = (index) => {
    if (hoverRating >= index) {
      return '#FFD700'; // Gold color for hovered stars
    } else if (!hoverRating && rating >= index) {
      return '#FFD700'; // Gold color for rated stars
    }
    return '#E4E5E9'; // Grey color for unselected stars
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
              onClick={() => onRating(index)}
              className="cursor-pointer"
            >
              <path d="M12 .587l3.668 7.419 8.2 1.189-5.934 5.788 1.4 8.168-7.334-3.859-7.334 3.859 1.4-8.168-5.934-5.788 8.2-1.189z" />
            </svg>
          );
        })}
      </div>

     
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
