import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import { HiBookmark, HiOutlineBookmark} from 'react-icons/hi';
import StarRating from './StarRating';
import '../Home.css';
import { FaMapMarkerAlt, FaMoneyBillWave, FaRegClock, FaBriefcase, FaGraduationCap, FaLevelUpAlt, FaCalendarAlt, FaUserClock, FaLaptop } from 'react-icons/fa';


const JobDescription = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [rating, setRating] = useState(0);
  const [contactDetails, setContactDetails] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/getjobs/${jobId}`);
        setJob(response.data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    const fetchUnlockedContacts = async () => {
      console.log (jobId);
      try {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        // Replace with the actual Id you're comparing against, make sure it's a string or ObjectId
        
        if (!token || !type) return;
    
        const response = await axios.get('https://server.avyudha.com/tutor/purchased-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Debugging: Log the jobId and response to ensure correctness
        console.log("Comparing Job ID:", jobId);
        console.log("Response Data:", response.data);
        
        // Find the purchased contact that matches the provided jobId
        const purchasedContact = response.data?.find(
          (item) => item.job._id.toString() === jobId.toString() // Convert both to strings for comparison
        ) || null;
        
        // Debugging: Log the purchased contact details
        console.log("Purchased Contact:", purchasedContact);
        
        if (purchasedContact) {
          // Log the contactInfo if a match is found
          console.log("Contact Info:", purchasedContact.contactInfo);
        } else {
          console.log("No matching job found for the given jobId.");
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
    const fetchBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("Authentication token not found.");
          return;
        }
  
        const response = await axios.get('https://server.avyudha.com/dashboard/Tutor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const shortlistedJobs = response.data.shortlistedJobs || [];
        setIsBookmarked(shortlistedJobs.includes(jobId)); // Check if iid is in the array
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };
    fetchBookmarkStatus();

    fetchJobDetails();
    fetchUnlockedContacts();
    const checkIfApplied = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('https://server.avyudha.com/dashboard/Tutor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const appliedJobs = response.data.appliedJobs || [];
        if (appliedJobs.includes(jobId)) {
          setIsApplied(true);
          console.log(isApplied);
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    checkIfApplied();
  
  }, [jobId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const ContactModal = ({ contactDetails, isContactModalOpen, setIsContactModalOpen }) => {
    return (
      isContactModalOpen && contactDetails && (
        <div className="modal fixed inset-0 bg-gray-500 z-40 bg-opacity-50 flex justify-center items-center">
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
  const handleViewContact = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('https://server.avyudha.com/tutor/purchased-jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      // Loop through purchasedContacts array and find the contact with matching ID
      const purchasedContact = response.data?.find(
        (contact) => contact.job._id.toString() === jobId.toString() // Access contactInfo.id
      )?.contactInfo || null; // If not found, return null
    
      console.log(purchasedContact);
    
      if (purchasedContact) {
        setContactDetails(purchasedContact);  // Set the contact details to your state
        setIsContactModalOpen(true);  // Open modal with contact details
      } else {
        alert('Contact not found in purchased contacts.');
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
      alert('Failed to fetch contact details.');
    }
    
  };
  const buyContact = async () => {
    const token = localStorage.getItem("token");
    if (!token)
      navigate('/login');
    else{
    if (!job?.employer) {
      console.error("Employer ID not available");
      return;
    }
   
    try {
     
  
      // Fetch purchased jobs

      const checkResponse = await axios.get(
        "https://server.avyudha.com/tutor/purchased-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Ensure the response is an array
      const purchasedJobs = Array.isArray(checkResponse.data) ? checkResponse.data : [];
  
      // Check if the job is already purchased
      const isJobPurchased = purchasedJobs.some(
        (purchasedJob) => purchasedJob.job._id === jobId
      );
      console.log (purchasedJobs);console.log (purchasedJobs);console.log (purchasedJobs);
  
      if (isJobPurchased) {
        setIsContactUnlocked(true);
        console.log ("contact", isContactUnlocked)
        alert("This job is already purchased by you. You cannot buy it again.");
      } else {
        // Proceed with purchasing the contact
        const purchaseResponse = await axios.post(
          "https://server.avyudha.com/purchaseJob",
          {
            jobId :jobId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("Contact purchase successful:", purchaseResponse.data);
        alert("Contact Bought. Please refresh.");
      }
    } catch (error) {
      // Log the full error object for debugging
      console.error("Error details:", error);
    
      // Check if the error has a response (server-side error)
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data.message || "An error occurred"}`);
      } else if (error.request) {
        // Error with the request (no response received)
        alert("Error: No response received from the server. Please try again.");
      } else {
        // General error
        alert(`Error: ${error.message}`);
      }
    }
  }
  };
  
  const handleBookmarkToggle = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      navigate('/login');
      return;
    }
  
    try {
      // Fetch tutor ID from dashboard endpoint
      if (isBookmarked) {
        // DELETE request to unbookmark
        await axios.delete('https://server.avyudha.com/tutor/shortlist-job', {
          data: { jobId:jobId },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Unbookmarked successfully!');
       } else{
      const dashboardResponse = await axios.get(
        'https://server.avyudha.com/dashboard/Tutor',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const tutorId = dashboardResponse.data._id;
  
      // Send POST request to bookmark the tutor
      await axios.post(
        'https://server.avyudha.com/tutor/shortlist-job',
        {
          tutorId,
          jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Bookmarked successfully!');
    }
      setIsBookmarked((prev) => !prev); // Toggle bookmark state
    
    } catch (error) {
    
  
      alert('Only Tutors can bookmark.');
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

  const applyForJob = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    if (!token) {
      navigate('/login');
      return;
    }
    if (userType !== 'tutor') {
      alert('Only tutors can apply for this job');
      return;
    }

    try {
      const tutorResponse = await axios.get('https://server.avyudha.com/dashboard/Tutor', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tutorId = tutorResponse.data._id;

      const applyResponse = await axios.post(
        'https://server.avyudha.com/tutor/apply-job',
        { tutorId, jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Application successful:', applyResponse.data);
      alert('Job Applied');
      setIsApplied(true);
    } catch (error) {
      alert('Already applied for this job');
      console.error('Error applying for job:', error);
    }
  };

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

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg text-black flex flex-col sm:flex-row md:justify-between items-center mb-6">
    
        <div className="md:w-3/4 mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}<spacer><spacer></spacer></spacer>&nbsp;
          <button
    onClick={handleBookmarkToggle}
    className="text-blue-500 hover:text-blue-600 focus:outline-none "
  >
    {isBookmarked ? (
      <HiBookmark className="w-6 h-6" />
    ) : (
      <HiOutlineBookmark className="w-6 h-6" />
    )}
  </button></h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaMapMarkerAlt />
  </span>
  <strong>Location:</strong> {job.location ? `${job.location.address}, ${job.location.city}, ${job.location.state} (${job.location?.pinCode})` : 'Location information not available'}
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaMoneyBillWave />
  </span>
  <strong>Salary:</strong> {job.salary?.min} - {job.salary?.max} ({job.salary?.period})
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaBriefcase />
  </span>
  <strong>Experience:</strong> {job.experience} years
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaGraduationCap />
  </span>
  <strong>Qualification:</strong> {job.qualification}
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaLevelUpAlt />
  </span>
  <strong>Gender:</strong> {job.gender}
</p>
{/* <p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaUserClock />
  </span>
  <strong>Commitment:</strong> {job.workDetails?.commitment}
</p> */}
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaLaptop />
  </span>
  <strong>Mode:</strong> {job.workDetails?.mode}
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaCalendarAlt />
  </span>
  <strong>Application Deadline:</strong> {new Date(job.lastDateToApply).toLocaleDateString()}
</p>
<p>
  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
    <FaRegClock />
  </span>
  <strong>Job Created:</strong>  {" "}
      {(() => {
        const dateObj = new Date(job.jobCreated);
        const hours = dateObj.getHours() % 12 || 12;
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const amPm = dateObj.getHours() >= 12 ? "PM" : "AM";
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();

        return `${hours}:${minutes} ${amPm} ${day}/${month}/${year}`;
      })()}
</p>

            {job.isClosed ? (
              <p className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-semibold mx-auto -ml-1">
                Closed
              </p>
            ) : (
              <>
              <button
      onClick={isApplied ? null : applyForJob}
      className={`md:w-48 text-white font-bold py-2 px-4 rounded transition duration-300 mt-2 ${
        isApplied
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-[#041F96] hover:bg-gray-800'
      }`}
      disabled={isApplied}
    >
      {isApplied ? 'Already Applied' : 'Apply'}
    </button>
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
  
              </>
            )}
          </div>
        </div>
        <div className="md:w-2/5 ml-4 w-full -z-40">
  {job.location?.coordinates ? (
    <Map coordinates={job.location.coordinates} />
  ) : (
    <p>Map location not available</p>
  )}
</div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="text-gray-600 md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
            <p className="text-black mb-4">{job.description}</p>
            
           
          
          </div>
          
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
            <form>
              <input type="file" className="mb-4 w-full" />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
