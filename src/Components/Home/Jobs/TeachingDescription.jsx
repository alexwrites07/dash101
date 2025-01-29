import React, { useState, useEffect,  } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaBriefcase, FaGraduationCap, FaLanguage, FaLevelUpAlt, FaStar, FaVenusMars } from 'react-icons/fa';
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";

Modal.setAppElement("#root");
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
  const [purchasedContact1,setPurchasedContact1]=useState();
  const [contactDetails, setContactDetails] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reviews, setReviews] = useState([]); // State for reviews
  const navigate = useNavigate();
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

    const fetchUnlockedContacts = async () => {
      console.log (Id);
      try {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        // Replace with the actual Id you're comparing against, make sure it's a string or ObjectId
        
        if (!token || !type) return;
    
        const response = await axios.get(`https://server.avyudha.com/purchasedContacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        // Debugging: Log the ID and contactInfo.id to verify if they match
        console.log("Comparing Id:", `${Id}`);
    
        const purchasedContact1 = response.data?.purchasedContacts?.find(
          (contact) => contact.contactInfo.id.toString() === Id.toString() // Convert both to strings for accurate comparison
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
    
    

    fetchJobDetails();
    fetchUnlockedContacts();
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([
    { startTime: "10:00", endTime: "11:00" },
    { startTime: "12:00", endTime: "13:00" },
    { startTime: "14:00", endTime: "15:00" },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleDateChange = (date) => setSelectedDate(date);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen1(true); // Open modal for meeting details
  };

  const handleFormSubmit = async () => {
    const payload = {
      tutorId:Id,
      meetingTitle:meetingTitle,
      date: selectedDate.toISOString().split("T")[0],
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      duration: parseInt(duration),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://server.avyudha.com/meetings/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Meeting scheduled successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while scheduling the meeting.");
      console.error(error);
    }

    setIsModalOpen1(false); // Close modal
  };
  const [message, setMessage] = useState(''); // To store the message content
  const [isSending, setIsSending] = useState(false); // To handle the loading state of the send button

  // Handle the send message logic
  const sendMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    try {
      setIsSending(true); // Start the loading state

      const payload = {
        recipientId: contactDetails?.id, // Assuming `id` is the unique identifier for the recipient
        message: message.trim(), // Use the trimmed message
      };

      // Send the message
      const response = await axios.post('https://server.avyudha.com/send-message', payload,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Message sent successfully');
        setMessage(''); // Clear the message after sending
      } else {
        setError('Failed to send message');
      }
    } catch (error) {
      setError('Error sending message');
    } finally {
      setIsSending(false); // End the loading state
    }
  };

  const buyContact = async () => {
    if (!Id) {
      console.error('ID not available');
      return;
    }
  
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
  
    try {
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
      alert("Contact Bought");
  
    } catch (error) {
      // Check if the error has a response and handle it
      if (error.response) {
        console.error('Error purchasing contact:', error.response.data);
        alert(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        console.error('Error with the request:', error.request);
        alert('Error with the request');
      } else {
        console.error('Error setting up the request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  const ContactModal = ({ contactDetails, isContactModalOpen, job, setIsContactModalOpen }) => {
    return (
      isContactModalOpen && contactDetails && (
        <div className="modal fixed inset-0 bg-gray-500 z-50 bg-opacity-50 flex justify-center items-center">
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Contact Details</h2>
          <p><strong>Contact Number:</strong> {contactDetails?.contactNumber || 'Contact number not available'}</p>
          <p><strong>Email:</strong> {contactDetails?.email || 'Email not available'}</p>
          <p><strong>Name:</strong> {contactDetails?.name || 'Name not available'}</p>
        

            {/* Close Button */}
            <button
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
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
      const response = await axios.get('https://server.avyudha.com/purchasedContacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      // Loop through purchasedContacts array and find the contact with matching ID
      const purchasedContact = response.data?.purchasedContacts?.find(
        (contact) => contact.contactInfo.id === Id // Access contactInfo.id
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
    
    if (!token){
      navigate('/login');}
  else{
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
  }
  };
  
  const handleDateSelection = (date) => {
    setSelectedDate(date);

    // Get the day of the week from the selected date
    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

    // Check if the day exists in the freeSlots object
    if (job.freeSlots[dayOfWeek]) {
      setAvailableSlots(job.freeSlots[dayOfWeek]);
    } else {
      setAvailableSlots([]); // No slots available for the selected day
    }
  };

  const handleSlotSelection1 = (slot) => {
    console.log("Selected Slot:", slot);
    // You can open a pop-up for meeting title and duration after this
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
  {/* Image Section */}
  <div className="sm:w-1/4 w-full flex justify-center sm:block mb-4 sm:mb-0">
    <img
      src={`https://server.avyudha.com/tutors/download/image/${Id}`}
      alt={job.title}
      className="w-32 h-32 sm:w-full sm:h-64 object-cover rounded-full sm:rounded-md"
    />
  </div>

  {/* Name & Details */}
  <div className="sm:w-1/2 w-full ml-12">
  <h1 className="text-xl sm:text-3xl md:ml-0 -ml-12 font-bold mt-2  text-center mb-4 sm:text-left">
  {job.fullName}
</h1>

    <div className="grid grid-cols-1 text-left  sm:grid-cols-2 gap-2 sm:gap-4 sm:text-left">
      <p><FaMapMarkerAlt className="inline-block mr-2 text-black" /><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
      <p><FaMoneyBillWave className="inline-block mr-2 text-black" /><strong>Salary:</strong> {job.jobAlerts?.minExpectedSalary?.value} - {job.jobAlerts?.maxExpectedSalary?.value}</p>
      <p><FaClock className="inline-block mr-2 text-black" /><strong>Salary Period:</strong> {job.jobAlerts?.minExpectedSalary?.period}</p>
      <p><FaBriefcase className="inline-block mr-2 text-black" /><strong>Experience:</strong> {job.totalExperience} years</p>
      <p><FaGraduationCap className="inline-block mr-2 text-black" /><strong>Highest Qualification:</strong> {job.highestQualification}</p>
      <p><FaGraduationCap className="inline-block mr-2 text-black" /><strong>Qualifications:</strong> {job.highestQualification}</p>
      <p><FaLanguage className="inline-block mr-2 text-black" /><strong>Spoken Languages:</strong> {job.spokenLanguages}</p>
      <p><FaLevelUpAlt className="inline-block mr-2 text-black" /><strong>Teaching Level:</strong> {job.teachingLevels}</p>
      <p><FaStar className="inline-block mr-2 text-black" /><strong>Rating:</strong> {job.rating}</p>
      <p><FaVenusMars className="inline-block mr-2 text-black" /><strong>Gender:</strong> {job.gender}</p>
    </div>

    {/* Actions */}
    <div className="flex space-x-4 justify-center sm:justify-start mt-4">
   

      {job.classCost > 0 ? (
        <button
          onClick={() => setIsModalOpen1(true)}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Book a Meet
        </button>
      ) : isContactUnlocked ? (
        <div className="flex flex-col  items-left text-left space-y-2 sm:space-y-0 sm:space-x-4">
  {/* Bookmark and View Contact (Same Row on Small Screens) */}
  <div className="flex w-full mb-2 sm:w-auto justify-left sm:justify-start space-x-2">
    <button onClick={handleBookmarkToggle} className="text-blue-500 hover:text-blue-600 focus:outline-none">
      {isBookmarked ? <HiBookmark className="w-6 h-6" /> : <HiOutlineBookmark className="w-6 h-6" />}
    </button>

    <button onClick={handleViewContact} className="bg-[#6699CC] w-32 sm:w-48 text-white font-bold py-2 px-2 sm:px-4 rounded hover:bg-gray-800 transition duration-300">
      View Contact
    </button>
  </div>

  {/* Message Input (New Row on Small Screens) */}
  <div className="w-full mt-2 flex  items-center space-y-2 sm:space-y-0 sm:space-x-4">
    <textarea
      className="w-full sm:w-auto p-2 border rounded-lg resize-none h-[40px] sm:h-[80px] min-w-[180px] sm:min-w-[300px] overflow-auto"
      placeholder="Write your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows="2"
    />

    <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600" onClick={sendMessage} disabled={isSending}>
      {isSending ? "Sending..." : "Send"}
    </button>
  </div>
</div>

      ) : (
        <button
          onClick={buyContact}
          disabled={!job.contactCost || job.contactCost === 0}
          className={`${
            !job.contactCost || job.contactCost === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#041F96] hover:bg-gray-800"
          } text-white font-bold py-2 px-4 rounded transition duration-300`}
        >
          {job.contactCost && job.contactCost > 0 ? `Buy Contact (${job.contactCost} coins)` : "Not Available to Buy"}
        </button>
      )}
    </div>
  </div>

  {/* Additional Content for Laptop View */}
  <div className="md:w-1/4 flex flex-col items-end"></div>
</div>


      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="bg-white p-6 rounded-lg md:w-2/5 sm:w-2/5">
          <div className="text-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tutor Details</h2>
            <table className="table-auto border-collapse border border-gray-200 mb-8">
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
      <th className="border border-gray-200 px-4 py-2 text-left hidden sm:table-cell">Description</th>
    </tr>
  </thead>
  <tbody>
    {job.education?.map((edu, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border border-gray-200 px-4 py-2">{edu.title}</td>
        <td className="border border-gray-200 px-4 py-2">{edu.academy}</td>
        <td className="border border-gray-200 px-4 py-2">{new Date(edu.year).getFullYear()}</td>
        <td className="border border-gray-200 px-4 py-2 hidden sm:table-cell">{edu.description}</td>
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
      <th className="border border-gray-200 px-4 py-2 text-left hidden sm:table-cell">Description</th>
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
        <td className="border border-gray-200 px-4 py-2 hidden sm:table-cell">{experience.description}</td>
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
