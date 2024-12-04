import React, { useState, useEffect } from 'react';
import Map from './MapDemo'; // Import your Map component
import categories from '../Home/Dashboard/AdminPanel/categories.json';


const questions = [
  {
    id: 'requirement',
    question: 'What is your Learning Need Category? *',
    type: 'autocomplete',
    placeholder: 'Enter your choice',
  },
  {
    id: 'description',
    question: 'Write a short description for your learning need?',
    type: 'textarea',
    placeholder: 'Describe your learning needs...',
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
    options: ['Not sure, just want to see options', 'Immediately', 'Within a month'],
  },
  {
    id: 'salary',
    question: 'What is your budget? *',
    type: 'salary',
  },
  {
    id: 'typeOfClass',
    question: 'How would you like to attend your tuition classes? *',
    type: 'checkbox',
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({
    requirement: '',
    description: '',
    board: '',
    location: {
      coordinates: ["set loaction","set loaction"],
      address: '',
      landmark: '',
      city: '',
      pinCode: '',
      state: '',
    },
    available:'Nil',
    salary: { period: 'monthly', max: '' },
    start: '',
    typeOfClass: [],
    genderPreference: '',
    email: '', 
    phone: '' ,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [coordinates, setCoordinates] = useState(["set loaction","set loaction"]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Filter suggestions based on the user input for the "requirement" field
    if (responses.requirement) {
      const filteredSuggestions = categories.filter(option =>
        option.toLowerCase().includes(responses.requirement.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if the input is empty
    }
  }, [responses.requirement]);
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
    const checked = event.target.checked;

    setResponses((prev) => {
      const updatedArray = checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);
      return {
        ...prev,
        [key]: updatedArray,
      };
    });
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
    setResponses((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: newCoordinates,
      },
    }));
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: responses.email,
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
      alert('OTP verification response:', data);
    } catch (error) {
      alert('Error verifying OTP:', error);
    }
  };

  const renderInputField = (question) => {
    switch (question.type) {
      case 'salary':
        return (
          <div className="mt-8 mb-6 flex items-center">
            <select
              name="period"
              value={responses.salary.period}
              onChange={handlesalaryChange}
              className="shadow appearance-none border rounded mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
               >
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="yearly">Yearly</option>
            </select>
            <input
              type="text"
              name="max"
              placeholder="Enter your maximum salary"
              value={responses.salary.max}
              onChange={handlesalaryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              />
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
                  checked={responses[question.id].includes(option)}
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
              placeholder="Pin Code"
              value={responses.location.pinCode}
              onChange={(e) => handleLocationChange(e, 'pinCode')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              required
           />

            <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
            <button
              type="button"
              onClick={fetchCurrentLocation}


              className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Get Current Location
            </button>

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
  placeholder="+91XXXXXXXXXX"
  value={responses.phone}
  onChange={(e) => handleChange(e, 'phone')}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
  pattern="^\+91[0-9]{10}$"
  title="Enter a valid phone number in the format +91XXXXXXXXXX"
/>



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
       <p className="mt-8">An OTP has been sent to your contact details. Please verify it below.</p>
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
