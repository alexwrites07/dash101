import React, { useState, useEffect } from 'react';
import Map from './MappinDemo'; // Import your Map component
import categories from '../Home/Dashboard/AdminPanel/categories.json';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';

const questions = [

  {
    id: 'requirement',
    question: 'What is your Tuition Category? *',
    type: 'autocomplete',
    placeholder: 'Enter your choice',
  },
  {
    id: 'description',
    question: 'Write a short description for your Tuition needs?',
    type: 'textarea',
    placeholder: 'Describe your tuition needs...',
  },
  {
    id: 'board',
    question: 'Which board of education are you choosing for?',
    type: 'select',
    options: ['ICSE', 'CBSE', 'State Board', 'International Baccalaureate', 'IGCSE', 'None of the above'],
  },
  {
    id: 'location',
    question: 'What is your location? *',
    type: 'location', // Custom type for the map
  },
  {
    id: 'start',
    question: 'When do you plan to start your tuition? *',
    type: 'select',
    options: [ 'Just looking at options','Immediately', 'Within a month'],
  },
  {
    id: 'available',
    question: 'When are you available? *',
    type: 'select',
    options: ['Weekends', 'Weekdays', 'Any'],
  },
  {
    id: 'salary',
    question: 'What is your budget? *',
    type: 'salary',
  },
  {
    id: 'typeOfClass',
    question: 'How would you like to attend your tuition classes? *',
    type: 'radio',
    options: ['Online (Recommended)', "Offline: At tutor's place","Offline: At student's place", 'Offline: Nearby classes'],
  },
  {
    id: 'genderPreference',
    question: 'Do you have any tutor gender preference? *',
    type: 'radio',
    options: ['Male', 'Female', 'No Preference'],
  },
  {
    id: 'contactDetails',
    question: 'Share your contact details (Email ID and Phone Number) *',
    type: 'contact', // Custom type for email and phone input
  },
];

