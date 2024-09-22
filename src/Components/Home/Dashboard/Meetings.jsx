import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrash, FaClock, FaHourglassStart, FaSyncAlt, FaLink, FaCalendarPlus, FaChevronDown, FaChevronUp, FaEnvelope, FaPlus, FaMinus } from 'react-icons/fa';
import { gapi } from 'gapi-script';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]); // Ensure this is an array to avoid rendering issues
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [meetingEmployer, setMeetingEmployer] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [repeatAfterDays, setRepeatAfterDays] = useState(1);
  const [filterDate, setFilterDate] = useState(null);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [meetingParticipants, setMeetingParticipants] = useState(['']);
  const [showParticipantsForm, setShowParticipantsForm] = useState(false);

  // Google Calendar setup
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  // API key and client ID should be defined
  // const CLIENT_ID = '113370570668-0omscq10m2bji176is0b8tg143sp7evt.apps.googleusercontent.com';
  // const API_KEY = 'AIzaSyASXWfFwiKH3MX-IqtpY-SeFS8s_rdcwF8';

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
      }).catch((error) => {
        console.error("Error during gapi client initialization", error);
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

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8'; // Replace with your actual token logic

  const handleAddMeeting = async (e) => {
    e.preventDefault();

    const meetingData = {
      repeatAfterDays,
      meetingTitle: meetingTitle,
      participantsEmail: meetingParticipants.filter(Boolean),
      date: meetingDate.toISOString().split('T')[0],
      time: meetingTime,
      duration: parseInt(meetingDuration),
      meetingLink: meetingLink,
    };

    console.log('Meeting Data:', meetingData);

    try {
      const url = editingMeeting !== null 
        ? `https://backend.akshayy.tech/meetings/${meetings[editingMeeting]._id}`
        : 'https://backend.akshayy.tech/meetings';
      
      const method = editingMeeting !== null ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use your token here
        },
        body: JSON.stringify(meetingData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingMeeting !== null) {
          const updatedMeetings = meetings.map((meeting, index) =>
            index === editingMeeting ? data : meeting
          );
          setMeetings(updatedMeetings);
          setNotification('Meeting updated successfully.');
        } else {
          setMeetings([...meetings, data]); // Append the new meeting
          setNotification('Meeting added successfully.');
        }
        resetForm();
      } else {
        console.error('Failed to add/edit meeting:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setMeetingTitle('');
    setMeetingDate(new Date());
    setMeetingTime('');
    setMeetingDuration('');
    setMeetingEmployer('');
    setMeetingParticipants(['']);
    setMeetingLink('');
    setRepeatAfterDays(1);
    setEditingMeeting(null);
    setFormVisible(false);
  };

  const handleEditMeeting = (index) => {
    const meeting = meetings[index];
    setEditingMeeting(index);
    setMeetingEmployer(meeting.employer);
    setMeetingTitle(meeting.meetingTitle);
    setMeetingDate(new Date(meeting.date));
    setMeetingTime(meeting.time);
    setMeetingDuration(meeting.duration);
    setMeetingParticipants(meeting.participantsEmail);
    setMeetingLink(meeting.meetingLink);
    setRepeatAfterDays(meeting.repeatAfterDays);
    setFormVisible(true);
  };

  const handleDeleteMeeting = async (index) => {
    const meetingId = meetings[index]._id; // Get the ID of the meeting to be deleted
    const url = `https://backend.akshayy.tech/meetings/${meetingId}`; // API endpoint for deleting the meeting
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Use your token here
        },
      });
  
      if (response.ok) {
        // Remove the meeting from the state after successful deletion
        const updatedMeetings = meetings.filter((_, i) => i !== index);
        setMeetings(updatedMeetings);
        setNotification('Meeting deleted successfully.');
      } else {
        console.error('Failed to delete meeting:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };
  

  const handleFilterChange = (date) => {
    setFilterDate(date);
  };

  const createEvent = (meeting) => {
    if (!gapi.client || !gapi.client.calendar) {
      console.error("gapi client or calendar is not initialized");
      return;
    }
  
    const eventDate = new Date(`${meeting.date} ${meeting.time}`);
    const durationInMinutes = parseInt(meeting.duration.split(' ')[0]);
  
    const event = {
      summary: meeting.meetingTitle,
      start: {
        dateTime: eventDate.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(eventDate.getTime() + durationInMinutes * 60000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
    };
  
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    }).then((response) => {
      const eventLink = response.result.htmlLink;
      setNotification('Meeting added to Google Calendar.');
      if (eventLink) {
        window.open(eventLink, '_blank');
      }
    }).catch((error) => {
      console.error("Error creating event", error);
    });
  };
  
  const handleAddToGoogleCalendar = (meeting) => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      createEvent(meeting);
    });
  };

  const handleAddParticipant = () => {
    setMeetingParticipants([...meetingParticipants, '']);
  };

  const handleRemoveParticipant = (index) => {
    setMeetingParticipants(meetingParticipants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (value, index) => {
    const updatedParticipants = [...meetingParticipants];
    updatedParticipants[index] = value;
    setMeetingParticipants(updatedParticipants);
  };

  const toggleParticipantsForm = () => {
    setShowParticipantsForm(!showParticipantsForm);
  };

  const filteredMeetings = filterDate
    ? meetings.filter((meeting) => new Date(meeting.date).toDateString() === filterDate.toDateString())
    : meetings;

  // Fetch Meetings on Component Mount
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('https://backend.akshayy.tech/meetings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setMeetings(data); // Set the fetched meetings
        } else {
          console.error('Failed to fetch meetings:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, [token]);

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 bg-gray-100 flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-2/3">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Scheduled Meetings</h1>
            <button
              onClick={() => setFormVisible(!formVisible)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule a Meeting
            </button>
          </div>

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
                      {/* <p className="text-md font-semibold text-gray-900">Employer: {meeting.employer}</p> */}
                      <p className="text-md text-gray-700">
                        Participants: {meeting.participantsEmail.slice(0, 3).join(', ')}
                        {meeting.participantsEmail.length > 3 && '...'}
                      </p>
                      <div className="flex items-center text-md text-gray-700">
                        <FaClock className="inline-block mr-2" /> {meeting.time}
                        <FaHourglassStart className="inline-block mx-4" /> {meeting.duration} minutes
                        {meeting.repeatAfterDays && (
                          <>
                            <FaSyncAlt className="inline-block mx-4" /> Every {meeting.repeatAfterDays} days
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEditMeeting(index)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteMeeting(index)}
                    >
                      <FaTrash size={20} />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleAddToGoogleCalendar(meeting)}
                    >
                      <FaCalendarPlus size={20} />
                    </button>
                    <a
                      href={`mailto:${meeting.participantsEmail.join(',')}`}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <FaEnvelope size={20} />
                    </a>
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaLink size={20} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {notification && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
              {notification}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Filter by Date</h2>
          <Calendar onChange={handleFilterChange} value={filterDate} />
        </div>
      </div>

      {formVisible && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 mt-20">
        <form onSubmit={handleAddMeeting} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            {editingMeeting !== null ? 'Edit Meeting' : 'Schedule a New Meeting'}
          </h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Meeting Title</label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Employer Email</label>
              <input
                type="email"
                value={meetingEmployer}
                onChange={(e) => setMeetingEmployer(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div> */}

            <div className="relative mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Participants Email</label>
              <div className="flex">
                <input
                  type="text"
                  value={meetingParticipants[0]}
                  onChange={(e) => handleParticipantChange(e.target.value, 0)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Dropdown to add more"
                />
                <button
                  type="button"
                  onClick={toggleParticipantsForm}
                  className="ml-2 px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  {showParticipantsForm ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              {showParticipantsForm && (
                <div className="absolute top-6 left-0 w-full bg-white border rounded-lg shadow-lg p-4 mt-12 z-10 max-h-52 overflow-y-auto">
                  {meetingParticipants.map((participant, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <input
                        type="email"
                        value={participant}
                        onChange={(e) => handleParticipantChange(e.target.value, index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder={`Participant Email ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus className="inline-block mr-2" /> Add Participant
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={meetingDate.toISOString().split('T')[0]}
                onChange={(e) => setMeetingDate(new Date(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
              <input
                type="text"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Repeat Meeting Every (days)</label>
              <input
                type="number"
                value={repeatAfterDays}
                onChange={(e) => setRepeatAfterDays(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Meeting Link</label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="mr-4 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingMeeting !== null ? 'Update Meeting' : 'Add Meeting'}
            </button>
          </div>
        </form>
      </div>
    )}
    </div>
  );
};

export default Meetings;
