import React, { useState, useEffect } from 'react';
import Sidebar from './SidebarEmployer';
import Header from './HeaderEmployer';
import axios from 'axios';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contacts, setContacts] = useState([]); // Initialize contacts as an empty array
  const [messages, setMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [composeVisible, setComposeVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8'; // Replace with your actual token logic

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/purchasedContacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Contacts API Response:", response.data); // Log the entire response data
  
        const formattedContacts = response.data.purchasedContacts.map((contact) => ({
          id: contact._id || contact.conversationId, // Make sure you use the correct field for ID
          name: contact.name,
          username: contact.username,
          lastMessage: 'No messages yet',
        }));
  
        setContacts(formattedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
  
    fetchContacts();
  }, []);
  
  
  // Fetch messages for a selected chat
  const openChat = async (contact) => {
    console.log("Selected Contact:", contact); // Log the contact object to verify if `id` is present
  
    if (!contact.id) {
      console.error("Contact ID is missing.");
      return; // Exit if the id is not available
    }
  
    setActiveChat(contact);
    
    try {
      const response = await axios.get(`https://backend.akshayy.tech/conversations/${contact.id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const fetchedMessages = response.data.map((msg) => ({
        id: msg._id,
        sender: msg.sender === 'your_user_id' ? 'You' : msg.sender, // Adjust this logic according to sender ID
        message: msg.message,
        timestamp: msg.timestamp,
      }));
  
      setMessages((prevMessages) => ({
        ...prevMessages,
        [contact.name]: fetchedMessages,
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage = {
      sender: 'You',
      message: messageInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeChat.name]: [...(prevMessages[activeChat.name] || []), newMessage],
    }));

    try {
      // Send the message to the backend
      const response = await axios.post('https://backend.akshayy.tech/send-message', {
        recipientId: activeChat.id, // Assuming `id` is the participant ID
        message: messageInput,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.message); // Output: Message sent
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessageInput('');
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const deleteConversation = () => {
    if (!activeChat) return;

    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.name !== activeChat.name)
    );
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[activeChat.name];
      return newMessages;
    });

    closeChat();
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar openChat={openChat} activeChat={activeChat} />
      <div className="flex-1">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col lg:flex-row items-center lg:items-start h-full">
          <div className="lg:w-1/4 bg-gray-100 p-4 lg:mr-8 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Search Contacts...</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 mb-4 border rounded-lg w-full"
              placeholder="Search contacts"
            />

            <h2 className="text-xl font-semibold mb-2 text-gray-900">All Contacts</h2>
            <div className="overflow-y-auto max-h-96">
            {filteredContacts.map((contact, index) => (
              <div
                key={contact.id || index} // Use index as a fallback if id is not unique
                onClick={() => openChat(contact)}
                className={`cursor-pointer p-2 rounded-lg mb-2 ${activeChat === contact ? 'bg-blue-100' : 'bg-white'}`}
              >
                <h3 className="text-md font-medium text-gray-700">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
            ))}
            </div>
          </div>

          <div className="flex-1 p-4 h-full">
            {activeChat ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                  <button
                    onClick={deleteConversation}
                    className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Conversation
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Chat with {activeChat.name}</h2>
                  <div className="flex-1 overflow-y-auto mb-4 max-h-full">
                  {messages[activeChat.name]?.map((msg, index) => (
                    <div
                      key={msg.id || index} // Ensure msg.id is unique, or use index as a fallback
                      className={`mb-2 p-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'}`}
                    >
                      <p className="text-md">{msg.message}</p>
                      <span className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  </div>
                  <form className="flex flex-col" onSubmit={handleSendMessage}>
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="p-2 mb-4 border rounded-lg resize-none"
                      rows="3"
                      placeholder="Type your message here"
                    ></textarea>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Select a contact to start chatting</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
