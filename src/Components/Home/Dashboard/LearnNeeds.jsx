import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';

const LearningNeeds = () => {
  const [learningNeeds, setLearningNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [closingReason, setClosingReason] = useState("");
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
        });
        setLearningNeeds(response.data || []);
      } catch (error) {
        console.error("Failed to fetch learning needs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningNeeds();
  }, []);

  const handleDeleteNeed = async () => {
    const email = "akshaybhandari020@gmail.com";

    try {
      await axios.post("https://server.avyudha.com/close-need", {
        id: deleteId,
        email,
        closingReason
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setLearningNeeds((prevNeeds) => prevNeeds.filter((need) => need._id !== deleteId));
      alert("Learning need deleted successfully.");
      setDeleteId(null);
      setClosingReason("");
    } catch (error) {
      console.error("Error deleting learning need:", error);
      alert("Failed to delete learning need. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
       <Sidebar />
       <Header />
       <div className="lg:ml-64 mt-24 lg:mt-18 p-4 lg:p-28 bg-gray-100 lg:space-x-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Find Your Tutor</h2>
          <p className="text-gray-600 mt-2">Connect with experienced tutors to fulfill your Tuitions.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner border-blue-600"></div>
          </div>
        ) : learningNeeds.length === 0 ? (
          <div className="flex items-center justify-center h-64">
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
                <p className="text-sm text-gray-500 mt-1">{learningNeed.description}</p>
                <div className="flex justify-between mt-4">
  <Link to={`/getNeed/${learningNeed._id}`} className="text-blue-500 hover:underline">
    View Details
  </Link>
  {learningNeed.fulfilled ? (
    <span className="text-gray-500">Closed</span>
  ) : (
    <button
      onClick={() => setDeleteId(learningNeed._id)}
      className="text-red-500 hover:underline"
    >
      Close
    </button>
  )}
</div>

              </div>
            ))}
          </div>
        )}

        {deleteId && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
            <textarea
              value={closingReason}
              onChange={(e) => setClosingReason(e.target.value)}
              placeholder="Enter closing reason..."
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDeleteNeed}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm Close
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningNeeds;

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

const styleElement = document.createElement("style");
styleElement.textContent = spinnerStyles;
document.head.appendChild(styleElement);