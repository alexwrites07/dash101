import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import StarRating from './StarRating';
import { HiBookmark, HiOutlineBookmark} from 'react-icons/hi';
import '../Home.css';
import { Link } from 'react-router-dom';

const TeachingDescription = () => {
  const { Id } = useParams();
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
        const response = await axios.get(`https://server.avyudha.com/getTutor/${Id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/reviews/profile/${Id}`);
        // Filter reviews based on reviewedId matching tutor's ID
        const filteredReviews = response.data.reviews.filter(review => review.reviewedId === Id);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        
      }
    };
    const fetchBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("Authentication token not found.");
          return;
        }
  
        const response = await axios.get('https://server.avyudha.com/dashboard/Organization', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const bookmarkedEmployees = response.data.bookmarkedEmployees || [];
        setIsBookmarked(bookmarkedEmployees.includes(Id)); // Check if iid is in the array
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };
    fetchBookmarkStatus();

    fetchJobDetails();
    fetchReviews();
  }, [Id]);

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
      if (isBookmarked) {
        // DELETE request to unbookmark
        await axios.delete('https://server.avyudha.com/bookmark', {
          data: { employeeId:Id },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Tutor Unbookmarked successfully!');
       } else{
      const response = await axios.post(
        'https://server.avyudha.com/bookmark',
        { employeeId: Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Tutor bookmarked successfully!');
    }
      setIsBookmarked((prev) => !prev); // Toggle the bookmark state on success
    
    } catch (error) {
      console.error('Error bookmarking tutor:', error);
      alert('Only Organizations can bookmark.');
    }
  };
  const buyContact = async () => {
    if (!Id) {
      console.error(' ID not available');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://server.avyudha.com/purchaseContact',
        {
          contactId: Id,
          contactType: 'Tutor'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Contact purchase successful:', response.data);
      alert ("Contact Bought");
    } catch (error) {
      console.error('Error purchasing contact:', error);
      alert ("Only organizer to be able to view contact/You have already bought the contact")
    }
  };
  
  const handleRating = (rate) => setRating(rate);

  const handleSubmitReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `https://server.avyudha.com/reviews/profile/${Id}`,
        { rating, description: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, response.data]); // Add the new review
      setRating(0); // Reset rating
      setComment(''); // Reset comment
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again later.');
    }
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
        <div className="md:w-1/4 mb-4 md:mb-0">
          
            <img src={`https://server.avyudha.com/tutors/download/image/${Id}`} alt={job.title} className="w-full h-64 object-cover rounded-md" />
          
        </div>
        <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.fullName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
            <p><strong>Salary:</strong> {job.jobAlerts?.minExpectedSalary?.value} - {job.jobAlerts?.maxExpectedSalary?.value}</p>
            <p><strong>Salary Period:</strong> {job.jobAlerts?.minExpectedSalary?.period}</p>
            <p><strong>Experience:</strong> {job.totalExperience} years</p>
            <p><strong>Highest Qualification:</strong> {job.highestQualification}</p>
            <p><strong>Qualifications:</strong> {job.highestQualification}</p>
            <p><strong>Spoken Languages</strong> {job.spokenLanguages}</p>
            <p><strong>Teaching Level</strong> {job.teachingLevels}</p>
            <p><strong>Rating</strong> {job.rating}</p>
            <p><strong>Gender</strong> {job.gender}</p>




        
            <span className="flex space-x-4">
  <button
    onClick={handleBookmarkToggle}
    className="text-blue-500 hover:text-blue-600 focus:outline-none"
  >
    {isBookmarked ? (
      <HiBookmark className="w-6 h-6" />
    ) : (
      <HiOutlineBookmark className="w-6 h-6" />
    )}
  </button>
  <button
    onClick={buyContact}
    className="bg-[#041F96] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
  >
    Buy Contacts (100 coins)
  </button>
</span>

            {!isActive ? (
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tutor Details</h2>
            <table className="table-auto w-full border-collapse border border-gray-200 mb-8">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 px-4 py-2 text-left">Categories</th>
    </tr>
  </thead>
  <tbody >
    {job.categories?.map((skill, index) => (
      <span key={index} className="hover:bg-gray-50 ">
        <spacer></spacer>
        <span className="mr-2 py-2 ">{skill},</span>
      </span>
    ))}
  </tbody>
</table>
            <p className="text-black mb-4">{job.description}</p>

            {/* Display Education */}
         {/* Display Education */}
<h2 className="text-xl font-semibold mb-4">Education</h2>
<table className="table-auto w-full border-collapse border border-gray-200 mb-8">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 px-4 py-2 text-left">Degree</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Academy</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
    </tr>
  </thead>
  <tbody>
    {job.education?.map((edu, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border border-gray-200 px-4 py-2">{edu.title}</td>
        <td className="border border-gray-200 px-4 py-2">{edu.academy}</td>
        <td className="border border-gray-200 px-4 py-2">{new Date(edu.year).getFullYear()}</td>
        <td className="border border-gray-200 px-4 py-2">{edu.description}</td>
      </tr>
    ))}
  </tbody>
</table>

{/* Display Past Experiences */}
<h2 className="text-xl font-semibold mb-4">Experience/Achievements</h2>
<table className="table-auto w-full border-collapse border border-gray-200 mb-8">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Company</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Duration</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
    </tr>
  </thead>
  <tbody>
    {job.pastExperiences?.map((experience, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border border-gray-200 px-4 py-2">{experience.title}</td>
        <td className="border border-gray-200 px-4 py-2">{experience.company}</td>
        <td className="border border-gray-200 px-4 py-2">
          {new Date(experience.start_date).getFullYear()} - {new Date(experience.end_date).getFullYear()}
        </td>
        <td className="border border-gray-200 px-4 py-2">{experience.description}</td>
      </tr>
    ))}
  </tbody>
</table>

{/* Display Awards */}
<h2 className="text-xl font-semibold mb-4">Awards</h2>
<table className="table-auto w-full border-collapse border border-gray-200">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 px-4 py-2 text-left">Award</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
      <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
    </tr>
  </thead>
  <tbody>
    {job.awards?.map((award, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border border-gray-200 px-4 py-2">{award.title}</td>
        <td className="border border-gray-200 px-4 py-2">{new Date(award.year).getFullYear()}</td>
        <td className="border border-gray-200 px-4 py-2">{award.description}</td>
      </tr>
    ))}
  </tbody>
</table>



            {/* Video Player */}
          

            {/* Reviews Section */}
            <div className="mt-8 flex flex-col ">
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Rate this Tutor</h2>
              <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Submit Your Review</h3>
          <StarRating rating={rating} reviewedId={Id} onRatingChange={handleRating} />
         
        </div>
            <h2 className="text-xl font-semibold mb-4 mt-8">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review._id} className="border-b mb-4 pb-2">
                  <p><strong>{review.reviewerUsername}</strong></p>
                  <p>Rating - <strong>{review.rating}/5</strong></p>

                  {/* You can pass the rating value here to your StarRating component */}
                  <p>{review.description}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.createdDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}

           

              {/* Comment Section */}
            
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg md:w-2/5 md:ml-4 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Map Location</h2>
          {job.location?.coordinates ? (
              <Map coordinates={job.location.coordinates} />
            ) : (
              <p>Map location not available</p> // Fallback message
            )}
              <div className=" mt-8">
              <div className="video-container my-4">
  {job.video ? (
    <iframe
      className="w-full max-w-lg h-48 rounded-md"
      src={`https://www.youtube.com/embed/${job.video.split('v=')[1]}`}
      title="YouTube Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <p className="text-gray-500">No video available for this job.</p>
  )}
</div>


            </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingDescription;
