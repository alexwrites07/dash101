import React, { useState, useEffect } from "react";
import { createMeeting, deleteMeeting, editMeeting, getPurchasedContacts } from "./MeetingServices.jsx";
import './Meeting.css'; // Import the CSS file
import Sidebar from './Sidebar';
import Header from './Header';
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
      const token = localStorage.getItem("token");  // Assuming token is stored in local storage
      const response = await fetch("https:/server.avyudha.com/meetings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
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
        meetingLink: newMeeting.meetingLink,
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
      fetchMeetings();  // Refresh meetings list after creating a new meeting
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMeeting = async (id, updatedData) => {
    try {
      const body = {
        meetingTitle: updatedData.meetingTitle || editMeetingData.meetingTitle,
        participantsEmail: updatedData.participantsEmail || editMeetingData.participantsEmail,
        date: updatedData.date || editMeetingData.date,
        time: updatedData.time || editMeetingData.time,
        duration: updatedData.duration || editMeetingData.duration,
        meetingLink: updatedData.meetingLink || editMeetingData.meetingLink,
      };
      await editMeeting(id, body);
      console.log("Meeting updated successfully");
      setEditMeetingData(null); // Reset after edit
      fetchMeetings();  // Refresh meetings list after updating a meeting
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await deleteMeeting(id);
      console.log("Meeting deleted successfully");
      fetchMeetings();  // Refresh meetings list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = (meeting) => {
    setEditMeetingData(meeting); // Set the meeting to be edited
  };

  useEffect(() => {
    fetchPurchasedContacts();
    fetchMeetings();  // Fetch meetings when the component mounts
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-24">
      <Sidebar />
       <Header />
       <div className="lg:ml-64 lg:mt-18 p-4">
      <h1>Meeting Manager</h1>
      
      <div className="create-meeting">
        <h2>Create a New Meeting</h2>
        <input
          type="text"
          placeholder="Title"
          value={newMeeting.meetingTitle}
          onChange={(e) => setNewMeeting({ ...newMeeting, meetingTitle: e.target.value })}
        />
        <input
          type="email"
          placeholder="Participant Email"
          value={newMeeting.participantsEmail}
          onChange={(e) => setNewMeeting({ ...newMeeting, participantsEmail: e.target.value.split(',') })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newMeeting.date}
          onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
        />
        <input
          type="time"
          placeholder="Time"
          value={newMeeting.time}
          onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={newMeeting.duration}
          onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Meeting Link"
          value={newMeeting.meetingLink}
          onChange={(e) => setNewMeeting({ ...newMeeting, meetingLink: e.target.value })}
        />
        <button onClick={handleCreateMeeting}>Create Meeting</button>
      </div>

      <div className="meetings">
        <h2>Meetings</h2>
        <ul>

        {meetings.length > 0 ? (
  meetings.map((meeting) => (
    <li key={meeting._id} className="p-4 border-b">
      <div className="font-semibold">{meeting.meetingTitle}</div>
      <div className="text-gray-600">{new Date(meeting.date).toLocaleDateString()}</div>
      <div className="text-gray-600">{meeting.time}</div>
      <div className="text-gray-600">{meeting.duration} mins</div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleEditButtonClick(meeting)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteMeeting(meeting._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  ))
) : (
  <p className="text-gray-500 mt-4">No meetings found. Please create a new meeting.</p>
)}

        </ul>
      </div>

      {editMeetingData && (
  <div className="edit-meeting bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
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
        placeholder="Participant Email (comma-separated)"
        value={editMeetingData.participantsEmail}
        onChange={(e) => setEditMeetingData({ ...editMeetingData, participantsEmail: e.target.value.split(',') })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="date"
        placeholder="Date"
        value={editMeetingData.date}
        onChange={(e) => setEditMeetingData({ ...editMeetingData, date: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="time"
        placeholder="Time"
        value={editMeetingData.time}
        onChange={(e) => setEditMeetingData({ ...editMeetingData, time: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="number"
        placeholder="Duration (in minutes)"
        value={editMeetingData.duration}
        onChange={(e) => setEditMeetingData({ ...editMeetingData, duration: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Meeting Link"
        value={editMeetingData.meetingLink}
        onChange={(e) => setEditMeetingData({ ...editMeetingData, meetingLink: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={() => handleEditMeeting(editMeetingData._id, editMeetingData)}
        className="w-full py-2 bg-green-400 text-black font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Update Meeting
      </button>
    </div>
  </div>
)}

    </div>
    </div>
  );
};

export default Meetings;
