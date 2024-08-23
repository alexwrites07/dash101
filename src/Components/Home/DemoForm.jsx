import React, { useState } from 'react';
import Map from './MapDemo'; // Make sure this component uses coordinates prop correctly

const questions = [
  'What do you want to be?',
  'What is your location?',
  'Which board of education are you choosing for?',
  'What is the maximum fee you are willing to pay?',
  'When do you plan to start your tuition?',
  'How would you like to attend your tuition classes?',
  'Do you have any tutor gender preference?',
  'Share your contact details (Email ID and Phone Number)'
];

const suggestions = [
  'Example: Doctor, Engineer, Teacher',
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

  const handleMapChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const renderInputField = () => {
    const questionIndex = currentQuestionIndex + 1;

    if (questions[currentQuestionIndex] === 'What is your location?') {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            What is your location?
          </label>
          <input
            type="text"
            name="location"
            placeholder="Address"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {/* Additional checkboxes for offline option */}
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
          <select
            name="fee_type"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          >
            <option value="">Select fee type</option>
            <option value="Monthly">Monthly</option>
            <option value="Hourly">Hourly</option>
            <option value="In total">In total</option>
            <option value="Not sure, discuss with tutor and decide">Not sure, discuss with tutor and decide</option>
          </select>
          <input
            type="text"
            name="response"
            placeholder="Enter fee amount"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
            placeholder="Email ID"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <input
          type="text"
          name="response"
          required
          placeholder="Type your answer here"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-12 mb-12">
      {!isSubmitted ? (
        <form onSubmit={handleNext}>
          {renderInputField()}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-6">
          <p className="font-bold">Form submitted successfully!</p>
          <p>Your responses have been recorded. Thank you!</p>
        </div>
      )}
    </div>
  );
};

export default DemoForm;
