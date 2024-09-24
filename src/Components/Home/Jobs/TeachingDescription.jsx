import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import StarRating from './StarRating';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import '../Home.css';
import { Link } from 'react-router-dom';

const TeachingDescription = () => {
  const { Id } = useParams();
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getTutor/${Id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    fetchJobDetails();
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
        <div className="md:w-1/4 mb-4 md:mb-0">
          {job.image && job.image.length > 0 ? (
            <img src={job.image} alt={job.title} className="w-full h-56 object-cover rounded-md" />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="md:w-1/2 mb-4 md:mb-0 ml-8">
          <h1 className="text-3xl font-bold mb-4">{job.fullName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
            <p><strong>Salary:</strong> {job.jobAlerts?.minExpectedSalary?.value} - {job.jobAlerts?.maxExpectedSalary?.value}</p>
            <p><strong>Experience:</strong> {job.totalExperience} years</p>
            <p><strong>Qualification:</strong> {job.highestQualification}</p>
            {!isActive ? (
              <Link to="/login">
              <button
                className="bg-[#041F96] md:w-48 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 mt-2"
              >
                Invite
              </button>
            </Link>
            ) : (
              <p className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-semibold mx-auto -ml-1">
                Closed
              </p>
            )}
             <button className="text-blue-500 ml-6 hover:text-blue-600 focus:outline-none mr-8">
                {job.bookmarked ? <HiBookmark className="w-6 h-6" /> : <HiOutlineBookmark className="w-6 h-6" />}
             </button>
          </div>
        </div>
        <div className="md:w-1/4 flex flex-col items-end">
          {/* Additional content if needed */}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="bg-white p-6 rounded-lg  md:w-3/5">
          <div className="text-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tutor Details</h2>
            <p className="text-black mb-4">{job.description}</p>

            {/* Display Education */}
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {job.education?.map((edu, index) => (
              <div key={index}>
                <p><strong>Degree:</strong> {edu.title}</p>
                <p><strong>Academy:</strong> {edu.academy}</p>
                <p><strong>Year:</strong> {new Date(edu.year).getFullYear()}</p>
                <p><strong>Description:</strong> {edu.description}</p>
              </div>
            ))}

            {/* Display Past Experiences */}
            <h2 className="text-xl font-semibold mb-2 mt-6">Experience/Achievements</h2>
            {job.pastExperiences?.map((experience, index) => (
              <div key={index}>
                <p><strong>Role:</strong> {experience.title}</p>
                <p><strong>Company:</strong> {experience.company}</p>
                <p><strong>Duration:</strong> {new Date(experience.start_date).getFullYear()} - {new Date(experience.end_date).getFullYear()}</p>
                <p><strong>Description:</strong> {experience.description}</p>
              </div>
            ))}

            {/* Display Awards */}
            <h2 className="text-xl font-semibold mb-2 mt-6">Awards</h2>
            {job.awards?.map((award, index) => (
              <div key={index}>
                <p><strong>Award:</strong> {award.title}</p>
                <p><strong>Year:</strong> {new Date(award.year).getFullYear()}</p>
                <p><strong>Description:</strong> {award.description}</p>
              </div>
            ))}
          </div>
          
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
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Comment
              </button>
              {submittedComment && (
                <div className="mt-4 p-2 border border-gray-300 rounded-lg">
                  <h4 className="font-semibold">Your Comment:</h4>
                  <p>{submittedComment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-[#1967D212] p-6 rounded-lg shadow-lg md:w-2/5 ml-4 mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tutor Information</h2>
          <p><strong>Location:</strong> <br />{job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
          <p><strong>Areas:</strong><br /> {job.preferredTeachingAreas}</p>
          <p><strong>Gender:</strong> <br />{job.gender}</p>
          <p><strong>Years of Experience:</strong> <br />{job.totalExperience}</p>
          <p><strong>Subjects:</strong> <br />{job.subjectsTaught}</p>
          <p><strong>Qualification:</strong> <br />{job.highestQualification}</p>
      
        <div className="bg-white p-6 rounded-lg   ml-4 mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Job Location</h2>
          {job.location?.coordinates ? (
            <Map coordinates={job.location.coordinates} />
          ) : (
            <p>Location not available</p>
          )}
      
      </div>
        </div>
        
      </div>
   
 </div> ); };

export default TeachingDescription;