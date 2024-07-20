import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { gapi } from 'gapi-script';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      title: 'Team Meeting',
      date: new Date('2024-07-05').toDateString(), // Example date format
    },
    {
      title: 'Client Presentation',
      date: new Date('2024-07-10').toDateString(), // Example date format
    },
  ]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [filterDate, setFilterDate] = useState(null);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [notification, setNotification] = useState('');

  // const CLIENT_ID= process.env.CLIENT_ID;
  // const API_KEY = process.env.API_KEY;
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      console.log('User signed in');
    } else {
      console.log('User signed out');
    }
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (editingMeeting !== null) {
      // Editing an existing meeting
      const updatedMeetings = meetings.map((meeting, index) =>
        index === editingMeeting ? { title: meetingTitle, date: meetingDate.toDateString() } : meeting
      );
      setMeetings(updatedMeetings);
      setNotification('Meeting updated successfully.');
    } else {
      // Adding a new meeting
      const newMeeting = {
        title: meetingTitle,
        date: meetingDate.toDateString(),
      };
      setMeetings([...meetings, newMeeting]);
      setNotification('Meeting added successfully.');
    }
    setMeetingTitle('');
    setMeetingDate(new Date());
    setEditingMeeting(null);
  };

  const handleEditMeeting = (index) => {
    setEditingMeeting(index);
    setMeetingTitle(meetings[index].title);
    setMeetingDate(new Date(meetings[index].date));
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = meetings.filter((_, i) => i !== index);
    setMeetings(updatedMeetings);
    setNotification('Meeting deleted successfully.');
  };

  const handleFilterChange = (date) => {
    setFilterDate(date);
  };

  const createEvent = (title, date) => {
    const event = {
      'summary': title,
      'start': {
        'dateTime': new Date(date).toISOString(),
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // Adding 1 hour
        'timeZone': 'America/Los_Angeles',
      },
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
    });

    request.execute((event) => {
      console.log('Event created: ' + event.htmlLink);
      setNotification('Meeting added to Google Calendar.');
    });
  };

  const handleAddToGoogleCalendar = (meeting) => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      createEvent(meeting.title, meeting.date);
    });
  };

  const filteredMeetings = filterDate
    ? meetings.filter((meeting) => new Date(meeting.date).toDateString() === filterDate.toDateString())
    : meetings;

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col lg:flex-row justify-center lg:justify-start">
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{editingMeeting !== null ? 'Edit Meeting' : 'Schedule a Meeting'}</h1>
          <form onSubmit={handleAddMeeting} className="bg-white p-4 rounded-lg shadow-md">
            <label className="text-md text-gray-700 mb-2">Meeting Title:</label>
            <input
              type="text"
              className="p-2 mb-4 border rounded-lg w-full"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Enter meeting title"
            />
            
            <label className="text-md text-gray-700 mb-2">Select Date:</label>
            <Calendar
              onChange={setMeetingDate}
              value={meetingDate}
              className="mb-4"
            />

            <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
              {editingMeeting !== null ? 'Update Meeting' : 'Add Meeting'}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 lg:ml-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Scheduled Meetings</h1>
          {filteredMeetings.length === 0 ? (
            <p className="text-md text-gray-700 mb-4">No meetings scheduled</p>
          ) : (
            <ul className="bg-white p-4 rounded-lg shadow-md">
              {filteredMeetings.map((meeting, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <p className="text-md text-gray-900"><strong>{meeting.title}</strong> on {meeting.date}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditMeeting(index)}
                      className="py-1 px-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteMeeting(index)}
                      className="py-1 px-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleAddToGoogleCalendar(meeting)}
                      className="py-1 px-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add to Google Calendar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Meetings;
