import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from './Sidebar';
import Header from './Header';

const LearningNeeds = () => {
  const [learningNeeds, setLearningNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchLearningNeeds = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://server.avyudha.com/my-learning-needs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });// Replace with your API endpoint
        setLearningNeeds(response.data || []);
      } catch (error) {
        console.error("Failed to fetch learning needs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningNeeds();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
       <Sidebar />
       <Header />
       <div className="lg:ml-64 mt-24 lg:mt-18 p-4 lg:p-28 bg-gray-100 lg:space-x-8">
        {/* Tutor Card Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Find Your Tutor</h2>
          <p className="text-gray-600 mt-2">
            Connect with experienced tutors to fulfill your Tuitions.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner border-blue-600"></div>
          </div>
        ) : learningNeeds.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            {/* <img
              src="/assets/blank.png"
              alt="No data"
              className="h-40 w-40 object-contain"
            /> */}
            <p className="text-gray-600 text-lg mt-4">No Tuitions found.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {learningNeeds.map((learningNeed, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {learningNeed.requirement}
                </h3>
                c
                <p className="text-sm text-gray-500 mt-1">{learningNeed.description}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Book a Demo
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningNeeds;

// CSS for spinner
const spinnerStyles = `
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid transparent;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

// Add spinner styles to the document
const styleElement = document.createElement("style");
styleElement.textContent = spinnerStyles;
document.head.appendChild(styleElement);
