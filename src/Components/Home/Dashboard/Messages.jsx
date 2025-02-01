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
  const [showContacts, setShowContacts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch conversations
  const fetchConversations = () => {
    axios
      .get("https://server.avyudha.com/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setConversations(
          response.data.filter((conversation) => !conversation.isGroup)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchConversations();
  }, [token]);

  // Fetch contacts on button click
  const fetchContacts = () => {
    setShowContacts(!showContacts); // Toggle visibility

    if (!showContacts) {
      axios
        .get("https://server.avyudha.com/purchasedContacts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setContacts(response.data.purchasedContacts);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
    localStorage.setItem("selectedContactName", contact.name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    setMessage("");
    setError("");
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
        recipientId: selectedContact.contactInfo.id,
        message: message.trim(),
      };

      const response = await axios.post(
        "https://server.avyudha.com/send-message",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Message sent successfully");
        setMessage("");
        closeModal();
        fetchConversations(); // Refresh conversations after sending a message
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
        <div className="md:mt-12 mt-32 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col lg:flex-row items-center lg:items-start h-full ">
          
          {/* Conversations Section */}
          <div className="flex-1 p-4 h-full w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Conversations</h2>
            <div className="bg-white p-4 rounded-lg  h-full flex flex-col ">
              {loading ? (
                <p className="text-gray-500">Loading conversations...</p>
              ) : conversations.length === 0 ? (
                <p className="text-gray-500">No conversations found.</p>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="flex justify-between items-center p-4  rounded-lg border border-gray-200 shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-300 cursor-pointer mb-2"
                    onClick={() => handleConversationClick(conversation._id)}
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">{conversation.participantName}</h3>
                      <p className="text-gray-600 text-sm">
                        {conversation.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    {conversation.unreadMessagesCount > 0 && (
                      <div className="flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-green-500 rounded-full">
                        {conversation.unreadMessagesCount}
                      </div>
                    )}
                  </div>
                  
                ))
              )}
            </div><br></br><br></br><br></br>
          </div>
          

          {/* Select Contact Section */}
          <div className="p-4 w-full lg:w-1/2 mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Select Contact</h3>
            <button
              onClick={fetchContacts}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 transition-transform transform hover:scale-105"
            >
              {showContacts ? "Hide Contacts" : "Select Contact"}
            </button>

            {showContacts && contacts.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-2">Contacts</h4>
                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li
                      key={contact.contactInfo.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => openModal(contact)}
                    >
                      {contact.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
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
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 transition"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>

            <button onClick={closeModal} className="mt-4 text-red-500 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
