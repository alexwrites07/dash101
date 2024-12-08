import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const Reviewsq = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://server.avyudha.com/reviews/admin', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        const reviewsWithReceiverNames = await Promise.all(
          data.map(async (review) => {
            let receiverName = '';
            try {
              if (review.reviewedModel === 'Tutor') {
                const res = await fetch(`https://server.avyudha.com/getTutor/${review.reviewedId}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const tutorData = await res.json();
                receiverName = tutorData.fullName;
              } else if (review.reviewedModel === 'Student') {
                const res = await fetch(`https://server.avyudha.com/getStudent/${review.reviewedId}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const studentData = await res.json();
                receiverName = studentData.fullName;
              } else if (review.reviewedModel === 'Organization') {
                const res = await fetch(`https://server.avyudha.com/getOrg/${review.reviewedId}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const orgData = await res.json();
                receiverName = orgData.fullName;
              }
            } catch (err) {
              console.error('Failed to fetch receiver name:', err);
              receiverName = 'Unknown';
            }
            return { ...review, receiverName };
          })
        );

        setReviews(reviewsWithReceiverNames);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://server.avyudha.com/reviews/admin/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete review');
      }

      setReviews(reviews.filter((review) => review._id !== id));
      alert(data.message);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review.');
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.reviewerUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tutorReviews = filteredReviews.filter((review) => review.reviewedModel === 'Tutor');
  const studentReviews = filteredReviews.filter((review) => review.reviewedModel === 'Student');
  const orgReviews = filteredReviews.filter((review) => review.reviewedModel === 'Organization');

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Reviewer name..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
        
          {/* Tutor Reviews Section */}
          {tutorReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold">Tutor Reviews</h2>
              {tutorReviews.map((review) => (
                <div key={review._id} className="p-4 border border-gray-300 rounded-md">
                  <h3 className="text-lg font-semibold">Rating: {review.rating}</h3>
                  <p className="text-gray-700">Description: {review.description}</p>
                  <p className="text-gray-500">Reviewer Name: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Reviewer Username: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Reviewed Username: {review.reviewedUsername}</p>
                  <p className="text-gray-500">Receiver Name: {review.receiverName}</p>
                  <p className="text-gray-500">Reviewed Model: {review.reviewedModel}</p>
                  <p className="text-gray-400">Created Date: {new Date(review.createdDate).toLocaleDateString()}</p>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Student Reviews Section */}
          {studentReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold">Student Reviews</h2>
              {studentReviews.map((review) => (
                <div key={review._id} className="p-4 border border-gray-300 rounded-md">
                  <h3 className="text-lg font-semibold">Rating: {review.rating}</h3>
                  <p className="text-gray-700">Description: {review.description}</p>
                  <p className="text-gray-500">Reviewer Name: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Reviewer Username: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Username: {review.username}</p>
                  <p className="text-gray-500">Receiver Name: {review.receiverName}</p>
                  <p className="text-gray-500">Reviewed Model: {review.reviewedModel}</p>
                  <p className="text-gray-400">Created Date: {new Date(review.createdDate).toLocaleDateString()}</p>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Organization Reviews Section */}
          {orgReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold">Organization Reviews</h2>
              {orgReviews.map((review) => (
                <div key={review._id} className="p-4 border border-gray-300 rounded-md">
                  <h3 className="text-lg font-semibold">Rating: {review.rating}</h3>
                  <p className="text-gray-700">Description: {review.description}</p>
                  <p className="text-gray-500">Reviewer Name: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Reviewer Username: {review.reviewerUsername}</p>
                  <p className="text-gray-500">Username: {review.username}</p>
                  <p className="text-gray-500">Receiver Name: {review.receiverName}</p>
                  <p className="text-gray-500">Reviewed Model: {review.reviewedModel}</p>
                  <p className="text-gray-400">Created Date: {new Date(review.createdDate).toLocaleDateString()}</p>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviewsq;
