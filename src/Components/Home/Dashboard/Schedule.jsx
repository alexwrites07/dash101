import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiTrash2, FiPlusCircle } from "react-icons/fi"; // Icons for better UI

const Meeti = () => {
  const [freeSlots, setFreeSlots] = useState({});
  const [isTutor, setIsTutor] = useState(false);
  const [classCost, setClassCost] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaving1, setIsSaving1] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [newSlot, setNewSlot] = useState({ startTime: "", endTime: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType === "tutor") {
      setIsTutor(true);
      fetchTutorData();
    }
  }, []);

  // Fetch tutor data including freeSlots and classCost
  const fetchTutorData = async () => {
    try {
      const response = await axios.get("https://server.avyudha.com/dashboard/Tutor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFreeSlots(response.data.freeSlots);
      setClassCost(response.data.classCost);
    } catch (error) {
      console.error("Error fetching tutor data:", error);
    }
  };

  const handleAddSlot = async () => {
    if (!newSlot.startTime || !newSlot.endTime) {
      alert("Please provide valid start and end times.");
      return;
    }

    const updatedSlots = {
      ...freeSlots,
      [selectedDay]: [
        ...(freeSlots[selectedDay] || []),
        { startTime: newSlot.startTime, endTime: newSlot.endTime },
      ],
    };

    try {
      setIsSaving(true);
      await axios.put(
        "https://server.avyudha.com/dashboard/Tutor",
        { freeSlots: updatedSlots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFreeSlots(updatedSlots);
      setNewSlot({ startTime: "", endTime: "" });
      setIsSaving(false);
      alert("Schedule Updated");
    } catch (error) {
      console.error("Error updating free slots:", error);
    }
  };

  const handleDeleteSlot = async (day, slotId) => {
    if (!freeSlots[day]) return; // Prevent errors if the day doesn't exist
  
    const updatedSlots = {
      ...freeSlots,
      [day]: freeSlots[day].filter((slot) => slot._id !== slotId),
    };
  
    try {
      setIsSaving1(true);
  
      await axios.put(
        "https://server.avyudha.com/dashboard/Tutor",
        { freeSlots: updatedSlots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setFreeSlots(updatedSlots);
      alert("Schedule Updated");
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to update schedule. Please try again.");
    } finally {
      setIsSaving1(false);
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 mt-12 sm:mt-24 ">
      <Sidebar />
      <div className="flex-1 p-6 lg:ml-80 mt-12">
        <Header />

        {/* Tutor Schedule Section */}
        {isTutor && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            {classCost > 0 ? (
              <>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Manage Free Slots</h2>

                {/* Select Day and Add Slot */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                  <label htmlFor="day-select" className="font-medium text-gray-700">
                    Select Day:
                  </label>
                  <select
                    id="day-select"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Time Inputs and Add Button */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddSlot}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <FiPlusCircle />
                    {isSaving ? "Adding Slot..." : "Add Slot"}
                  </button>
                </div>

                {/* Display Free Slots */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  {Object.keys(freeSlots).map((day) => (
                    <div key={day} className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">{day}</h3>
                      <ul className="space-y-2">
                        {freeSlots[day].map((slot) => (
                          <li key={slot._id} className="flex justify-between items-center bg-white p-3 rounded-md shadow">
                            <span className="text-gray-700">
                              ⏰ {slot.startTime} - {slot.endTime}
                            </span>
                            <button
                              onClick={() => handleDeleteSlot(day, slot._id)}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                              {isSaving1 ? "Deleting..." : "Delete"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-lg font-medium text-red-500">
                Contact Admin to be an Online Tutor.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meeti;
