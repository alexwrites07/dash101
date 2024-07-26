import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrash, FaClock, FaHourglassStart, FaSyncAlt, FaEnvelope } from 'react-icons/fa';
import { gapi } from 'gapi-script';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      employer: 'Acme Corp',
      participant: 'John Doe',
      title: 'Team Meeting',
      date: new Date('2024-07-05').toDateString(),
      time: '10:00 AM',
      duration: '1 hour',
    },
    {
      employer: 'Tech Solutions',
      participant: 'Jane Smith',
      title: 'Client Presentation',
      date: new Date('2024-07-10').toDateString(),
      time: '2:00 PM',
      duration: '2 hours',
    },
  ]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('09:00 AM');
  const [meetingDuration, setMeetingDuration] = useState('1 hour');
  const [meetingEmployer, setMeetingEmployer] = useState('');
  const [meetingParticipant, setMeetingParticipant] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [notification, setNotification] = useState('');

  const CLIENT_ID = '350792226388-r3cd31m7mot1m8esu45dcnvt9s8gkjm5.apps.googleusercontent.com';
  const API_KEY = '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';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
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
        index === editingMeeting
          ? {
              employer: meetingEmployer,
              participant: meetingParticipant,
              title: meetingTitle,
              date: meetingDate.toDateString(),
              time: meetingTime,
              duration: meetingDuration,
            }
          : meeting
      );
      setMeetings(updatedMeetings);
      setNotification('Meeting updated successfully.');
    } else {
      // Adding a new meeting
      const newMeeting = {
        employer: meetingEmployer,
        participant: meetingParticipant,
        title: meetingTitle,
        date: meetingDate.toDateString(),
        time: meetingTime,
        duration: meetingDuration,
      };
      setMeetings([...meetings, newMeeting]);
      setNotification('Meeting added successfully.');
    }
    setMeetingTitle('');
    setMeetingDate(new Date());
    setMeetingTime('09:00 AM');
    setMeetingDuration('1 hour');
    setMeetingEmployer('');
    setMeetingParticipant('');
    setEditingMeeting(null);
  };

  const handleEditMeeting = (index) => {
    const meeting = meetings[index];
    setEditingMeeting(index);
    setMeetingEmployer(meeting.employer);
    setMeetingParticipant(meeting.participant);
    setMeetingTitle(meeting.title);
    setMeetingDate(new Date(meeting.date));
    setMeetingTime(meeting.time);
    setMeetingDuration(meeting.duration);
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
        'dateTime': new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(),
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
      <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col justify-center lg:justify-start">

        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Scheduled Meetings</h1>
          {filteredMeetings.length === 0 ? (
            <p className="text-md text-gray-700 mb-4">No meetings scheduled</p>
          ) : (
            <ul className="bg-white p-4 rounded-lg shadow-md">
              {filteredMeetings.map((meeting, index) => (
                <li key={index} className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="text-center mr-4">
                      <p className="text-2xl font-bold text-gray-900">{new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                      <p className="text-xl text-gray-700">{new Date(meeting.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-md font-semibold text-gray-900">Employer: {meeting.employer}</p>
                      <p className="text-md text-gray-700">Meeting with: {meeting.participant}</p>
                      <div className="flex items-center text-md text-gray-700">
                        <FaClock className="mr-1" /> {meeting.time} <FaHourglassStart className="mx-2" /> {meeting.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditMeeting(index)}
                      className="py-1 px-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    >
                      <FaSyncAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteMeeting(index)}
                      className="py-1 px-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => alert(`Messages regarding the meeting: ${meeting.title}`)}
                      className="py-1 px-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <FaEnvelope />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full mt-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{editingMeeting !== null ? 'Edit Meeting' : 'Schedule a Meeting'}</h1>
          <form onSubmit={handleAddMeeting} className="bg-white p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between">
            
            <div className="w-full lg:w-1/3 lg:pr-8"> {/* Calendar on the left */}
              <label className="text-md text-gray-700 mb-2 block">Select Date:</label>
              <Calendar
                onChange={setMeetingDate}
                value={meetingDate}
                className="mb-4 lg:mb-0"
                tileClassName="h-12 w-12" // Optional: Increase tile size for better visibility
              />
            </div>

            <div className="w-full lg:w-2/3 lg:pl-8"> {/* Form fields on the right */}
              <label className="text-md text-gray-700 mb-2">Employer:</label>
              <input
                type="text"
                className="p-2 mb-4 border rounded-lg w-full"
                value={meetingEmployer}
                onChange={(e) => setMeetingEmployer(e.target.value)}
                placeholder="Enter employer name"
              />

              <label className="text-md text-gray-700 mb-2">Meeting With:</label>
              <input
                type="text"
                className="p-2 mb-4 border rounded-lg w-full"
                value={meetingParticipant}
                onChange={(e) => setMeetingParticipant(e.target.value)}
                placeholder="Enter participant name"
              />

              <label className="text-md text-gray-700 mb-2">Meeting Title:</label>
              <input
                type="text"
                className="p-2 mb-4 border rounded-lg w-full"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Enter meeting title"
              />

              <label className="text-md text-gray-700 mb-2">Time:</label>
              <input
                type="time"
                className="p-2 mb-4 border rounded-lg w-full"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                placeholder="Enter meeting time"
              />

              <label className="text-md text-gray-700 mb-2">Duration:</label>
              <input
                type="text"
                className="p-2 mb-4 border rounded-lg w-full"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value)}
                placeholder="Enter duration (e.g., 1 hour)"
              />

              <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-1/4">
                {editingMeeting !== null ? 'Update Meeting' : 'Add Meeting'}
              </button>
            </div>

          </form>
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
