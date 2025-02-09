import React, { useState, useEffect } from 'react';
const apiKey = "AIzaSyAK5qSOh-x80wTOpdKP_KkoDomw0C8s4Dw"; 
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign,FaMoneyBillWave, FaClipboard, FaRegClock, FaCalendarAlt, FaCalendarDay, FaChalkboardTeacher, FaVenusMars } from "react-icons/fa";

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
      console.log(IId);
      try {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");
    
        // Check if user type is not 'tutor'
       
    
        if (!token) return;
    
        console.log("Comparing Job:", IId);
      
        const response = await axios.get(
          "https://server.avyudha.com/purchasedNeeds",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        console.log("Comparing Job ID:", IId);
        console.log("Response Data:", response.data);
    
        const purchasedContact =
          response.data?.find(
            (item) => item.learningNeed._id.toString() === IId.toString()
          ) || null;
    
        console.log("Purchased Contact:", purchasedContact);
    
        if (purchasedContact) {
          console.log("Contact Info:", purchasedContact._id);
          setIsContactUnlocked(true);
        } else {
          console.log("No matching job found for the given IId.");
          setIsContactUnlocked(false);
        }
    
        console.log(isContactUnlocked);
      } catch (error) {
        console.error("Error fetching unlocked contacts:", error);
      }
    };
    
    const type = localStorage.getItem('type');
    const fetchBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
       
        if (!token) {
          console.warn("Authentication token not found.");
          
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
        setIsContactUnlocked(true);setContactDetails(purchasedContact.contactInfo); setIsContactModalOpen(true);
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
            <p><strong>Name:</strong> {contactDetails?.name || 'Name not available'}</p>
  
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
  
        alert('Tuition bookmarked successfully!');
      }
  
      setIsBookmarked((prev) => !prev); // Toggle bookmark state on success
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to toggle bookmark. Please try again later.');
    }
  };
  
  const buyContact = async () => {
    
    if (!IId) {
      console.error('Tuition Need ID not available.');
      return;
    }
    const type = localStorage.getItem('type');
    if (type !== "tutor") {
      alert("Only tutors can buy contacts.");
      return; // Stop execution if the user is not a tutor
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
      alert('Contact bought successfully. Please refresh.');
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
      title: job?.requirement || 'Tuition Need',
      text: `Check out this Tuition : ${job?.requirement}`,
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
    return (
      <div className="animate-pulse p-6">
        {/* Profile Image Placeholder */}
        <div className="bg-gray-300 h-24 w-24 sm:h-32 sm:w-32 rounded-full mx-auto sm:mx-0"></div>
  
        {/* Name Placeholder */}
        <div className="h-6 w-48 bg-gray-300 rounded mt-4 mx-auto sm:mx-0"></div>
  
        {/* Content Placeholder */}
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    );
  }

  const statusTag = job.tags?.find(tag => tag.name === "open");
  const isActive = statusTag && statusTag.active;

  return (
    <div className="container mx-auto p-4">
  <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg text-black flex flex-col sm:flex-row md:justify-between items-left mb-6">
    
    <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
      <h1 className="text-3xl font-bold mb-4">{job.requirement}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p className="flex items-center gap-2">
  <FaMapMarkerAlt className="text-black" />
  <strong>Location:</strong>{job.location?.address}, {job.location?.city}, {job.location?.state} ({job.location?.pinCode})
</p>

<p className="flex items-center gap-2">
  <FaMoneyBillWave className="text-black" />
  <strong>Fee:</strong> Up to {job.salary?.max} {job.salary?.period}
</p>



<p className="flex items-center gap-2"> 
  <FaRegClock  className="text-black"/>
  
  <strong> Created:</strong> {" "}
      {(() => {
        const dateObj = new Date(job?.createdAt);
        const hours = dateObj.getHours() % 12 || 12;
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const amPm = dateObj.getHours() >= 12 ? "PM" : "AM";
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();

        return `${hours}:${minutes} ${amPm} ${day}/${month}/${year}`;
      })()}
</p>

<p className="flex items-center gap-2">
  <FaCalendarAlt className="text-black" />
  <strong>Available:</strong> {job.available}
</p>

<p className="flex items-center gap-2">
  <FaCalendarDay className="text-black" />
  <strong>Start Date:</strong> {job.start}
</p>

<p className="flex items-center gap-2">
  <FaChalkboardTeacher className="text-black" />
  <strong>Class Type:</strong> {job.typeOfClass?.join(", ")}
</p>

<p className="flex items-center gap-2">
  <FaVenusMars className="text-black" />
  <strong>Gender Preference:</strong> {job.genderPreference}
</p>
<div>
        <button
        onClick={handleBookmarkToggle}
        className='text-blue-500 hover:text-blue-600 focus:outline-none ml-4'>
         {isBookmarked ? (
      <HiBookmark className="w-6 h-6" />
    ) : (
      <HiOutlineBookmark className="w-6 h-6" />
    )}
  </button>&nbsp;&nbsp;
  {isContactUnlocked ? (
            <button onClick={handleViewContact} className="bg-[#6699CC] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              View Contact
            </button>
          ) : (
            <button
            onClick={buyContact}
            disabled={!job.contactCost || job.contactCost === 0}
            className={`${
              !job.contactCost || job.contactCost === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#041F96] hover:bg-gray-800"
            } text-white font-bold py-2 px-4 rounded transition duration-300`}
          >
            {job.contactCost && job.contactCost > 0
              ? `Buy Contact (${job.contactCost} coins)`
              : "Not Available to Buy"}
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
    </div>
    <div className="md:w-2/5 md:ml-4 mt-4 md:mt-0 -z-40">
 
      
      {job.location?.coordinates ? (
        <Map coordinates={job.location.coordinates} />
      ) : (
        <p>Map location not available</p>
      )}
    </div>
  </div>

  <div className="flex flex-col md:flex-row md:justify-between">
    <div className="bg-white p-6 rounded-lg md:w-3/5">
      <div className="text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800 mb-4"> Details</h2>
        <p className="text-black mb-4">{job.description}</p>

        {/* Display Email and Phone */}
     

      
         
        </div>

       

    </div>
    {/* <button
            onClick={handleShare}
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
            <HiBookmark className="w-6 h-6" />
          </button> */}
    
  </div>
</div>

  );
};

export default NeedDescription;
