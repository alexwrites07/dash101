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
  const [contactDetails, setContactDetails] = useState(null);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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
        const response = await axios.get(`https://server.avyudha.com/learning-need/${IId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/reviews/profile/${IId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    const fetchUnlockedContacts = async () => {
      console.log (IId);
      try {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        // Replace with the actual Id you're comparing against, make sure it's a string or ObjectId
        console.log("Comparing Job ID:", IId);
        if (!token || !type) return;
    
        const response = await axios.get('https://server.avyudha.com/purchasedNeeds', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Debugging: Log the IId and response to ensure correctness
        console.log("Comparing Job ID:", IId);
        console.log("Response Data:", response.data);
        
        // Find the purchased contact that matches the provided IId
        const purchasedContact = response.data?.find(
          (item) => item.learningNeed._id.toString() === IId.toString() // Convert both to strings for comparison
        ) || null;
        
        // Debugging: Log the purchased contact details
        console.log("Purchased Contact:", purchasedContact);
        
        if (purchasedContact) {
          // Log the contactInfo if a match is found
          console.log("Contact Info:", purchasedContact._id);
        } else {
          console.log("No matching job found for the given IId.");
        }
        
        // Set unlockedContacts status based on whether the contact is found
        if (purchasedContact) {
          setIsContactUnlocked(true);
        } else {
          setIsContactUnlocked(false);
        }
        console.log (isContactUnlocked);
      } catch (error) {
        console.error('Error fetching unlocked contacts:', error);
      }
    };
    const type = localStorage.getItem('type');
    const fetchBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
       
        if (!token) {
          console.warn("Authentication token not found.");
          alert ("Please login")
          return;
        }
        const type = localStorage.getItem('type');
        
        const response = await axios.get(`https://server.avyudha.com/dashboard/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const bookmarkedLearningNeeds = response.data.bookmarkedLearningNeeds || [];
        setIsBookmarked(bookmarkedLearningNeeds.includes(IId)); // Check if iid is in the array
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };
    fetchBookmarkStatus();

    fetchJobDetails();
    fetchReviews();
    fetchUnlockedContacts();
  }, [IId]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleViewContact = async () => {
    console.log (IId);
    try {
      const token = localStorage.getItem('token');
      const type = localStorage.getItem('type');
      // Replace with the actual Id you're comparing against, make sure it's a string or ObjectId
      console.log("Comparing Job ID:", IId);
      if (!token || !type) return;
  
      const response = await axios.get('https://server.avyudha.com/purchasedNeeds', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Debugging: Log the IId and response to ensure correctness
      console.log("Comparing Job ID:", IId);
      console.log("Response Data:", response.data);
      
      // Find the purchased contact that matches the provided IId
      const purchasedContact = response.data?.find(
        (item) => item.learningNeed._id.toString() === IId.toString() // Convert both to strings for comparison
      ) || null;
      
      // Debugging: Log the purchased contact details
      console.log("Purchased Contact:", purchasedContact);
      
      if (purchasedContact) {
        // Log the contactInfo if a match is found
        console.log("Contact Info:", purchasedContact._id);
      } else {
        console.log("No matching job found for the given IId.");
      }
      
      // Set unlockedContacts status based on whether the contact is found
      if (purchasedContact) {
        setIsContactUnlocked(true);
      } else {
        setIsContactUnlocked(false);
      }
      console.log (isContactUnlocked);
    } catch (error) {
      console.error('Error fetching unlocked contacts:', error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const ContactModal = ({ contactDetails, isContactModalOpen, setIsContactModalOpen }) => {
    return (
      isContactModalOpen && contactDetails && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Contact Details</h2>
            
            {/* Displaying Contact Number */}
            <p><strong>Contact Number:</strong> {contactDetails?.contactNumber || 'Contact number not available'}</p>
  
            {/* Displaying Email */}
            <p><strong>Email:</strong> {contactDetails?.email || 'Email not available'}</p>
  
            {/* Close Button */}
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsContactModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )
    );
  };
  const handleSubmit = () => {
    setSubmittedComment(comment);
    setComment('');
  };
  const token = localStorage.getItem('token');
  const handleBookmarkToggle = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please login');
      return;
    }
  
    try {
      if (isBookmarked) {
        // Correct DELETE request with token in headers and data in body
        await axios.delete('https://server.avyudha.com/bookmarked-need', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { learningNeedId: IId }, // Payload goes in 'data' for DELETE requests
        });
  
        alert('Unbookmarked successfully!');
      } else {
        // POST request to bookmark
        await axios.post(
          'https://server.avyudha.com/bookmark-need',
          { learningNeedId: IId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        alert('Learning Need bookmarked successfully!');
      }
  
      setIsBookmarked((prev) => !prev); // Toggle bookmark state on success
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to toggle bookmark. Please try again later.');
    }
  };
  
  const buyContact = async () => {
    if (!IId) {
      console.error('Learning Need ID not available.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://server.avyudha.com/purchaseNeed',
        {
          learningNeedId: IId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Contact purchase successful:', response.data);
      alert('Contact bought successfully!');
    } catch (error) {
      if (error.response) {
        console.error('Error purchasing contact:', error.response.data);
        alert(error.response.data.message || 'Error purchasing contact.');
      } else {
        console.error('Error:', error.message);
        alert('An unexpected error occurred.');
      }
    }
  };
  const handleShare = () => {
    const shareData = {
      title: job?.requirement || 'Learning Need',
      text: `Check out this learning need: ${job?.requirement}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
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
      <h1 className="text-3xl font-bold mb-4">{job.requirement}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
        <p><strong>Salary:</strong> Up to {job.salary?.max} {job.salary?.period}</p>
        <p><strong>Requirement:</strong> {job.requirement}</p>
        <p><strong>Available:</strong> {job.available}</p>
        <p><strong>Start Date:</strong> {job.start}</p>
        <p><strong>Class Type:</strong> {job.typeOfClass?.join(", ")}</p>
        <p><strong>Gender Preference:</strong> {job.genderPreference}</p>
        <button
        onClick={handleBookmarkToggle}
        className='text-blue-500 hover:text-blue-600 focus:outline-none ml-4'>
         {isBookmarked ? (
      <HiBookmark className="w-6 h-6" />
    ) : (
      <HiOutlineBookmark className="w-6 h-6" />
    )}
  </button>
  {isContactUnlocked ? (
            <button onClick={handleViewContact} className="bg-[#6699CC] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              View Contact
            </button>
          ) : (
            <button onClick={buyContact} className="bg-[#041F96] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              Buy Contact (100 coins)
            </button>
          )}
            <ContactModal 
        contactDetails={contactDetails} 
        isContactModalOpen={isContactModalOpen} 
        setIsContactModalOpen={setIsContactModalOpen}
      />
        
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

      
         
        </div>

       

    </div>
    {/* <button
            onClick={handleShare}
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
            <HiBookmark className="w-6 h-6" />
          </button> */}
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
