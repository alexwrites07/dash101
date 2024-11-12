import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Jobs/Map';
import StarRating from './Jobs/StarRating';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import './Home.css';

const OrgDescription = () => {
  const { iid } = useParams();
  const [job, setJob] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getOrg/${iid}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/reviews/profile/${iid}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchJobDetails();
    fetchReviews();
  }, [iid]);

  const handleBookmarkToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.post(
        'https://backend.akshayy.tech/bookmark',
        { employeeId: iid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsBookmarked((prev) => !prev);
      alert('Tutor bookmarked successfully!');
    } catch (error) {
      console.error('Error bookmarking tutor:', error);
      alert('Failed to bookmark the tutor. Please try again later.');
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    setSubmittedComment(comment);
    setComment('');
  };

  if (error) return <p>{error}</p>;
  if (!job) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg text-black flex flex-col sm:flex-row md:justify-between items-center mb-6">
        <div className="md:w-1/4 mb-4 md:mb-0">
          {job.logo ? (
            <img src={job.logo} alt={job.name} className="w-full h-56 object-cover rounded-md" />
          ) : (
            <p>No logo available</p>
          )}
        </div>
        <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.name}</h1>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Company Size:</strong> {job.companySize}</p>
          <p><strong>Profile Views:</strong> {job.profileViews.count}</p><br></br>
          {/* <button onClick={handleBookmarkToggle} className="text-blue-500  hover:text-blue-600 focus:outline-none ">
            {isBookmarked ? <HiBookmark className="w-6 h-6" /> : <HiOutlineBookmark className="w-6 h-6" />}
          </button> */}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="bg-white p-6 rounded-lg md:w-3/5">
          <div className="text-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Organization Details</h2>
            <p className="text-black mb-4">{job.description}</p>
            <h2 className="text-xl font-semibold mb-2">Subjects Required</h2>
            <ul className="list-disc ml-6">
              {job.subjectsRequired?.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>

            {/* <h2 className="text-xl font-semibold mb-2 mt-6">Job Postings</h2>
            <ul className="list-disc ml-6">
              {job.jobPostings?.map((postId, index) => (
                <li key={index}>{postId}</li>
              ))}
            </ul> */}

            <h2 className="text-xl font-semibold mb-2 mt-6">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review._id} className="border-b mb-4 pb-2">
                  <p><strong>{review.reviewerName}</strong></p>
                  <StarRating rating={review.rating} />
                  <p>{review.description}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.createdDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg md:w-2/5 md:ml-4 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Map Location</h2>
          {job.location?.coordinates ? (
            <Map coordinates={job.location.coordinates} />
          ) : (
            <p>Map location not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgDescription;
