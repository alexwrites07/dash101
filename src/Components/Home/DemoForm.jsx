import React, { useState } from 'react';
import Map from './MapDemo'; // Import your Map component

const questions = [
  {
    id: 'requirement',
    question: 'What do you want to learn? *',
    type: 'text',
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
    question: 'What is the maximum salary you are willing to pay? *',
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

  const [coordinates, setCoordinates] = useState(["set loaction","set loaction"]);

  const handleNext = async (event) => {
    event.preventDefault();

    if (currentQuestionIndex === questions.length - 1) {
      try {
        const response = await fetch('https://backend.akshayy.tech/submit-learning-need', {
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
        const { longitude, latitude } = position.coords;
        setCoordinates([longitude, latitude]);
        setResponses((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [longitude, latitude],
          },
        }));
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
      phone: responses.phone,
      otp: otp,
    };

    try {
      const response = await fetch('https://backend.akshayy.tech/verify-learning-need-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        
      }
    );alert("Form submitted");

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('OTP verification response:', data);
    } catch (error) {
      console.error('Error verifying OTP:', error);
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
            />
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
          />
        );
      case 'textarea':
        return (
          <textarea
            value={responses[question.id]}
            onChange={(e) => handleChange(e, question.id)}
            placeholder={question.placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            value={responses[question.id]}
            onChange={(e) => handleChange(e, question.id)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            {question.options.map((option, index) => (
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
            />
            <input
              type="text"
              placeholder="City"
              value={responses.location.city}
              onChange={(e) => handleLocationChange(e, 'city')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
             <input
              type="text"
              placeholder="State"
              value={responses.location.state}
              onChange={(e) => handleLocationChange(e, 'state')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
            <input
              type="text"
              placeholder="Pin Code"
              value={responses.location.pinCode}
              onChange={(e) => handleLocationChange(e, 'pinCode')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />

            <Map coordinates={coordinates} onChange={handleMapChange} />
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
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={responses.phone}
              onChange={(e) => handleChange(e, 'phone')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <h2 className="text-xl font-semibold">Thank you!</h2>
          <p className="mt-8">An OTP has been sent to your contact details. Please verify it below.</p>
          {isOtpSent && (
            <form  className="mt-8">
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
      ) : (
        <div>
          <h2 className="text-lg font-bold">{questions[currentQuestionIndex].question}</h2>
          {renderInputField(questions[currentQuestionIndex])}

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
