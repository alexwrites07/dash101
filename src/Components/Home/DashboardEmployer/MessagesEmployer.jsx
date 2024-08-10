import React, { useState } from 'react';
import Sidebar from './SidebarEmployer';
import Header from './HeaderEmployer';

// Sample contacts and message data
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
  const [composeVisible, setComposeVisible] = useState(false); // State for compose form visibility
  const [newContactName, setNewContactName] = useState(''); // State for new contact name

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage = {
      id: messages[activeChat].length + 1,
      sender: 'You',
      message: messageInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeChat]: [...prevMessages[activeChat], newMessage],
    }));

    setMessageInput('');
  };

  const openChat = (contact) => {
    setActiveChat(contact);
    setComposeVisible(false); // Hide compose form when a chat is opened
    if (!messages[contact]) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [contact]: [],
      }));
    }
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const deleteConversation = () => {
    if (!activeChat) return;

    // Remove the contact and their messages
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.name !== activeChat)
    );
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[activeChat];
      return newMessages;
    });

    closeChat();
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleComposeForm = () => {
    setComposeVisible(!composeVisible);
    if (composeVisible) {
      setActiveChat(null); // Clear active chat when opening compose form
    }
  };

  const handleNewContactSubmit = (e) => {
    e.preventDefault();
    if (!newContactName.trim()) return;

    // Check if the contact already exists
    const existingContact = contacts.find((contact) => contact.name === newContactName);
    if (existingContact) {
      setActiveChat(newContactName);
      toggleComposeForm();
      return;
    }

    // Add the new contact to the contacts list
    const newContact = {
      id: contacts.length + 1,
      name: newContactName,
      username: newContactName.toLowerCase().replace(/\s/g, ''),
      lastMessage: 'Just now',
    };

    setContacts([...contacts, newContact]);
    setMessages({ ...messages, [newContactName]: [] });
    setActiveChat(newContactName);
    setNewContactName('');
    toggleComposeForm();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar openChat={openChat} activeChat={activeChat} />
      <div className="flex-1">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col lg:flex-row items-center lg:items-start h-full">
          <div className="lg:w-1/4 bg-gray-100 p-4 lg:mr-8 h-full overflow-y-auto">
            <button
              onClick={toggleComposeForm}
              className="mb-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
            >
              Compose New Message
            </button>
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
                  onClick={() => openChat(contact.name)}
                  className={`cursor-pointer p-2 rounded-lg mb-2 ${
                    activeChat === contact.name ? 'bg-blue-100' : 'bg-white'
                  }`}
                >
                  <h3 className="text-md font-medium text-gray-700">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 h-full">
            {composeVisible ? (
              <section className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Compose Message</h2>
                <form className="flex flex-col" onSubmit={handleNewContactSubmit}>
                  <label className="text-md text-gray-700 mb-2">Recipient:</label>
                  <input
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="p-2 mb-4 border rounded-lg"
                    placeholder="Enter recipient's name"
                  />

                  <label className="text-md text-gray-700 mb-2">Message:</label>
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="p-2 mb-4 border rounded-lg"
                    rows="5"
                    placeholder="Enter your message here"
                  ></textarea>

                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </form>
              </section>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                  {activeChat && (
                    <button
                      onClick={deleteConversation}
                      className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete Conversation
                    </button>
                  )}
                </div>

                {activeChat ? (
                  <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Chat with {activeChat}</h2>
                    <div className="flex-1 overflow-y-auto mb-4 max-h-full">
                      {messages[activeChat].map((msg) => (
                        <div
                          key={msg.id}
                          className={`mb-2 p-2 rounded-lg ${
                            msg.sender === 'You' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'
                          }`}
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
                ) : (
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Select a contact to start chatting</h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
