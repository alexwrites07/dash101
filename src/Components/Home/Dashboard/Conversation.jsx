import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const Conversation = () => {
  const { conversationId } = useParams(); // Conversation ID from URL
  const [userId, setUserId] = useState(null); // Logged-in User ID
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState(null); // Recipient ID
  const [messageInput, setMessageInput] = useState(""); // Input for new messages
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type"); // User type

  // Fetch the userId based on the user type
  useEffect(() => {
    axios
      .get(`https://server.avyudha.com/dashboard/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("User ID fetched:", response.data._id);
        setUserId(response.data._id); // Store the user ID
        console.log("user id",userId)
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        setLoadingUser(false);
      });
  }, [type, token]);

  // Fetch messages for the conversation
  useEffect(() => {
    if (!userId || !conversationId) return;
  
    setLoadingMessages(true);
    axios
      .get(`https://server.avyudha.com/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const messages = response.data;
        console.log("Messages fetched:", messages);
        setMessages(messages); // Save the messages in state
  
        // Determine recipient ID
        if (messages.length > 0) {
          const firstMessage = messages[0]; // Take the first message as reference
          const recipients = firstMessage.recipients;
          const senderId = firstMessage.sender;
        
          // Check recipients for non-matching ID
          const nonMatchingRecipientId = recipients.find((id) => id !== userId);
         // Exclude current user ID
      console.log(nonMatchingRecipientId)
          if (nonMatchingRecipientId) {
            console.log("Recipient ID determined:", nonMatchingRecipientId);
            setRecipientId(nonMatchingRecipientId);
          } else {
            console.error("Failed to determine recipient ID");
            setRecipientId(senderId);
          }
        } else {
          console.warn("No messages found for this conversation");
        }
  
        setLoadingMessages(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoadingMessages(false);
      });
  }, [conversationId, userId, token]);
  

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !recipientId) {
      console.error("Message input or recipient ID is invalid");
      return;
    }

    const payload = {
      recipientId,
      message: messageInput,
    };

    console.log("Sending message with payload:", payload);

    axios
      .post("https://server.avyudha.com/send-message", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Message sent successfully:", response.data);

        // Append the new message to the messages list
        setMessages((prevMessages) => [
          ...prevMessages,
          { _id: response.data._id, sender: userId, message: messageInput },
        ]);

        // Clear the input field
        setMessageInput("");
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
          {messages.map((message) => (
            <div
            key={message._id}
            className={`p-2 my-2 max-w-xs rounded-lg ${
              message.sender === userId
                ? 'bg-green-500 text-white ml-auto'
                : 'bg-gray-300 text-black mr-auto'
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
