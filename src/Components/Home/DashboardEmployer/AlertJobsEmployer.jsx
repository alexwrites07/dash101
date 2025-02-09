import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Header from './HeaderEmployer';
import categoriesList from '../Dashboard/AdminPanel/categories.json'
const AlertJobs = () => {
  const [tags, setTags] = useState('');
  const [city, setCity] = useState('');
  const [qualificationInput, setQualificationInput] = useState("");
  const [filteredQualifications, setFilteredQualifications] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [highestQualificatio, setHighestQualificatio] = useState('');
  const suggestionsRef = useRef(null);

  const [suggestions1, setSuggestions1] = useState([]);
  const [inputText1, setInputText1] = useState('');
  const [categories, setCategories] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [topicBasedLearning, setTopicBasedLearning] = useState('');
  const [gender, setGender] = useState('');
  const [distance, setDistance] = useState(''); // Added distance state
  const [highestQualification, setHighestQualification] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch the alerts on component mount
  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      try {
        const response = await fetch('https://server.avyudha.com/getFilters', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const result = await response.json();
        setAlerts(result);
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      }
    };

    fetchAlerts();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
  
    const queryString = new URLSearchParams({
    
      'location.city': city,
  
      // Ensure categories is treated as a string
      categories: categories,
  
      // Ensure qualifications are treated as a string
      qualifications:selectedQualifications,
      
      gender,
      distance,
    }).toString();
  
    const payload = {
      uri: `https://server.avyudha.com/getTutors?${queryString}`,
    };
  
    try {
      setIsSaving(true);
      const response = await fetch('https://server.avyudha.com/saveFilters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save filter');
      }
  
      const result = await response.json();
      alert('Alert saved successfully');
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving filter:', error.message);
      setIsSaving(false);
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
  
  const handleQualificationSelect = (qualification) => {
    const currentQualifications = qualificationInput
      .split(",")
      .map((q) => q.trim());

    // Replace the last incomplete input with the selected suggestion
    if (!currentQualifications.includes(qualification)) {
      currentQualifications[currentQualifications.length - 1] = qualification;
    }

    setSelectedQualifications([...new Set([...selectedQualifications, qualification])]);
    setQualificationInput(""); // Clear the input after selection
    setFilteredQualifications([]); // Clear suggestions
  };

  const handleQualificationRemove = (qualificationToRemove) => {
    const updatedQualifications = selectedQualifications.filter(
      (q) => q !== qualificationToRemove
    );
    setSelectedQualifications(updatedQualifications);
  };
  return (
    <div className="p-4">
      <div className="flex flex-col lg:ml-64 lg:flex-row max-w-5xl">
        <Sidebar />
        <div className="flex-1 lg:ml-24 ">
          <Header />
          <div className=" lg:mt-12  p-4 mt-36 lg:p-28 flex flex-col items-center lg:items-start w-full">
            <h3 className="text-3xl font-semibold mx-auto">Set Candidate Alerts</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 shadow-md p-12 bg-gray-50 rounded-md">
            <div>
              <label className="block">City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
  <label className="block">Gender:</label>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="border p-2 w-full"
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="No Preference">No Preference</option>
  </select>
</div>
            {/* <div>
              <label className="block">Tags (comma-separated):</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="border p-2 w-full"
              />
            </div> */}
          <div className="mb-4">
            <label htmlFor="categories" className="block ">Categories:</label>
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
       >{suggestions1.map((category, index) => (
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
    <div className="">
      <label className="block   mb-2">
        Qualifications
      </label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={qualificationInput}
        onChange={handleInputChange}
        placeholder="Type to search qualifications..."
      />

      {/* Suggestions Dropdown */}
      {filteredQualifications.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10"
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

      {/* Selected Qualifications */}
      {selectedQualifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md mb-2">Selected Qualifications:</h2>
          <div className="flex flex-wrap gap-2">
            {selectedQualifications.map((qualification, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-lg flex items-center"
              >
                {qualification}
                <button
                  onClick={() => handleQualificationRemove(qualification)}
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
            {/* <div>
              <label className="block">Topic-Based Learning (comma-separated):</label>
              <input
                type="text"
                value={topicBasedLearning}
                onChange={(e) => setTopicBasedLearning(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block">Highest Qualification:</label>
              <input
                type="text"
                value={highestQualification}
                onChange={(e) => setHighestQualification(e.target.value)}
                className="border p-2 w-full"
              />
            </div> */}
             <div>
              <label className="block">Distance (km):</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </form>

          {/* Displaying Alerts */}
          <div className="mt-8">
            <h3 className="font-semibold">Saved Alerts</h3>
            {alerts.length > 0 ? (
              <ul className="space-y-4 mt-4">
                {alerts.map((alert) => (
                 <li key={alert._id} className="p-5 bg-gray-100 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                    {/* <div><strong>Tags:</strong> {alert.filter.tags?.join(', ')}</div> */}
                    <div><strong>City:</strong> {alert.filter.location.city}</div>
                    <div><strong>Categories:</strong> {alert.filter.categories?.join(', ')}</div>
                    <div><strong>Qualifications:</strong> {alert.filter.qualifications?.join(', ')}</div>
                    {/* <div><strong>Topic-Based Learning:</strong> {alert.filter.topicBasedLearning?.join(', ')}</div> */}
                    <div><strong>Gender:</strong> {alert.filter.gender}</div>
                    <div><strong>Distance:</strong> {alert.filter.distance} km</div>
                   
                    {/* <div><strong>Highest Qualification:</strong> {alert.filter.highestQualification}</div>
                 */}
                 </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No alerts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertJobs;
