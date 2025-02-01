import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import categoriesList from "../Dashboard/AdminPanel/categories.json";

const AlertJobs = () => {
  const [typeOfClass, setTypeOfClass] = useState("");
  const [city, setCity] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [genderPreference, setgenderPreference] = useState("");
  const [requirement, setrequirement] = useState("");
  const [categories, setCategories] = useState([]);
  const [inputText1, setInputText1] = useState("");
  const [board, setboard] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch alerts on component mount
  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await fetch(
          "https://server.avyudha.com/tutor/needAlerts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch alerts");
        }

        const result = await response.json();
        setAlerts(result);
      } catch (error) {
        console.error("Error fetching alerts:", error.message);
      }
    };

    fetchAlerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    const queryString = new URLSearchParams({
      typeOfClass,
      genderPreference,
      requirement,
      [`location.city`]: city,
      board,
    }).toString();

    const payload = {
      uri: `https://server.avyudha.com/learning-needs?${queryString}`,
    };

    try {
      setIsSaving(true);
      const response = await fetch("https://server.avyudha.com/saveNeeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save filter");
      }

      const result = await response.json();
      alert("Alert saved successfully", result);
      setIsSaving(false);
    } catch (error) {
      console.error("Error saving filter:", error.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-6">
      <div className="flex flex-col lg:flex-row mt-36">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 bg-white shadow-lg rounded-lg p-6">
          <Header />
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Set Candidate Alerts
          </h3>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* City Input */}
            <div>
              <label className="block font-semibold">City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Gender Dropdown */}
            <div>
              <label className="block font-semibold">Gender:</label>
              <select
                value={genderPreference}
                onChange={(e) => setgenderPreference(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>

            {/* Type of Class Dropdown */}
            <div>
              <label className="block font-semibold">Type of Class:</label>
              <select
                value={typeOfClass}
                onChange={(e) => setTypeOfClass(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select Type of Class</option>
                <option value="Online (Recommended)">Online (Recommended)</option>
                <option value="Offline: At tutor's place">
                  Offline: At tutor's place
                </option>
                <option value="Offline: At student's place">
                  Offline: At student's place
                </option>
                <option value="Offline: Nearby classes">
                  Offline: Nearby classes
                </option>
              </select>
            </div>

            {/* Board Dropdown */}
            <div>
              <label className="block font-semibold">Board:</label>
              <select
                value={board}
                onChange={(e) => setboard(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select Board</option>
                <option value="ICSE">ICSE</option>
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="International Baccalaureate">
                  International Baccalaureate
                </option>
                <option value="IGCSE">IGCSE</option>
                <option value="None of the above">None of the above</option>
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition duration-200"
            >
              {isSaving ? "Saving..." : "Save Alert"}
            </button>
          </form>

          {/* Displaying Alerts */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
  <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Saved Alerts</h3>
  
  {alerts.length > 0 ? (
    <ul className="space-y-4">
      {alerts.map((alert) => (
        <li key={alert._id} className="p-5 bg-gray-100 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
            <p><strong className="text-gray-900">Type of Class:</strong> {alert.filter.typeOfClass.join(", ")}</p>
            <p><strong className="text-gray-900">City:</strong> {alert.filter.location?.city}</p>
            <p><strong className="text-gray-900">Gender Preference:</strong> {alert.filter.genderPreference}</p>
            <p><strong className="text-gray-900">Requirement:</strong> {alert.filter.requirement}</p>
            <p><strong className="text-gray-900">Board:</strong> {alert.filter.board}</p>
            <p><strong className="text-gray-900">Created At:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600 text-center p-4 bg-gray-50 rounded-md">No alerts found.</p>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default AlertJobs;
