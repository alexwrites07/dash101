import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from './Jobs/Map';
import { FaBuilding, FaMapMarkerAlt, FaStar } from "react-icons/fa";

import StarRating from './Jobs/StarRating';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import './Home.css';

const OrgDescription = () => {
  const navigate = useNavigate();
  const { iid } = useParams();
  const [contactDetails, setContactDetails] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/getOrg/${iid}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/reviews/profile/${iid}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    const fetchUnlockedContacts = async () => {
      console.log (iid);
      try {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        // Replace with the actual Id you're comparing against, make sure it's a string or ObjectId
        
        if (!token || !type) return;
    
        const response = await axios.get(`https://server.avyudha.com/purchasedContacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        // Debugging: Log the ID and contactInfo.id to verify if they match
        console.log("Comparing Id:", `${iid}`);
    
        const purchasedContact1 = response.data?.purchasedContacts?.find(
          (contact) => contact.contactInfo.id.toString() === iid.toString() // Convert both to strings for accurate comparison
        ) || null;
    
        console.log("Found Contact:", purchasedContact1); // Log the found contact or null if not found
    
        // Set unlockedContacts status based on whether the contact is found
        if (purchasedContact1) {
          setIsContactUnlocked(true);
        } else {
          setIsContactUnlocked(false);
        }
      } catch (error) {
        console.error('Error fetching unlocked contacts:', error);
      }
    };
    const fetchBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("Please Login");
          return;
        }
  
        const response = await axios.get('https://server.avyudha.com/dashboard/Tutor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const followingInstitutions = response.data.followingInstitutions || [];
        setIsBookmarked(followingInstitutions.includes(iid)); // Check if iid is in the array
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };
    fetchBookmarkStatus();
    fetchJobDetails();
    fetchReviews();
    fetchUnlockedContacts();
    
  }, [iid]);

  const handleBookmarkToggle = async () => {
    // Ensure token is retrieved (e.g., from localStorage or context)
    const token = localStorage.getItem('token'); // Adjust if your token is stored differently
    
    if (!token) {
      navigate('/login')
      return;
    }
  
    try {
      // Send a POST request to bookmark the tutor
      if (isBookmarked) {
        // DELETE request to unbookmark
        await axios.post('https://server.avyudha.com/tutor/unfollow', 
          { organizationId: iid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
        alert('Unbookmarked successfully!');
       } 
      
       else{
      const response = await axios.post(
        'https://server.avyudha.com/tutor/follow',
        { organizationId: iid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Bookmarked successfully!');
    }
      setIsBookmarked((prev) => !prev); // Toggle the bookmark state on success
      
    } catch (error) {
      console.error('Error bookmarking tutor:', error);
      alert('Only Tutors can bookmark.');
    }
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
  const buyContact = async () => {
    if (!iid) {
      console.error(' ID not available');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://server.avyudha.com/purchaseContact',
        {
          contactId: iid,
          contactType: 'Organization'
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
      alert ("Only Tutor to be able to view contact/You have already bought the contact")
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    setSubmittedComment(comment);
    setComment('');
  };
  const handleViewContact = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('https://server.avyudha.com/purchasedContacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      // Loop through purchasedContacts array and find the contact with matching ID
      const purchasedContact = response.data?.purchasedContacts?.find(
        (contact) => contact.contactInfo.id === iid // Access contactInfo.id
      )?.contactInfo || null; // If not found, return null
    
      console.log(purchasedContact);
    
      if (purchasedContact) {
        setContactDetails(purchasedContact

          
        );  // Set the contact details to your state
        setIsContactModalOpen(true);  // Open modal with contact details
      } else {
        alert('Contact not found in purchased contacts.');
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
      alert('Failed to fetch contact details.');
    }
    
  };
  if (error) return <p>{error}</p>;
  if (!job) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg text-black flex flex-col sm:flex-row md:justify-between items-center mb-6">
        <div className="md:w-1/4 mb-4 md:mb-0">
          {job.logo ? (
            <img src={`https://server.avyudha.com/org/download/logo/${job._id}`} alt={job.name} className="w-56 h-56 rounded-full  object-cover rounded" />
          ) : (
            <p>No logo available</p>
          )}
        </div>
        <div className="md:w-full mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.name}
          <button
             onClick={handleBookmarkToggle}
             className='text-blue-500 hover:text-blue-600 focus:outline-none ml-4'>
         {isBookmarked ? (
      <HiBookmark className="w-6 h-6" />
    ) : (
      <HiOutlineBookmark className="w-6 h-6" />
    )}
  </button>&nbsp; &nbsp;&nbsp;&nbsp;</h1>
          {/* <p><strong>Category:</strong> {job.category}</p> */}
          <p className="flex items-center gap-2">
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white">
    <FaBuilding />
  </span>
  <strong>Organization Type:</strong> {job.organizationType}
</p>

<p className="flex items-center gap-2 mt-2">
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white">
    <FaMapMarkerAlt />
  </span>
  <strong>Location:</strong> {job.location.city}, {job.location?.state}
</p>

<p className="flex items-center gap-2 mt-2">
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white">
    <FaStar />
  </span>
  <strong>Rating:</strong> {job.rating}
</p>

          {/* <p><strong>Location:</strong> {job.profileViews.count}</p> */}
          <br></br>
          {/* <button onClick={handleBookmarkToggle} className="text-blue-500  hover:text-blue-600 focus:outline-none ">
            {isBookmarked ? <HiBookmark className="w-6 h-6" /> : <HiOutlineBookmark className="w-6 h-6" />}
          </button> */}
      
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="bg-white p-6 rounded-lg md:w-3/5">
          <div className="text-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Organization Details</h2>
            <p className="text-black mb-4">{job.description}</p>
            {/* <h2 className="text-xl font-semibold mb-2">Subjects Required</h2>
            <ul className="list-disc ml-6">
              {job.subjectsRequired?.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul> */}

            {/* <h2 className="text-xl font-semibold mb-2 mt-6">Job Postings</h2>
            <ul className="list-disc ml-6">
              {job.jobPostings?.map((postId, index) => (
                <li key={index}>{postId}</li>
              ))}
            </ul> */}
  <h2 className="text-xl font-semibold text-gray-800 mt-4">Rate this Organization</h2>
              <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Submit Your Review</h3>
          <StarRating rating={rating} reviewedId={iid} onRatingChange={handleRating} />
         
        </div>
            <h2 className="text-xl font-semibold mb-2 mt-6">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review._id} className="border-b mb-4 pb-2">
                  <p><strong>{review.reviewerUsername}</strong></p>
                  <p>Rating - <strong>{review.rating}/5</strong></p>
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
