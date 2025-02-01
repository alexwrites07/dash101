import React, { useState, useEffect } from "react";
import { createMeeting, deleteMeeting, editMeeting, getPurchasedContacts } from "./MeetingServices.jsx";
import "./Meeting.css"; // Import the CSS file
import Sidebar from "./Sidebar";
import { FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";
import Header from "./Header";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [purchasedContacts, setPurchasedContacts] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    meetingTitle: "",
    participantsEmail: [],
    date: "",
    time: "",
    duration: 0,
    meetingLink: "",

  });

  const [editMeetingData, setEditMeetingData] = useState(null);

  const fetchPurchasedContacts = async () => {
    try {
      const contacts = await getPurchasedContacts();
      setPurchasedContacts(contacts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in local storage
      const response = await fetch("https://server.avyudha.com/meetings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
      const meetingsData = await response.json();
      setMeetings(meetingsData);
    } catch (error) {
      console.log("Error fetching meetings:", error);
    }
  };

  const handleCreateMeeting = async () => {
    try {
      const body = {
        meetingTitle: newMeeting.meetingTitle,
        participantsEmail: newMeeting.participantsEmail,
        date: newMeeting.date,
        time: newMeeting.time,
        duration: newMeeting.duration,
        
      };
      await createMeeting(body);
      console.log("Meeting created successfully");
      setNewMeeting({
        meetingTitle: "",
        participantsEmail: [],
        date: "",
        time: "",
        duration: 60,
        meetingLink: "",
      }); // Reset state after creation
      fetchMeetings(); // Refresh meetings list after creating a new meeting
    } catch (error) {
      alert(error);
    }
  };

  const handleEditMeeting = async () => {
    try {
      const body = {
        meetingTitle: editMeetingData.meetingTitle,
        participantsEmail: editMeetingData.participantsEmail,
        date: editMeetingData.date,
        time: editMeetingData.time,
        duration: editMeetingData.duration,
        status:editMeetingData.status,
        meetingLink:editMeetingData.meetingLink,
       
      };
      await editMeeting(editMeetingData._id, body);
      console.log("Meeting updated successfully");
      setEditMeetingData(null); // Reset after edit
      fetchMeetings(); // Refresh meetings list after updating a meeting
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await deleteMeeting(id);
      console.log("Meeting deleted successfully");
      fetchMeetings(); // Refresh meetings list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = (meeting) => {
    setEditMeetingData(meeting); // Set the meeting to be edited
  };

  useEffect(() => {
    fetchPurchasedContacts();
    fetchMeetings(); // Fetch meetings when the component mounts
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-24">
      <Sidebar />
      <Header />
      <div className="lg:ml-64 lg:mt-18 p-6">
        
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Meeting Manager</h1>

        {/* Create Meeting Form */}
        <div className="create-meeting mb-12 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a New Meeting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Meeting Title"
              value={newMeeting.meetingTitle}
              onChange={(e) => setNewMeeting({ ...newMeeting, meetingTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Participant Email"
              value={newMeeting.participantsEmail}
              onChange={(e) => setNewMeeting({ ...newMeeting, participantsEmail: e.target.value.split(",") })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="time"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              value={newMeeting.duration}
              onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* <input
              type="text"
              value={newMeeting.meetingLink}
              onChange={(e) => setNewMeeting({ ...newMeeting, meetingLink: e.target.value })}
              placeholder="Meeting Link"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            /> */}
          </div>
          <button
            onClick={handleCreateMeeting}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Meeting
          </button>
        </div>

        <div className="meetings bg-white p-6 rounded-xl shadow-lg">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meetings</h2>

      {/* Meeting List */}
      <ul className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <li
              key={meeting._id}
              className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition duration-200"
            >
              {/* Meeting Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-xl text-gray-800">
                  {meeting.meetingTitle}
                </h3>
                {/* Status Indicator */}
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    meeting.status === "Scheduled"
                      ? "bg-green-100 text-green-600"
                      : meeting.status === "Completed"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {meeting.status}
                </span>
              </div>

              {/* Meeting Details */}
              <div className="text-gray-600 text-sm space-y-1">
                <p>
                  📅 Date:{" "}
                  <span className="font-medium">
                    {new Date(meeting.date).toLocaleDateString()}
                  </span>
                </p>
                <p>⏰ Time: {meeting.time}</p>
                <p>⏳ Duration: {meeting.duration} mins</p>

                {/* Meeting Link */}
                <p>
                  🔗 Link:{" "}
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline flex items-center"
                  >
                    {meeting.meetingLink} <FiExternalLink className="ml-1" />
                  </a>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEditButtonClick(meeting)}
                  className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  <FiEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMeeting(meeting._id)}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No meetings found. Please create a new meeting.
          </p>
        )}
      </ul>
    </div>

        {/* Edit Meeting Modal */}
        {editMeetingData && (
          <div className="edit-meeting bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Edit Meeting</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editMeetingData.meetingTitle}
                onChange={(e) => setEditMeetingData({ ...editMeetingData, meetingTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Participant Email"
                value={editMeetingData.participantsEmail}
                onChange={(e) =>
                  setEditMeetingData({ ...editMeetingData, participantsEmail: e.target.value.split(",") })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Link"
                value={editMeetingData.meetingLink}
                onChange={(e) =>
                  setEditMeetingData({ ...editMeetingData, meetingLink: e.target.value.split(",") })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="date"
                value={editMeetingData.date}
                onChange={(e) => setEditMeetingData({ ...editMeetingData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="time"
                value={editMeetingData.time}
                onChange={(e) => setEditMeetingData({ ...editMeetingData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                value={editMeetingData.duration}
                onChange={(e) => setEditMeetingData({ ...editMeetingData, duration: e.target.value })}
                placeholder="Duration (minutes)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
               

<input
                type="text"
                value={editMeetingData.status}
                onChange={(e) => setEditMeetingData({ ...editMeetingData, status: e.target.value })}
                placeholder="Status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setEditMeetingData(null)}
                className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditMeeting}
                className="px-6 py-2 ml-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;
