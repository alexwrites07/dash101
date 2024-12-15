import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";

const SubmitJobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tags, setTags] = useState([{ name: "Urgent", active: true }]);
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("monthly");
  const [careerLevel, setCareerLevel] = useState("");
  const [gender, setGender] = useState("Any");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [workCommitment, setWorkCommitment] = useState("Full-time");
  const [workMode, setWorkMode] = useState("In-person");
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [skillAndExperience, setSkillAndExperience] = useState([]);
  const [images, setImages] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [maxApplicants, setMaxApplicants] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [friendlyAddress, setFriendlyAddress] = useState("");
  const [latitude, setLatitude] = useState("");  const [categoryInput, setCategoryInput] = useState(""); // For user input
  const [longitude, setLongitude] = useState("");
  const [mapSrc, setMapSrc] = useState("");

  const updateMapSrc = (lat, lon) => {
    setMapSrc(`https://www.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed`);
  };

  const handleLatitudeChange = (e) => {
    const newLat = parseFloat(e.target.value) || 0;
    setLatitude(newLat);
    updateMapSrc(newLat, longitude);
  };

  const handleLongitudeChange = (e) => {
    const newLon = parseFloat(e.target.value) || 0;
    setLongitude(newLon);
    updateMapSrc(latitude, newLon);
  };

  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          updateMapSrc(latitude, longitude);
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const saveJobPost = async () => {
    const jobData = {
      title: jobTitle,
      tags,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
        landmark: "Nearby Landmark",
        address: friendlyAddress,
      },
      salary: {
        min: parseInt(minSalary, 10),
        max: parseInt(maxSalary, 10),
        period: salaryPeriod,
      },
      workDetails: {
        commitment: workCommitment,
        mode: workMode,
      },
      experience,
      gender,
      qualification,
      careerLevel,
      description: jobDescription,
      keyResponsibilities,
      skillAndExperience,
      images,
      jobCategories,
      maxApplicants,
      lastDateToApply: applicationDeadline,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://server.avyudha.com/createJob",
        jobData,  // This is the data you're sending
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure `token` is defined
          },
        }
      );
      alert("Job post submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit job post.");
    }
  }    
  const addCategory = () => {
    if (categoryInput.trim() && !jobCategories.includes(categoryInput)) {
      setJobCategories([...jobCategories, categoryInput.trim()]);
      setCategoryInput(""); // Clear the input field
    }
  };

  const removeCategory = (category) => {
    setJobCategories(jobCategories.filter((cat) => cat !== category));
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl">
    <Sidebar />
    <div className="flex-1 mr-12">
      <Header />
      <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col  w-full mr-12">
    {/* <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"> */}
      <h1 className="text-2xl font-bold mb-6">Submit Job Post</h1>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Job Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
   {/* Job Categories */}
   <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Job Categories</label>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Enter a category"
          />
          <button
            onClick={addCategory}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {jobCategories.map((category, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex items-center"
            >
              {category}
              <button
                onClick={() => removeCategory(category)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Salary</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Maximum Salary</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Salary Period</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={salaryPeriod}
          onChange={(e) => setSalaryPeriod(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="hourly">Hourly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Career Level</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={careerLevel}
          onChange={(e) => setCareerLevel(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Qualification</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Work Commitment</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={workCommitment}
          onChange={(e) => setWorkCommitment(e.target.value)}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Work Mode</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
        >
          <option value="In-person">In-person</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Latitude</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Longitude</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <div className="mb-6">
        <iframe
          title="Google Map"
          src={mapSrc}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <button
        onClick={saveJobPost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Job
      </button>
    </div>
    </div></div>
  );
};

export default SubmitJobPost;
