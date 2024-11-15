import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Jobs/Map';
import StarRating from './Jobs/StarRating';
import { HiBookmark, HiOutlineBookmark} from 'react-icons/hi';
import './Home.css';
import { Link } from 'react-router-dom';

const NeedDescription = () => {
  const { IId } = useParams();
  const [job, setJob] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/learning-need/${IId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/reviews/profile/${IId}`);
        // Filter reviews based on reviewedId matching tutor's ID
        const filteredReviews = response.data.reviews.filter(review => review.reviewedId === Id);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        
      }
    };

    fetchJobDetails();
    fetchReviews();
  }, [IId]);

  const openModal = () => {
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedComment(comment);
    setComment('');
  };
  const token = localStorage.getItem('token');
  const handleBookmarkToggle = async () => {
    // Ensure token is retrieved (e.g., from localStorage or context)
    const token = localStorage.getItem('token'); // Adjust if your token is stored differently
    
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }
  
    try {
      // Send a POST request to bookmark the tutor
      const response = await axios.post(
        'https://backend.akshayy.tech/bookmark',
        { employeeId: Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setIsBookmarked((prev) => !prev); // Toggle the bookmark state on success
      alert('Tutor bookmarked successfully!');
    } catch (error) {
      console.error('Error bookmarking tutor:', error);
      alert('Failed to bookmark the tutor. Please try again later.');
    }
  };
  
  const handleRating = (rate) => {
    setRating(rate);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) {
    return <p>Loading...</p>;
  }

  const statusTag = job.tags?.find(tag => tag.name === "open");
  const isActive = statusTag && statusTag.active;

  return (
    <div className="container mx-auto p-4">
  <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg text-black flex flex-col sm:flex-row md:justify-between items-center mb-6">
    
    <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
      <h1 className="text-3xl font-bold mb-4">{job.fullName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
        <p><strong>Salary:</strong> Up to {job.salary?.max} {job.salary?.period}</p>
        <p><strong>Requirement:</strong> {job.requirement}</p>
        <p><strong>Available:</strong> {job.available}</p>
        <p><strong>Start Date:</strong> {job.start}</p>
        <p><strong>Class Type:</strong> {job.typeOfClass?.join(", ")}</p>
        <p><strong>Gender Preference:</strong> {job.genderPreference}</p>
        <button onClick={handleBookmarkToggle}
          className="text-blue-500 ml-6 hover:text-blue-600 focus:outline-none mr-8">
          {isBookmarked ? <HiBookmark className="w-6 h-6" /> : <HiOutlineBookmark className="w-6 h-6" />}
        </button>
        {!job.fulfilled ? (
          <div></div>
        ) : (
          <p className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-semibold mx-auto -ml-1">
            Closed
          </p>
        )}
      </div>
    </div>
    <div className="md:w-1/4 flex flex-col items-end">
      {/* Additional content if needed */}
    </div>
  </div>

  <div className="flex flex-col md:flex-row md:justify-between">
    <div className="bg-white p-6 rounded-lg md:w-3/5">
      <div className="text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800 mb-4"> Details</h2>
        <p className="text-black mb-4">{job.description}</p>

        {/* Display Email and Phone */}
        
        <p><strong>Board:</strong> {job.board}</p>
        <p><strong>Requirements:</strong> {job.requirement}</p>

        {/* Video Player */}
        

        {/* Reviews Section */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Reviews</h2>
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

        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate this Tutor</h2>
          <StarRating />

          {/* Comment Section */}
          <div className="mt-4">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comments here..."
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            {submittedComment && <p className="mt-2 text-green-500">{submittedComment}</p>}
          </div>
        </div>
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

export default NeedDescription;
