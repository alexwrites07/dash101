import React, { useState, useEffect } from 'react';
import Sidebar from './SidebarEmployer';
import Header from './HeaderEmployer';
import axios from 'axios';

// Uncommented initialContacts and initialMessages
const initialContacts = [
  {
    id: 1,
    name: 'vikashpanjiyar2000',
    username: 'qwe',
    lastMessage: '3 weeks',
  },
  {
    id: 2,
    name: 'Alice',
    username: 'alice123',
    lastMessage: '2 days',
  },
  {
    id: 3,
    name: 'Bob',
    username: 'bob456',
    lastMessage: '1 day',
  },
];

const initialMessages = {
  vikashpanjiyar2000: [
    { id: 1, sender: 'vikashpanjiyar2000', message: 'hello sir', timestamp: '2024-07-02T08:47:00Z' },
    { id: 2, sender: 'You', message: 'hi', timestamp: '2024-07-02T08:49:00Z' },
    { id: 3, sender: 'You', message: 'how are you', timestamp: '2024-07-02T08:49:00Z' },
    { id: 4, sender: 'vikashpanjiyar2000', message: 'i am fine', timestamp: '2024-07-09T10:14:00Z' },
    { id: 5, sender: 'You', message: 'can you teach me', timestamp: '2024-07-09T10:16:00Z' },
    { id: 6, sender: 'vikashpanjiyar2000', message: 'i can teach you at very low cost', timestamp: '2024-07-12T09:04:00Z' },
    { id: 7, sender: 'You', message: 'timestamp check', timestamp: '2024-07-12T09:04:00Z' },
  ],
  Alice: [
    { id: 1, sender: 'Alice', message: 'Hi Bob!', timestamp: '2024-07-10T10:00:00Z' },
    { id: 2, sender: 'You', message: 'Hey Alice!', timestamp: '2024-07-10T10:05:00Z' },
  ],
  Bob: [],
};

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [composeVisible, setComposeVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8'; // Replace with your actual token logic

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/conversations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const conversations = response.data;

        const formattedContacts = conversations.map((conversation) => {
          const contact = conversation.participants.find(p => p.participantId !== 'your_user_id');
          return {
            id: conversation._id,
            name: contact.name,
            lastMessage: conversation.lastMessage ? conversation.lastMessage : 'No messages yet',
            roomId: conversation.roomId,
          };
        });

        setContacts(formattedContacts);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

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
      [activeChat]: [...prevMessages[activeChat], newMessage],
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

  const openChat = (contact) => {
    setActiveChat(contact);
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
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
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
                        key={index}
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
