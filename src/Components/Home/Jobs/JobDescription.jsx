import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import { HiBookmark, HiOutlineBookmark} from 'react-icons/hi';
import StarRating from './StarRating';
import '../Home.css';

const JobDescription = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
  }, [jobId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const buyContact = async () => {
    if (!job?.employer) {
      console.error("Employer ID not available");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
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
  
      if (isJobPurchased) {
        alert("This job is already purchased by you. You cannot buy it again.");
      } else {
        // Proceed with purchasing the contact
        const purchaseResponse = await axios.post(
          "https://server.avyudha.com/purchaseContact",
          {
            contactId: job.employer,
            contactType: "Organization",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("Contact purchase successful:", purchaseResponse.data);
        alert("Contact Bought");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleBookmarkToggle = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert("Authentication token not found. Please log in again.");
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
  

  const applyForJob = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    if (userType !== 'tutor') {
      navigate('/login');
      return;
    }

    try {
      const tutorResponse = await axios.get('https://server.avyudha.com/dashboard/Tutor', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const tutorId = tutorResponse.data._id;

      const applyResponse = await axios.post(
        'https://server.avyudha.com/tutor/apply-job',
        {
          tutorId,
          jobId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Application successful:', applyResponse.data);
      alert("Job Applied");
    } catch (error) {
      alert ("ALready applied for this job");
      console.error('Error applying for job:', error);
    }
  };

  if (!job) return <p>Loading...</p>;

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
            <p><strong>Location:</strong> {job.location ? `${job.location.city}, ${job.location.state} (${job.location.pinCode})` : 'Location information not available'}</p>
            <p><strong>Salary:</strong> {job.salary.min} - {job.salary.max} ({job.salary.period})</p>
            <p><strong>Experience:</strong> {job.experience} years</p>
            <p><strong>Qualification:</strong> {job.qualification}</p>
            <p><strong>Career Level:</strong> {job.careerLevel}</p>
            <p><strong>Commitment:</strong> {job.workDetails.commitment}</p>
            <p><strong>Mode:</strong> {job.workDetails.mode}</p>
            <p><strong>Application Deadline:</strong> {new Date(job.lastDateToApply).toLocaleDateString()}</p>
            
            {job.isClosed ? (
              <p className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-semibold mx-auto -ml-1">
                Closed
              </p>
            ) : (
              <>
                <button
                  onClick={applyForJob}
                  className="bg-[#041F96] md:w-48 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 mt-2"
                >
                  Apply
                </button>
                <button
                  onClick={buyContact}
                  className="bg-[#041F96] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 mt-2"
                >
                  Buy Contacts (100 coins)
                </button>
           
  
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="text-gray-600 md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
            <p className="text-black mb-4">{job.description}</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Key Responsibilities</h2>
            <ul className="list-disc list-inside mb-4">
              {(job.keyResponsibilities || []).map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">Required Skills & Experience</h2>
            <ul className="list-disc list-inside mb-4">
              {(job.skillAndExperience || []).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-6">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review._id} className="border-b mb-4 pb-2">
                  <p><strong>{review.reviewerUsername}</strong></p>
                  <StarRating rating={review.rating} />
                  <p>{review.description}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.createdDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          <div className="md:w-2/5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Location</h2>
            {job.location?.coordinates ? (
              <Map coordinates={job.location.coordinates} />
            ) : (
              <p>Map location not available</p>
            )}
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