const DemoForm = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({
    requirement: '',
    description: '',
    board: '',
    location: {
      coordinates: [28.6139, 77.2090],
      address: '',
      landmark: '',
      city: '',
      pinCode: '',
      state: '',
    },
    available:'',
    salary: { period: '', max: 0 },
    start: '',
    typeOfClass: [],
    genderPreference: '',
    email: '', 
    phone: '' ,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLocationCorrect, setIsLocationCorrect] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [coordinates, setCoordinates] = useState(["set loaction","set loaction"]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const type = localStorage.getItem("type");
    const token = localStorage.getItem("token");

    if (type && token) {
      // Fetch data directly if type and token exist
      axios
        .get(`https://server.avyudha.com/dashboard/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
           
          (type === 'student') ? responses.phone = data.phone : responses.phone = data.contactNumber;

            responses.email=data.email,
          
          console.log(responses.phone);
          // console.log(type);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      // Redirect or handle missing type/token
      console.error("Missing type or token in localStorage.");
      // setLoading(false);
    }
    // Filter suggestions based on the user input for the "requirement" field
    if (responses.requirement) {
      const filteredSuggestions = categories.filter(option =>
        option.toLowerCase().includes(responses.requirement.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if the input is empty
    }
  }
  , [responses.requirement]);
  const handleNext = async (event) => {
    event.preventDefault();

    if (currentQuestionIndex === questions.length - 1) {
      try {
        const response = await fetch('https://server.avyudha.com/submit-learning-need', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
        setIsSubmitted(true);
        setIsOtpSent(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitted(false);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleLocationChange = (event, field) => {
    const { value } = event.target;
    setResponses((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handlesalaryChange = (event) => {
    const { name, value } = event.target;
    setResponses((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: value,
      },
    }));
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude,longitude } = position.coords;
        setCoordinates([latitude,longitude]);
        setResponses((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [latitude, longitude],
          },
        }));
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  
  const handleCategorySelect = (category) => {
    setResponses((prev) => ({ ...prev, requirement: category }));
    setCategoryOptions([]);
    setSuggestions([]); // Clear suggestions after selecting a category
    
    
  };
  const handleChange = (event, key) => {
    
    const { value } = event.target;
    setResponses((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (event, key) => {
    const value = event.target.value;
    setResponses((prev) => ({
      ...prev,
      [key]: [value], // Reset the array to contain only the current selected value
    }));
  };
  
  const handleContactChange = (event, key) => {
    const { name, value } = event.target;
    setResponses((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [name]: value,
      },
    }));
  };
  const handleMapChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    handleCoordinatesChange(newCoordinates);  // Use the updated function to modify the location
  
     
    
    
  };
  
 const handleCoordinatesChange = (coordinates) => {
    setResponses((prev) => ({
      ...prev,
      location: {
        ...prev.location,
         // Save latitude as pin code
        coordinates:coordinates,
      },
    }));
  };
  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      phone: responses.phone,
      otp: otp,
    };

    try {
      const response = await fetch('https://server.avyudha.com/verify-learning-need-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        
      }
    );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Submitted Successfully');
      navigate('/');
    } catch (error) {
      alert('Error verifying OTP:', error);
    }
  };

  const renderInputField = (question) => {
    switch (question.type) {
      case 'salary':
        return (
          <div className="mt-8 mb-6 ">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
  <select
    name="period"
    value={responses.salary.period}
    onChange={handlesalaryChange}
    className="shadow appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select an option</option>
    <option value="monthly">Monthly</option>
    <option value="hourly">Hourly</option>
    <option value="daily">Daily</option>
    <option value="annually">Annually</option>
    <option value="Not sure, will discuss with tutor and decide">
      Not sure, will discuss with tutor and decide
    </option>
  </select>

  {['monthly', 'hourly', 'daily', 'annually', 'Not sure, will discuss with tutor and decide'].includes(responses.salary.period) && (
    <input
      type="text"
      name="max"
      placeholder="Enter your maximum budget"
      value={responses.salary.max}
      onChange={(e) =>
        setResponses((prev) => ({
          ...prev,
          salary: {
            ...prev.salary,
            max: e.target.value,
          },
        }))
      }
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  )}
</div>

      
{['monthly', 'hourly', 'daily', 'annually'].includes(responses.salary.period) && (
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={responses.salary.max || 0}
            onChange={(e) =>
              setResponses((prev) => ({
                ...prev,
                salary: { ...prev.salary, max: e.target.value },
              }))
            }
            className="slider w-full appearance-none h-2 bg-gray-400 rounded-lg focus:outline-none"
            style={{
              appearance: 'black',
            }}
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: black;
              cursor: pointer;
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: black;
              cursor: pointer;
            }
          `}</style>
          <p className="text-black text-sm mt-2">
            Selected Value: {responses.salary.max || 0}
          </p>
        </div>
      )}

          </div>
        );
      
        case 'autocomplete':
          return (
            <div>
              <input
                type="text"
                value={responses[question.id]}
                onChange={(e) => handleChange(e, question.id)}
                className="border rounded w-full py-2 px-3"
                placeholder="Start typing..."
                required
              />
              { suggestions.length > 1 && (
                <ul className="list-none mt-2 border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                      onClick={() => handleCategorySelect(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
      case 'text':
        return (
          <input
            type="text"
            value={responses[question.id]}
            onChange={(e) => handleChange(e, question.id)}
            placeholder={question.placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        );
      case 'textarea':
        return (
          <textarea
            value={responses[question.id]}
            onChange={(e) => handleChange(e, question.id)}
            placeholder={question.placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
            />
        );
        case 'select':
          // Use categoryOptions if question id is 'requirementId', otherwise use question.options
          const options = question.id === 'requirementId' ? categoryOptions : question.options;
          
          return (
            <select
              value={responses[question.id] || ''}
              onChange={(e) => handleChange(e, question.id)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
          case 'checkbox':
            return (
              <div className="flex flex-col">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={responses[question.id].includes(option)} // Reflect single selection
                      onChange={(e) => handleCheckboxChange(e, question.id)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            );
          
      case 'radio':
        return (
          <div className="flex flex-col">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => handleChange(e, question.id)}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'location':
        return (
          <div>
              
              <input
              type="text"
              placeholder="Landmark"
              value={responses.location.landmark}
              onChange={(e) => handleLocationChange(e, 'landmark')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={responses.location.city}
              onChange={(e) => handleLocationChange(e, 'city')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              required
            />
             <input
              type="text"
              placeholder="State"
              value={responses.location.state}
              onChange={(e) => handleLocationChange(e, 'state')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              required
           />
               
        <input
          type="text"
          placeholder="PinCode"
          value={responses.location.pinCode}
          onChange={(e) => handleLocationChange(e, 'pinCode')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              required
        />
      
      
      {!isLocationCorrect && (
        <>
          <Map
            pincode={responses.location.pinCode}
            onCoordinatesChange={handleMapChange}
          />
          <div>
            <p>Selected Coordinates:</p>
            <p>Latitude: {responses.location.coordinates[0]}</p>
            <p>Longitude: {responses.location.coordinates[1]}</p>
          </div>
        </>
      )}

      <div className="mt-2">
        <label>
          <input
            type="checkbox"
            checked={isLocationCorrect}
            onChange={() => setIsLocationCorrect(!isLocationCorrect)}
            required
          />
          <spacer></spacer>&nbsp;Click the checkbox if the location on the map is correct (the map will disappear)
        </label>
      </div>
            {/* <button
              type="button"
              onClick={fetchCurrentLocation}


              className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Get Current Location
            </button> */}

          </div>
        );
      case 'contact':
        return (
          <div>
            <input
  type="email"
  name="email"
  placeholder="Email ID"
  value={responses.email}
  onChange={(e) => handleChange(e, 'email')}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
  required
/>

<input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={responses.phone}
                onChange={(e) => handleChange(e, 'phone')}
                
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
<div className="flex items-start gap-2 my-4">
  <input type="checkbox" id="terms" className="mt-1" required />
  <label htmlFor="terms" className="text-sm text-gray-700">
    Your information will be used solely for the purpose of processing your request and will not be shared with any third parties without your explicit consent.  
    <a href="/terms" className="text-blue-600 underline ml-1">
      Terms and Conditions
    </a>
  </label>
</div>


          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleNext} className="max-w-2xl my-6 mx-auto mt-8">
      {isSubmitted ? (
       <div className="text-center">
       {/* <h2 className="text-xl font-semibold">Thank you!</h2> */}
        {isOtpSent && (
         <form className="mt-8 border p-4 rounded-lg shadow-md">
           <input
             type="text"
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             placeholder="Enter OTP"
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
     
           <button
             onClick={handleOtpSubmit}
             type="submit"
             className="mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
           >
             Verify OTP
           </button>
         </form>
       )}
     </div>
      ):(
        <div className="border shadow-md p-6">
        {/* Progress Bar */}
        <div className="relative mb-4">
        <h2 className="text-lg font-bold mb-4">
          Step {currentQuestionIndex + 1}/{questions.length}
        </h2>
          <div className="w-full h-2 bg-gray-300 rounded-full">
         
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      
        {/* Step Indicator */}
        
        <h1>{questions[currentQuestionIndex].question}</h1>
      
        <div className="py-4 -px-4 rounded-lg">
          {renderInputField(questions[currentQuestionIndex])}
        </div>
      
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
      
      )}
    </form>
  );
};

export default DemoForm;
