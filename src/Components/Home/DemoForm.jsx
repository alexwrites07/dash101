import React, { useState } from 'react';
import Map from './MapDemo'; // Ensure MapDemo uses coordinates prop correctly

const questions = [
  'What do you want to learn?',
  'What is your location?',
  'Which board of education are you choosing for?',
  'What is the maximum fee you are willing to pay?',
  'When do you plan to start your tuition?',
  'How would you like to attend your tuition classes?',
  'Do you have any tutor gender preference?',
  'Share your contact details (Email ID and Phone Number)'
];

const suggestions = [
  'Example: I want to learn Maths, I want to learn Physics, I want to learn French, etc...ca',
  '',
  'Select your board of education.',
  'Enter the fee amount and select the appropriate option.',
  'Select when you want to start your tuition.',
  'Select your preferred mode of tuition.',
  'Select your tutor gender preference.',
  'Please enter your Email ID and Phone Number'
];

const options = {
  3: ['ICSE', 'CBSE', 'State Board', 'International Baccalaureate', 'IGCSE', 'None of the above'],
  5: ['Not sure, just want to see options', 'Immediately', 'Within a month'],
  6: ['Live Interactive Online Classes (recommended)', 'Offline at my home or nearby classes'],
  7: ['No preference', 'Male only', 'Female only']
};

const DemoForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);

  const handleNext = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = formData.getAll('response') || formData.get('response');
    setResponses(prevResponses => ({
      ...prevResponses,
      [questions[currentQuestionIndex]]: response
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
      console.log('Form submitted:', responses);
    }

    event.target.reset();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

 
  const handleMapChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handlePincodeChange = async (event) => {
    const pincode = event.target.value;

    if (pincode.length === 6) { // Assuming a 6-digit pin code
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=AIzaSyAK5qSOh-x80wTOpdKP_KkoDomw0C8s4Dw`);
        const data = await response.json();
        
        console.log('Geocoding API response:', data);
  
        if (data.status === 'OK' && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCoordinates([location.lng, location.lat]);
        } else {
          console.error('No results found for the given pincode:', data.status, data.results);
          // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        // Optionally, display an error message to the user
      }
    }
  };
  

  const renderInputField = () => {
    const questionIndex = currentQuestionIndex + 1;

    if (questions[currentQuestionIndex] === 'What is your location?') {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            {questions[currentQuestionIndex]}
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter your address"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Enter your pincode"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handlePincodeChange} // Update map based on pincode
          />
          <input
            type="text"
            name="landmark"
            placeholder="Enter a landmark"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="w-full h-88 mb-4">
            <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
          </div>
        </div>
      );
    }

    if (questions[currentQuestionIndex] === 'How would you like to attend your tuition classes?') {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            {questions[currentQuestionIndex]}
          </label>
          <div className="flex flex-col space-y-2">
            {options[questionIndex].map((option, index) => (
              <div key={index}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="response"
                    value={option}
                    className="mr-2"
                  />
                  {option}
                </label>
              </div>
            ))}
            <div className="ml-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="response"
                  value="At home"
                  className="mr-2"
                />
                At home
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="response"
                  value="Nearby classes"
                  className="mr-2"
                />
                Nearby classes
              </label>
            </div>
          </div>
        </div>
      );
    }

    if (questions[currentQuestionIndex] === 'What is the maximum fee you are willing to pay?') {
      return (
        <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          {questions[currentQuestionIndex]}
        </label>
        <div className="flex space-x-4">
          <select
            name="fee_type"
            required
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select fee type</option>
            <option value="Monthly">Monthly</option>
            <option value="Hourly">Hourly</option>
            <option value="Annually">Annually</option>
            <option value="In total">In total</option>
            <option value="Not sure, discuss with tutor and decide">
              Not sure, discuss with tutor and decide
            </option>
          </select>
          <input
            type="text"
            name="response"
            placeholder="Enter fee amount"
            required
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      );
    }

    if (questions[currentQuestionIndex] === 'Share your contact details (Email ID and Phone Number)') {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            {questions[currentQuestionIndex]}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email ID"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }

    if (questionIndex in options) {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            {questions[currentQuestionIndex]}
          </label>
          <p className="text-gray-500 text-sm mb-4">{suggestions[currentQuestionIndex]}</p>
          <div className="flex flex-col space-y-2">
            {options[questionIndex].map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="response"
                  value={option}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          {questions[currentQuestionIndex]}
        </label>
        <p className="text-gray-500 text-sm mb-4">{suggestions[currentQuestionIndex]}</p>
        <textarea
          name="response"
          placeholder="Enter your response"
          required
          className="shadow appearance-none border rounded mb-6 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
        />
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded mb-6-md mb-6">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4-4m0 6l2 2l4-4"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold">Submitted your query successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleNext}>
          {renderInputField()}
          <div className="flex justify-between mt-6 mb-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mb-6-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Previous
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded mb-6-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DemoForm;
