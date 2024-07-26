import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null); // Track active chat or selected contact
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState({
    Alice: [
      { id: 1, sender: 'Alice', message: 'Hi Bob!', timestamp: '2024-07-10T10:00:00Z' },
      { id: 2, sender: 'Bob', message: 'Hey Alice!', timestamp: '2024-07-10T10:05:00Z' },
    ],
    Bob: [],
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newMessage = { id: chats[activeChat].length + 1, sender: 'You', message: messageInput, timestamp: new Date().toISOString() };
    setChats(prevChats => ({
      ...prevChats,
      [activeChat]: [...prevChats[activeChat], newMessage],
    }));
    setMessageInput('');
  };

  const openChat = (contact) => {
    setActiveChat(contact);
    // Initialize new chat if not exists
    if (!chats[contact]) {
      setChats(prevChats => ({
        ...prevChats,
        [contact]: [],
      }));
    }
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar openChat={openChat} activeChat={activeChat} />
      <div className="flex-1">
        <Header />
        <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Messages</h1>
          {activeChat ? (
            <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
              {/* Chat interface */}
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Chat with {activeChat}</h2>
              <div className="mb-4 h-64 overflow-y-auto">
                {/* Display chat messages */}
                {chats[activeChat].map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                    <p>{msg.message}</p>
                    <span>{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <form className="flex flex-col" onSubmit={handleSendMessage}>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="p-2 mb-4 border rounded-lg"
                  rows="3"
                  placeholder="Type your message here"
                ></textarea>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </form>
              <button onClick={closeChat} className="py-2 px-4 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Close Chat
              </button>
            </section>
          ) : (
            <>
              <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
                {/* List of contacts or messaging profiles */}
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Contacts</h2>
                <div className="mb-4">
                  <div className="contact" onClick={() => openChat('Alice')}>
                    Alice
                  </div>
                  <div className="contact" onClick={() => openChat('Bob')}>
                    Bob
                  </div>
                  {/* Add more contacts dynamically */}
                </div>
              </section>

              <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Compose Message</h2>
                <form className="flex flex-col" onSubmit={handleSendMessage}>
                  <label className="text-md text-gray-700 mb-2">Recipient:</label>
                  <input
                    type="text"
                    className="p-2 mb-4 border rounded-lg"
                    placeholder="Enter recipient's name or email"
                    disabled
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
