import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "./AdminSidebar";
const MeetingsDashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://server.avyudha.com/admin/meetings", 
            { headers: { Authorization: `Bearer ${token}` } 
        });
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
    {/* Title should be above everything */}
    <h1 className="text-2xl font-bold text-center mb-6">Meetings Dashboard</h1>

    {/* Wrapper for Header & Sidebar */}
    <div className="flex flex-col items-center space-y-6">
      <Header />

      <div className="flex w-full justify-between space-x-4">
        <div className="md:w-1/4">
          <Sidebar />
        </div>

        <div className="flex-1">
          {loading ? (
            <p className="text-center text-gray-500">Loading meetings...</p>
          ) : (
            <div className="overflow-x-auto ml-64">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left border-b">Meeting Title</th>
                    <th className="p-3 text-left border-b">Employer Email</th>
                    <th className="p-3 text-left border-b">Participants</th>
                    <th className="p-3 text-left border-b">Date</th>
                    <th className="p-3 text-left border-b">Time</th>
                    <th className="p-3 text-left border-b">Duration (mins)</th>
                    <th className="p-3 text-left border-b">Meeting Link</th>
                    <th className="p-3 text-left border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((meeting) => (
                    <tr key={meeting._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{meeting.meetingTitle}</td>
                      <td className="p-3 border-b">{meeting.employerEmail}</td>
                      <td className="p-3 border-b">{meeting.participantsEmail.join(", ")}</td>
                      <td className="p-3 border-b">{new Date(meeting.date).toLocaleDateString()}</td>
                      <td className="p-3 border-b">{meeting.time}</td>
                      <td className="p-3 border-b">{meeting.duration}</td>
                      <td className="p-3 border-b">
                        {meeting.meetingLink ? (
                          <a
                            href={meeting.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Join
                          </a>
                        ) : (
                          "No Link"
                        )}
                      </td>
                      <td className="p-3 border-b">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            meeting.status === "Confirmed"
                              ? "bg-green-500"
                              : meeting.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {meeting.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default MeetingsDashboard;
