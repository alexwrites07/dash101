import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiSend } from "react-icons/fi"; // Send icon
import { BiArrowBack } from "react-icons/bi"; // Back button

const Conversation = () => {
  const { conversationId } = useParams();
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState([]);
  const [recipientId, setRecipientId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const prevDateRef = useRef(null); // Store the previous date

  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  // Fetch user ID
  useEffect(() => {
    axios
      .get(`https://server.avyudha.com/dashboard/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        setLoadingUser(false);
      });
  }, [type, token]);

  // Fetch messages
  const fetchMessages = () => {
    if (!userId || !conversationId) return;
    setLoadingMessages(true);

    axios
      .get(`https://server.avyudha.com/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data.messages);
        setName(response.data.participantName);
        if (response.data.messages.length > 0) {
          const firstMessage = response.data.messages[0];
          const nonMatchingRecipientId = firstMessage.recipients.find((id) => id !== userId);
          setRecipientId(nonMatchingRecipientId || firstMessage.sender);
        }
        setLoadingMessages(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoadingMessages(false);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [userId, conversationId]);

  // Handle sending message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !recipientId) return;

    const payload = {
      recipientId,
      message: messageInput,
    };

    axios
      .post("https://server.avyudha.com/send-message", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessageInput(""); // Clear input field
        fetchMessages(); // Refresh messages
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // Format date to dd/mm/yyyy
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <h3 className="text-xl font-semibold text-gray-800">{name || "Chat"}</h3>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loadingUser ? (
          <p className="text-gray-500 text-center">Fetching user information...</p>
        ) : loadingMessages ? (
          <p className="text-gray-500 text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          messages.map((message) => {
            const currentMessageDate = formatDate(message.timestamp);
            const showDate = currentMessageDate !== prevDateRef.current;

            if (showDate) {
              prevDateRef.current = currentMessageDate; // Update ref for previous date
            }

            return (
              <div key={message._id} className="space-y-2">
                {showDate && (
                  <div className="text-center text-gray-500 text-xs mt-2">
                    <div className="inline-block px-4 py-2 rounded-full bg-gray-200 text-sm font-medium">
                      {currentMessageDate}
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg shadow-md ${
                    message.sender === userId ? "bg-blue-500 text-white ml-auto" : "bg-white text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <span className="text-xs text-white-400 block mt-1 text-right">
                    {new Date(message.timestamp).toISOString().slice(11, 16)} {/* Time only */}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 flex items-center space-x-2 border-t shadow-md sticky bottom-0">
        <input
          type="text"
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          onClick={handleSendMessage}
        >
          <FiSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Conversation;
