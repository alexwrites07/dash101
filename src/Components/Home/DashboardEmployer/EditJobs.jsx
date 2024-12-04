import React, { useState, useEffect } from 'react';
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";
import { useParams, useNavigate } from 'react-router-dom';

const EditJobs = () => {
  // State for form fields
  // fetch jobId from route 
  
  const { jobid } = useParams(); // Get jobId from URL params
  console.log("JobId: " + jobid);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8';
  const [featuredImage, setFeaturedImage] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [tags, setTags] = useState('');
  const [gender, setGender] = useState('');
  const [jobApplyType, setJobApplyType] = useState('');
  const [externalURL, setExternalURL] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [careerLevel, setCareerLevel] = useState('');
  const [qualification, setQualification] = useState('');
  const [introductionVideo, setIntroductionVideo] = useState('');
  const [photos, setPhotos] = useState(null);
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [friendlyAddress, setFriendlyAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const [error, setError] = useState('');
  const [mapsLocation, setMapsLocation] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch job data from backend when the component mounts
  // Fetch job data from backend when the component mounts
useEffect(() => {
  const fetchJobDetails = async () => {
    try {
      console.log("Fetching job details for job ID:", jobid); // Add debug logs
      
      const response = await fetch(
        `https://server.avyudha.com/getJobs/${jobid}`, // Correct GET endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use your actual token
          },
        }
      );
      
      // Check the status of the response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response error message:', errorText);
        throw new Error(`Failed to fetch job details. Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched job data:', data); // Log the fetched data to check the response

      // Set the state with the fetched data
      setJobTitle(data.job?.title || '');
      setJobDescription(data.job?.description || '');
      setCategory(data.job?.category || '');
      setJobType(data.job?.workDetails?.mode || '');
      setTags(data.job?.tags?.map(tag => tag.name).join(', ') || '');
      setGender(data.job?.gender || '');
      setJobApplyType(data.job?.applyType || '');
      setExternalURL(data.job?.externalURL || '');
      setApplyEmail(data.job?.applyEmail || '');
      setMinSalary(data.job?.salary?.min || '');
      setMaxSalary(data.job?.salary?.max || '');
      setSalaryType(data.job?.salary?.period || '');
      setExperience(data.job?.experience || '');
      setCareerLevel(data.job?.careerLevel || '');
      setQualification(data.job?.qualification || '');
      setIntroductionVideo(data.job?.introductionVideo || '');
      setApplicationDeadline(data.job?.lastDateToApply || '');
      setFriendlyAddress(data.job?.location?.city || '');
      setLatitude(data.job?.location?.coordinates[1] || '');
      setLongitude(data.job?.location?.coordinates[0] || '');
      updateMapSrc(data.job?.location?.coordinates[1], data.job?.location?.coordinates[0]);

    } catch (error) {
      console.error('Error fetching job details:', error.message); // Log the specific error
      setError(`Error fetching job details: ${error.message}`);
    }
  };

  fetchJobDetails();
}, [jobid]);

  // Handlers for location
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
    updateMapSrc(e.target.value, longitude);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
    updateMapSrc(latitude, e.target.value);
  };

  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          updateMapSrc(latitude, longitude);
          setError('');
        },
        (err) => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const updateMapSrc = (lat, lon) => {
    setMapSrc(
      `https://www.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed`
    );
  };

  const handleImageUpload = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handlePhotoUpload = (e) => {
    setPhotos(e.target.files);
  };
  
  const saveJobPost = async () => {
    const payload = {
      description: jobDescription,
      gender: gender,
      salary: {
        min: minSalary,
        max: maxSalary,
        period: salaryType,
      },
      location: {
        city: friendlyAddress,
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      title: jobTitle,
      experience: experience,
      qualification: qualification,
      careerLevel: careerLevel,
      tags: tags.split(',').map(tag => ({ name: tag.trim(), active: true })), // Assuming each tag is active
      lastDateToApply: applicationDeadline,
    };
  
    try {
      const response = await fetch(
        `https://server.avyudha.com/editJob/${jobid}`, // Endpoint to edit job
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token for authorization
          },
          body: JSON.stringify(payload), // Send the payload as JSON
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update job. Status: ${response.status}, Message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Job updated successfully:', data);
  
      // Redirect to '/my-jobs-employer' after successful update
      navigate('/my-jobs-employer'); // Redirect to "My Jobs" page
      // Add any success message or redirection here if necessary
      // e.g., navigate to another page or show a success message
    } catch (error) {
      console.error('Error updating job:', error);
      setError(`Error updating job: ${error.message}`);
    }
  };
  


  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">
        <Sidebar />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 ">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Job</h1>
          <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Job Details</h2>

            {/* Featured Image */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Featured Image</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                onChange={handleImageUpload}
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Job Title *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Job Description *</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Two Columns Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Left Column */}
              <div>
                {/* Category */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="school-job">School Job</option>
                    <option value="coaching">Coaching</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                {/* Job Apply Type */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Job Apply Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={jobApplyType}
                    onChange={(e) => setJobApplyType(e.target.value)}
                  >
                    <option value="">Select Apply Type</option>
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                    <option value="email">By Email</option>
                    <option value="call">Call to Apply</option>
                  </select>
                </div>

                {/* Job Apply Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Job Apply Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                  />
                </div>

                {/* Min Salary */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Min. Salary</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Select Experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                  </select>
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Qualification</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  >
                    <option value="">Select Qualification</option>
                    <option value="certificate">Certificate</option>
                    <option value="associate">Associate</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Job Type */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="temporary">Temporary</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* External URL */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">External URL</label>
                  <input
                    type="url"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={externalURL}
                    onChange={(e) => setExternalURL(e.target.value)}
                  />
                </div>

                {/* Salary Type */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Salary Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                  >
                    <option value="">Select Salary Type</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>

                {/* Max Salary */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Max. Salary</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                  />
                </div>

                {/* Career Level */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Career Level</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={careerLevel}
                    onChange={(e) => setCareerLevel(e.target.value)}
                  >
                    <option value="">Select Career Level</option>
                    <option value="entry">Entry</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Application Deadline</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Introduction Video */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video</label>
              <input
                type="link"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                onChange={(e) => setIntroductionVideo(e.target.files[0])}
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Photos</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                multiple
                onChange={handlePhotoUpload}
              />
            </div>

            {/* Friendly Address */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Friendly Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={friendlyAddress}
                onChange={(e) => setFriendlyAddress(e.target.value)}
              />
            </div>

            <label className="block text-gray-700 text-sm font-bold mb-2">Maps Location</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={mapsLocation}
              onChange={(e) => setMapsLocation(e.target.value)}
            />

            <div className="relative mb-4">
                  <div className="relative w-full h-80 border border-gray-300 rounded-lg mb-4">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    {/* Static marker image, positioned based on latitude and longitude */}
                    <div
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -100%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <img
                        src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        alt="Red Marker"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="latitude" className="block mb-2">
                      Latitude:
                    </label>
                    <input
                      type="text"
                      id="latitude"
                      name="latitude"
                      value={latitude}
                      onChange={handleLatitudeChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="longitude" className="block mb-2">
                      Longitude:
                    </label>
                    <input
                      type="text"
                      id="longitude"
                      name="longitude"
                      value={longitude}
                      onChange={handleLongitudeChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>

                  <div className="mb-4">
                    {/* Button to use user's location */}
                    <button
                      onClick={fetchUserCoordinates}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Use My Location
                    </button>
                  </div>

                  {/* Display error message if geolocation fails */}
                  {error && <div className="text-red-500 mt-2">{error}</div>}
                </div>

            <button
              className="bg-green-500 text-white p-2 rounded-lg mt-4"
              onClick={saveJobPost}
            >
             Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobs;
