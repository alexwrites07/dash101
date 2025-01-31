import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Conversation = () => {
  const { conversationId } = useParams();
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [name,setName]=useState([]);
  const [recipientId, setRecipientId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");
  const contactName = localStorage.getItem('selectedContactName');
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

  // Function to fetch messages
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

  // Fetch messages when userId is available
  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [userId, conversationId]);

  // Handle sending a message
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

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {loadingUser ? (
        <p className="text-gray-500">Fetching user information...</p>
      ) : loadingMessages ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (

        <div className="flex-1 overflow-y-auto mb-4">
            <div className="bg-white p-4 shadow-md">
        <h3 className="text-xl font-bold text-gray-700">{name || 'No contact selected'}</h3> {/* Show contact's name */}
      </div>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-2 my-2 max-w-xs rounded-lg ${
                message.sender === userId ? "bg-green-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
              }`}
            >
              <p>{message.message}</p>
              <span className="text-xs text-black-500">
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Input Box and Send Button */}
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
