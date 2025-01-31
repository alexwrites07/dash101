import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [showContacts, setShowContacts] = useState(false); // Track visibility of the contacts section
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
// New state to show contacts after button click
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch conversations
  useEffect(() => {
    axios
      .get("https://server.avyudha.com/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setConversations(
          response.data.filter((conversation) => !conversation.isGroup) // Exclude groups
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      });
  }, [token]);

  // Fetch purchased contacts on button click
  const fetchContacts = () => {
    setShowContacts(true); // Show contacts section after button click

    axios
      .get("https://server.avyudha.com/purchasedContacts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setContacts(response.data.purchasedContacts); // Store contacts
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };
  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
    localStorage.setItem("selectedContactName", contact.name);
   
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    setMessage("");
    setError("");
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:mm:ss"
  };

  const handleConversationClick = (conversationId) => {
    navigate(`/conversation/${conversationId}`);

  };

  // Send a message
  const sendMessage = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    if (!selectedContact) {
      setError("Please select a contact to send a message");
      return;
    }

    try {
      setIsSending(true);

      const payload = {
        recipientId: selectedContact.contactInfo.id, // Assuming `id` is the unique identifier for the recipient
        message: message.trim(),
      };

      // Send the message
      const response = await axios.post("https://server.avyudha.com/send-message", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Message sent successfully");
        setMessage(""); // Clear the message after sending
      } else {
        setError("Failed to send message");
      }
    } catch (error) {
      setError("Error sending message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="md:mt-12 mt-32 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col lg:flex-row items-center lg:items-start h-full">
          <div className="flex-1 p-4 h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Conversations</h2>
            <div className="bg-white p-4 rounded-lg h-full flex flex-col">
              {loading ? (
                <p className="text-gray-500">Loading conversations...</p>
              ) : conversations.length === 0 ? (
                <p className="text-gray-500">No conversations found.</p>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="mb-4 p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleConversationClick(conversation._id)}
                  >
                    <h3 className="text-lg font-bold text-gray-700 mb-1">
                      {conversation.participantName}
                    </h3>
                    <p className="text-gray-600">
                      {conversation.lastMessage || "No messages yet"}
                    </p>
                    
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Select Contact Section */}
          <div className="p-4 w-full lg:w-1/2  mt-8 lg:mt-0 ">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Select Contact</h3>
            <button
              onClick={fetchContacts}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Select Contact
            </button>

            {/* Show contacts list below the button */}
            {showContacts && contacts.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Contacts</h4>
                <ul className="space-y-2">
                  {contacts.map((contact) => (
                     <li
                     key={contact.contactInfo.id}
                     className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                     onClick={() => openModal(contact)} // Open modal on contact click
                   >
                     {contact.name}
                   </li>
                  ))}
                </ul>
              </div>
            )}

{isModalOpen && selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal on clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h4 className="text-lg font-semibold mb-4">Selected Contact</h4>
            <p>{selectedContact.name}</p>
            <p>{selectedContact.contactInfo.email}</p>
            <p>{selectedContact.contactInfo.contactNumber}</p>

            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button
                onClick={sendMessage}
                disabled={isSending}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
