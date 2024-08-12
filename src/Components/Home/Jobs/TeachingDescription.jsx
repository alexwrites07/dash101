import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import StarRating from './StarRating';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import '../Home.css';
// import StarRating from './StarRating';

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
    // You can send the rating to your backend server here
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
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Location:</strong> {job.location?.city}, {job.location?.state} ({job.location?.pinCode})</p>
            <p><strong>Salary:</strong> {job.preferredTeachingAreas}</p>
            <p><strong>Experience:</strong> {job.subjectsTaught}</p>
            <p><strong>Qualification:</strong> {job.fullName}</p>
            {!isActive ? (
              <button
                onClick={openModal}
                className="bg-[#041F96] text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 mt-2"
              >
                Invite
              </button>
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
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <h2 className="text-xl font-semibold mb-2 mt-6">Experience/Achievements</h2>
            {/* <ul className="list-disc list-inside mb-4">
              {job.pastExperiences?.map((experience, index) => (
                <li key={index}>{experience}</li>
              ))}
            </ul> */}
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate this Tutor</h2>
            <StarRating/>
            {/* <StarRating count={5} rating={rating} onRating={handleRating} />
            <p className="text-gray-600 mt-2">Rating: {rating} / 5</p> */}
            
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
          <p><strong>Qualification:</strong> <br />{job.fullName}</p>
          {job.facebookId && <p><strong>Facebook:</strong> <a href={job.facebookId} target="_blank" rel="noopener noreferrer">{job.facebookId}</a></p>}
          {job.googleId && <p><strong>Google:</strong> <a href={job.googleId} target="_blank" rel="noopener noreferrer">{job.googleId}</a></p>}
          {job.linkedinId && <p><strong>LinkedIn:</strong> <a href={job.linkedinId} target="_blank" rel="noopener noreferrer">{job.linkedinId}</a></p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="bg-white p-6 rounded-lg  md:w-2/5 ml-4 mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Job Location</h2>
          {job.location?.coordinates ? (
            <Map coordinates={job.location.coordinates} />
          ) : (
            <p>Location not available</p>
          )}
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

export default TeachingDescription;
