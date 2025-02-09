import React, { useState, useRef } from "react";
import axios from "axios";
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";
import Map from "../MapDemo";
import categoriesList from '../Dashboard/AdminPanel/categories.json'
const SubmitJobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState();
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("monthly");
  const [careerLevel, setCareerLevel] = useState("");
  const [gender, setGender] = useState("Male");
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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [categoryInput, setCategoryInput] = useState(""); // For user input
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");
 
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [highestQualificatio, setHighestQualificatio] = useState('');
  const suggestionsRef = useRef(null);
 
  const [error, setError] = useState(null); // To handle errors if geolocation fails
  const [endpoint, setEndpoint] = useState('tutor'); // Default to 'tutor'
  const [coordinates, setCoordinates] = useState(["Set to your Location","Set to your Location"]);
  const [suggestions1, setSuggestions1] = useState([]);
  const [inputText1, setInputText1] = useState('');
  const [categories, setCategories] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [filteredQualifications, setFilteredQualifications] = useState([
    'Bachelors in Computer Science',
    'Masters in Physics',
    'Doctorate in Chemistry',
    'Diploma in Engineering',
    'MBA in Marketing',
    'Bachelors in Electrical Engineering',
    'Masters in Data Science',
    'PhD in Artificial Intelligence',
  ]);
  

  const handleInputChange1 = (e) => {
    setQualificationInput(e.target.value);
    filterQualifications(e.target.value);
  };

  const filterQualifications = (input) => {
    if (input) {
      setFilteredQualifications(
        filteredQualifications.filter((qualification) =>
          qualification.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredQualifications([
        'Bachelors in Computer Science',
        'Masters in Physics',
        'Doctorate in Chemistry',
        'Diploma in Engineering',
        'MBA in Marketing',
        'Bachelors in Electrical Engineering',
        'Masters in Data Science',
        'PhD in Artificial Intelligence',
      ]);
    }
  };

  const handleQualificationSelect = (qualification) => {
    setSelectedQualifications(qualification);
    setQualificationInput(qualification); // Set input to selected value
    setFilteredQualifications([]); // Hide suggestions after selection
  };

  const handleClearSelection = () => {
    setSelectedQualification('');
    setQualificationInput(''); // Clear both input and selected qualification
  };

  const qualifications1 = [
    "B.Sc. in Physics",
    "B.Sc. in Chemistry",
    "B.Sc. in Biology",
    "B.Sc. in Mathematics",
    "B.Sc. in Computer Science",
    "B.Sc. in Environmental Science",
    "B.Sc. in Biotechnology",
    "B.Sc. in Microbiology",
    "B.Sc. in Biochemistry",
    "B.Sc. in Zoology",
    "B.Sc. in Botany",
    "B.Sc. in Geology",
    "B.Sc. in Statistics",
    "B.Sc. in Food Science",
    "B.Sc. in Nutrition",
    "B.Com (General)",
    "B.Com (Honors)",
    "BBA (Bachelor of Business Administration)",
    "BMS (Bachelor of Management Studies)",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "B.A. in English",
    "B.A. in Hindi",
    "B.A. in History",
    "B.A. in Geography",
    "B.A. in Political Science",
    "B.A. in Sociology",
    "B.A. in Psychology",
    "B.A. in Philosophy",
    "B.A. in Economics",
    "B.A. in Anthropology",
    "B.A. in Education",
    "B.A. in Journalism and Mass Communication",
    "B.A. in Fine Arts",
    "B.A. in Performing Arts",
    "B.A. in Sanskrit",
    "B.A. in Regional Languages",
    "B.A. in Foreign Languages",
    "B.Tech/B.E. in Mechanical Engineering",
    "B.Tech/B.E. in Civil Engineering",
    "B.Tech/B.E. in Electrical Engineering",
    "B.Tech/B.E. in Computer Science Engineering",
    "B.Tech/B.E. in Electronics and Communication Engineering",
    "B.Tech/B.E. in Information Technology",
    "B.Tech/B.E. in Chemical Engineering",
    "B.Tech/B.E. in Aeronautical Engineering",
    "B.Tech/B.E. in Biotechnology",
    "B.Tech/B.E. in Environmental Engineering",
    "MBBS (Medicine)",
    "BDS (Dentistry)",
    "BAMS (Ayurvedic Medicine)",
    "BHMS (Homeopathic Medicine)",
    "BPT (Physiotherapy)",
    "B.Sc. Nursing",
    "B.Pharm (Pharmacy)",
    "Bachelor of Occupational Therapy",
    "LLB (Bachelor of Laws)",
    "Integrated Law courses (B.A. LLB, B.Com LLB, B.Sc. LLB)",
    "B.Ed (Bachelor of Education)",
    "BHM (Bachelor of Hotel Management)",
    "BFA (Bachelor of Fine Arts)",
    "B.Des (Bachelor of Design)",
    "BSW (Bachelor of Social Work)",
    "M.Sc. in Physics",
    "M.Sc. in Chemistry",
    "M.Sc. in Biology",
    "M.Sc. in Mathematics",
    "M.Sc. in Computer Science",
    "M.Sc. in Environmental Science",
    "M.Sc. in Biotechnology",
    "M.Sc. in Microbiology",
    "M.Sc. in Biochemistry",
    "M.Sc. in Zoology",
    "M.Sc. in Botany",
    "M.Sc. in Geology",
    "M.Sc. in Statistics",
    "M.Sc. in Food Science",
    "M.Sc. in Nutrition",
    "M.Com (Master of Commerce)",
    "MBA (Master of Business Administration)",
    "M.Fin (Master of Finance)",
    "M.HRM (Master of Human Resource Management)",
    "M.A. in English",
    "M.A. in Hindi",
    "M.A. in History",
    "M.A. in Geography",
    "M.A. in Political Science",
    "M.A. in Sociology",
    "M.A. in Psychology",
    "M.A. in Philosophy",
    "M.A. in Economics",
    "M.A. in Anthropology",
    "M.A. in Education",
    "M.A. in Journalism and Mass Communication",
    "M.A. in Fine Arts",
    "M.A. in Performing Arts",
    "M.A. in Sanskrit",
    "M.A. in Regional Languages",
    "M.A. in Foreign Languages",
    "M.Tech/M.E. in Mechanical Engineering",
    "M.Tech/M.E. in Civil Engineering",
    "M.Tech/M.E. in Electrical Engineering",
    "M.Tech/M.E. in Computer Science Engineering",
    "M.Tech/M.E. in Electronics and Communication Engineering",
    "M.Tech/M.E. in Information Technology",
    "M.Tech/M.E. in Chemical Engineering",
    "M.Tech/M.E. in Aeronautical Engineering",
    "M.Tech/M.E. in Biotechnology",
    "M.Tech/M.E. in Environmental Engineering",
    "MD (Doctor of Medicine)",
    "MS (Master of Surgery)",
    "MDS (Master of Dental Surgery)",
    "MPT (Master of Physiotherapy)",
    "M.Sc. Nursing",
    "M.Pharm (Master of Pharmacy)",
    "Master of Occupational Therapy",
    "LLM (Master of Laws)",
    "M.Ed (Master of Education)",
    "M.Phil in Education",
    "Ph.D. in Education",
    "MHM (Master of Hotel Management)",
    "MFA (Master of Fine Arts)",
    "M.Des (Master of Design)",
    "MSW (Master of Social Work)",
    "Ph.D. in various disciplines",
    "12th Pass",
    "10th Pass"
  ];
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
        coordinates: [latitude, longitude],
        address: address,
        city: city,
        state: state,
        pincode: pincode,
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
      qualification: selectedQualifications,
      careerLevel,
      description: jobDescription,
      jobCategories: categories,
      maxApplicants,
      lastDateToApply: applicationDeadline,
      country,
    };
  
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://server.avyudha.com/createJob",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job post submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
  
      // Handle different error response structures
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Standard API error message
        } else if (error.response.data && typeof error.response.data === "string") {
          errorMessage = error.response.data; // If API returns a plain text message
        }
      } else if (error.message) {
        errorMessage = error.message; // Network or general errors
      }
  
      alert(errorMessage);
    }
  };
  

 
  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input); // Update the input text for categories
  
    // Filter categories based on input text
    const filteredSuggestions = categoriesList.filter(
      (category) =>
        category.toLowerCase().includes(input.toLowerCase()) &&
        !categories.includes(category) // Ensure it’s not already added
    );
    setSuggestions1(filteredSuggestions);
  };
  
  const handleCategorySelect = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]); // Add selected category
    setInputText1(''); // Clear input text after selecting a category
    setSuggestions1([]); // Clear suggestions after selecting a category
  };
  
  const handleCategoryRemove = (categoryToRemove) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToRemove)
    ); // Remove the category
  };
  const handleInputChange = (e) => {
    const input = e.target.value;
    setHighestQualificatio(input);
    
    // Filter the qualifications based on input
    const filtered = qualifications1.filter((q) =>
      q.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredQualifications(filtered);
  };
  
  
  const handleAddTag = () => {
    if (tagName.trim()) {
      setTags((prevTags) => {
        // Ensure prevTags is an array before updating
        const updatedTags = Array.isArray(prevTags) ? [...prevTags, { name: tagName.trim(), active: true }] : [{ name: tagName.trim(), active: true }];
        return updatedTags;
      });
      setTagName(''); // Clear input field
    }
  };
  const handleQualificationRemove = (qualificationToRemove) => {
    const updatedQualifications = selectedQualifications.filter(
      (q) => q !== qualificationToRemove
    );
    setSelectedQualifications(updatedQualifications);
  };
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // Do not use cached position
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates([latitude, longitude]);
          setResponses((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: [latitude, longitude],
            },
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve your location.");
        },
        options
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const handleMapChange = (newCoordinates) => {
    // Reverse the order of coordinates to ensure latitude is first and longitude is second
    const reversedCoordinates = [newCoordinates[0], newCoordinates[1]];
  
    setCoordinates(reversedCoordinates);
  
    setLatitude(reversedCoordinates[0]); // Latitude is now the first element
    setLongitude(reversedCoordinates[1]); // Longitude is now the second element
  };
  
  return (
    <div className="flex flex-col lg:flex-row max-w-5xl lg:ml-24">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Header */}
        <Header />
      <div className="lg:mt-24 lg:ml-64 bg-gray-100 p-6 mt-12 lg:p-12  flex flex-col justify-center lg:justify-start mt-36">
          <h1 className="text-3xl font-bold mb-6">Submit a Job Post</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700 ">Job Title *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Job Description *</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                
              />
            </div>


            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Salary (Min) *</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  
                />
              </div>
              <div>
                <label className="block text-gray-700">Salary (Max) *</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Salary Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value)}
                
              >
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={careerLevel}
                  onChange={(e) => setCareerLevel(e.target.value)}
                  
                />
              </div>
              <div>
                <label className="block text-gray-700">Experience (in years)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  
                />
              </div>
            </div>

            <div className="">
      <label className="block   mb-2">
        Qualifications
      </label>
      <div className="">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={qualificationInput}
        onChange={handleInputChange1}
        
        placeholder="Type to search qualifications..."
      />

      {/* Suggestions Dropdown */}
      {filteredQualifications.length > 0 && qualificationInput && (
          <ul
          ref={suggestionsRef}
         className="absolute w-64 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10 shadow-lg"
        >
          {filteredQualifications.map((qualification, index) => (
            <li
              key={index}
              onClick={() => handleQualificationSelect(qualification)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {qualification}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Qualification */}
      {selectedQualifications&& (
        <div className="mb-4">
          <h2 className="text-md mb-2">Selected Qualification *:</h2>
          {/* <input
            type="text"
            value={selectedQualifications}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled
            readOnly
          /> */}
          {/* <button
            onClick={handleClearSelection}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button> */}
        </div>
      )}
    </div>
    </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Commitment</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={workCommitment}
                  onChange={(e) => setWorkCommitment(e.target.value)}
                  
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Mode</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  
                >
                  <option value="In-person">In-person</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                
              >
                
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">No Preference</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Maximum Applicants</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={maxApplicants}
                onChange={(e) => setMaxApplicants(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Application Deadline</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                
              />
            </div>

            <div className="mb-4">
            <label htmlFor="categories" className="block ">Categories *:</label>
            <div className="mb-4 ">
        <input
          type="text"
          value={inputText1}
          onChange={handleCategoryInputChange}
          
          placeholder="Type to search categories..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Suggestions Dropdown */}
        {suggestions1.length > 0 && (
         <ul
         ref={suggestionsRef}
        className="absolute w-64 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10 shadow-lg"
       >  {suggestions1.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategorySelect(category)}
                
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Categories */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md mb-2">Selected Categories:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-lg flex items-center"
              >
                {category}
                <button
                  onClick={() => handleCategoryRemove(category)}
                  
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
    <div>
      {/* Input field to add tags */}
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        
        placeholder="Enter tag name"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleAddTag}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Add Tag *
      </button>

      {/* Display tags */}
      <h3>Active Tags:</h3>
      <div>
        {Array.isArray(tags) && tags.length > 0 ? (
          tags.map((tag, index) => (
            <div key={index}>
              {tag.name} (Active: {tag.active ? 'Yes' : 'No'})
            </div>
          ))
        ) : (
          <p>No tags available</p>
        )}
      </div>
    </div>





            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Pincode</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  
                />
              </div>
              <div>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  
                />
              </div>
              </div>
              <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
          <button
            type="button"
            onClick={fetchCurrentLocation}
            className="mt-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Get Current Location
          </button>
           
<br></br><br></br>

            <div className="mb-6">
              <button
                type="button"
                onClick={saveJobPost}
                className="bg-blue-500 text-white py-2 px-6 rounded"
              >
                Submit Job Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobPost;
