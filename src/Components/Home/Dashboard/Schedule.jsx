import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from './Sidebar';
import Header from './Header';

const Meeti = () => {
  const [meetings, setMeetings] = useState([]);
  const [editMeetingData, setEditMeetingData] = useState(null);
  const [freeSlots, setFreeSlots] = useState({});
  const [isTutor, setIsTutor] = useState(false);
  const [classCost, setClassCost] = useState(0); // Added state for classCost
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
      setClassCost(response.data.classCost); // Assuming `classCost` is part of the response
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFreeSlots(updatedSlots);
      setIsSaving(false);
      alert("Schedule Updated");
      setNewSlot({ startTime: "", endTime: "" });
    } catch (error) {
      console.error("Error updating free slots:", error);
    }
  };

  const handleDeleteSlot = async (day, slotId) => {
    const updatedSlots = {
      ...freeSlots,
      [day]: freeSlots[day].filter((slot) => slot._id !== slotId),
    };

    try {
      setIsSaving1(true);
      await axios.put(
        "https://server.avyudha.com/dashboard/Tutor",
        { freeSlots: updatedSlots },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFreeSlots(updatedSlots);
      setIsSaving1(false);
      alert("Schedule Updated");
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl lg:ml-80 lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1">
        <Sidebar />

        {isTutor && (
          <div className="mt-10">
            {classCost > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Manage Free Slots</h2>
                <div className="flex items-center gap-4 mb-6">
                  <label htmlFor="day-select" className="font-medium">
                    Select Day:
                  </label>
                  <select
                    id="day-select"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                <div className="flex items-center gap-4 mb-6">
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleAddSlot}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {isSaving ? "Adding Slot..." : "Add Slot"}
                  </button>
                </div>

                {Object.keys(freeSlots).map((day) => (
                  <div key={day} className="mb-6">
                    <h3 className="text-lg font-medium mb-2">{day}</h3>
                    <ul className="space-y-2">
                      {freeSlots[day].map((slot) => (
                        <li key={slot._id} className="flex items-center justify-between">
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <button
                            onClick={() => handleDeleteSlot(day, slot._id)}
                            className="px-4 py-2 text-red-600 hover:underline"
                          >
                            Delete Slot
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
