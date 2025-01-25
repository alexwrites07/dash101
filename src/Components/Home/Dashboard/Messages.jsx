import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch conversations
  useEffect(() => {
    axios
      .get("https://server.avyudha.com/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setConversations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      });
  }, [token]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:mm:ss"
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col lg:flex-row items-center lg:items-start h-full">
          <div className="flex-1 p-4 h-full ">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Your Conversations
            </h2>
            <div className="bg-white p-4 rounded-lg  h-full flex flex-col">
              {loading ? (
                <p className="text-gray-500">Loading conversations...</p>
              ) : conversations.length === 0 ? (
                <p className="text-gray-500">No conversations found.</p>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="mb-4 p-4 border-b border-gray-200"
                  >
                    {/* Display Group Name or Participants */}
                    <h3 className="text-lg font-bold text-gray-700 mb-1">
                      {conversation.isGroup
                        ? ` ${conversation.groupName}`
                        : ` ${conversation.participants
                            .map((p) => p.name)
                            .join(", ")}`}
                    </h3>
                    {/* Last Message */}
                    <p className="text-gray-600">
                      <strong></strong>{" "}
                      {conversation.lastMessage || " "}
                    </p>
                    {/* Last Message Timestamp */}
                    <p className="text-sm text-gray-500">
                      <strong></strong>{" "}
                      {conversation.lastMessageTimestamp
                        ? formatDate(conversation.lastMessageTimestamp)
                        : "N/A"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
