import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import Map from './AdminMapDemo'; // Ensure MapDemo uses coordinates prop correctly

const questions = [
  'What do you want to learn?',
  'Write a short description for your learning need?',
  'Which board of education are you choosing for?',
  'What is your location?',
  'What is the maximum fee you are willing to pay?',
  'When do you plan to start your tuition?',
  'How would you like to attend your tuition classes?',
  'Do you have any tutor gender preference?',
  'Share your contact details (Email ID and Phone Number)',
];

const suggestions = [
  'Learning Language', 'Spoken English', 'French Language', 'Hindi Language', 'German Language',
  'Spanish Language', 'Japanese Language', 'Kannada Language', 'Arabic Language', 'Phonics',
  'Chinese Language', 'Tamil Language', 'Telugu Language', 'Sanskrit Language', 'Korean Language',
  'Marathi Speaking', 'Russian Language', 'Italian Language', 'Malayalam Speaking', 'Bengali Speaking',
  'Urdu Language', 'Accent Training Classes', 'Gujarati Speaking', 'Dutch Language', 'Punjabi Speaking',
  'Portuguese Language', 'Swedish Language', 'Language Translation Services', 'Persian Language',
  'Thai Language', 'Elocution', 'Danish Language', 'Turkish Language', 'Polish Language', 'Finnish Language',
  'Hebrew Language', 'Latin Language',
];

const options = {
  2: ['ICSE', 'CBSE', 'State Board', 'International Baccalaureate', 'IGCSE', 'None of the above'],
  5: ['Not sure, just want to see options', 'Immediately', 'Within a month'],
  6: ['Live Interactive Online Classes (recommended)', 'Offline at my home or nearby classes'],
  7: ['No preference', 'Male only', 'Female only'],
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzU3MTQ0YTZjY2Q0YjExM2UwMjMxOCIsImlhdCI6MTcyNzUyODE0Nn0.-YaZ6iMa48JdqRnh60YMP9zzXnlmaCuXhm51Ss1KCkM'; // Use the provided token

const DemoForm = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [coordinates, setCoordinates] = useState([51.505, -0.09]);
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState(''); // For fee input
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [contactDetails, setContactDetails] = useState({ email: '', phone: '' });
  
    const handleNext = async (event) => {
      event.preventDefault();
      let newResponses = { ...responses };
    
      // Handle the responses for each question
      switch (currentQuestionIndex) {
        case 0:
        case 1:
          newResponses[questions[currentQuestionIndex]] = inputValue;
          break;
        case 2:
          newResponses['board'] = inputValue; // board of education
          break;
        case 3:
          newResponses['location'] = inputValue1; // location
          break;
        case 4:
          newResponses['salary'] = { max: inputValue1, period: 'monthly' }; // maximum fee
          break;
        case 5:
          newResponses['start'] = selectedOptions[0]; // start tuition date
          break;
        case 6:
          newResponses['typeOfClass'] = selectedOptions[0]; // type of class
          break;
        case 7:
          newResponses['genderPreference'] = selectedOptions[0]; // gender preference
          break;
        case 8:
          newResponses['email'] = contactDetails.email;
          newResponses['phone'] = contactDetails.phone;
          break;
        default:
          break;
      }
    
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        resetInputState();
      } else {
        setIsSubmitted(true);
    
        // Make the POST request
        try {
          const response = await fetch('https://backend.akshayy.tech/submit-learning-need', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token here
            },
            body: JSON.stringify(newResponses), // Send the form data as JSON
          });
    
          const data = await response.json();
          if (response.ok) {
            alert('Form submitted successfully');
            console.log('Response from server:', data);
          } else {
            alert('Error submitting form');
            console.log('Error:', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    
  
    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        resetInputState();
      }
    };
  
    const handleMapChange = (newCoordinates) => {
      setCoordinates(newCoordinates);
    };
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
  
      if (currentQuestionIndex === 0) {
        const filtered = suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion);
      setFilteredSuggestions([]);
    };
  
    const handleOptionChange = (event) => {
      const value = event.target.value;
      const checked = event.target.checked;
  
      if (checked) {
        setSelectedOptions((prev) => [...prev, value]);
      } else {
        setSelectedOptions((prev) => prev.filter((option) => option !== value));
      }
    };
  
    const handleContactChange = (event) => {
      const { name, value } = event.target;
      setContactDetails((prev) => ({ ...prev, [name]: value }));
    };
  
    const resetInputState = () => {
      setInputValue(''); // Clear input value
      setInputValue1(''); // Clear fee input
      setFilteredSuggestions([]); // Clear filtered suggestions
      setSelectedOptions([]); // Clear selected options
    };
 

const renderInputField = () => {
    switch (currentQuestionIndex) {
      case 0: // What do you want to learn?
        return (
          <div className="mt-4 mb-6">
            <Sidebar />
            <Header /> 
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your choice"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {filteredSuggestions.length > 0 && (
              <ul className="border border-gray-300 rounded-md mt-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="cursor-pointer hover:bg-gray-200 px-3 py-2"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 1: // Learning needs description
        return (
            <div className="mt-4 mb-6">
            <Sidebar />
            <Header />
            <textarea
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              height={400}
              placeholder="Enter your description"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
        );

      case 2: // Board of education
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your board</option>
              {options[2].map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
         
        );

      case 3: // Location
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            <input
              type="text"
              placeholder="Enter your address"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setInputValue1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your pincode"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter a landmark"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Enter your city"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="w-full h-88 mb-4">
              <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
            </div>
          </div>
         
        );

      case 4: // Maximum fee
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select payment type</option>
              {options[5].map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
              placeholder="Enter fee amount"
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
       
        );

      case 5: // When do you plan to start?
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            {options[5].map((option, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
         
        );

      case 6: // How would you like to attend your tuition classes?
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            {options[6].map((option, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 7: // Tutor gender preference
        return (
            <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            {options[7].map((option, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 8: // Contact details
        return (
          <div className="mt-4 mb-6">
              <Sidebar />
              <Header />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={contactDetails.email}
              onChange={handleContactChange}
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={contactDetails.phone}
              onChange={handleContactChange}
              className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="md:mt-48">
    <Sidebar />
      <Header />
    <div className="container mx-auto w-2/5 my-10 p-4 shadow-lg">
      
      <form onSubmit={handleNext}>
        <div className="mb-4">
          <h3 className="text-lg">{questions[currentQuestionIndex]}</h3>
          {renderInputField()}
        </div>
        <div className="flex justify-between">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
      {isSubmitted && (
        <div className="mt-4 text-green-500">
          Your responses have been submitted successfully!
        </div>
      )}
    </div>
    </div>
  );
};

export default DemoForm;

