import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import Footer from '../../Footer';

const AdminFooterPanel = () => {
  const [footerData, setFooterData] = useState([
    {
      section: 'For Tutors',
      links: [
        { text: 'Browse Jobs', url: '#' },
        { text: 'Browse Tutors', url: '#' },
        { text: 'Tutors Dashboard', url: '#' },
        { text: 'Job Alerts', url: '#' },
        { text: 'My Bookmarks', url: '#' },
      ],
    },
    {
      section: 'For Institute',
      links: [
        { text: 'All Institute', url: '#' },
        { text: 'Institute Dashboard', url: '#' },
        { text: 'Submit Job', url: '#' },
        { text: 'Job Packages', url: '#' },
      ],
    },
    {
      section: 'Helpful Resources',
      links: [
        { text: 'About Us', url: '#' },
        { text: 'Contact Us', url: '#' },
        { text: 'FAQ', url: '#' },
        { text: 'Site Map', url: '#' },
        { text: 'Terms of Use', url: '#' },
        { text: 'Privacy Center', url: '#' },
      ],
    },
  ]);

  // Additional logic for managing new sections and links
  const [newSection, setNewSection] = useState('');
  const [newLinkText, setNewLinkText] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Add new section
  const addSection = () => {
    if (newSection) {
      setFooterData([
        ...footerData,
        { section: newSection, links: [] }
      ]);
      setNewSection('');
    }
  };

  // Add new link to a section
  const addLinkToSection = (index) => {
    if (newLinkText && newLinkUrl) {
      const updatedFooterData = [...footerData];
      updatedFooterData[index].links.push({ text: newLinkText, url: newLinkUrl });
      setFooterData(updatedFooterData);
      setNewLinkText('');
      setNewLinkUrl('');
    }
  };

  return (
    <div className="md:ml-24 -mt-12">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="p-4 max-w-3xl mx-auto">
          <Header />
          <h2 className="text-2xl font-bold mb-4">Admin Footer Panel</h2>

          {/* Add new section form */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add New Section"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              className="border p-2 mr-2"
            />
            <button
              onClick={addSection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Section
            </button>
          </div>

          {/* List and manage sections */}
          {footerData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">{section.section}</h3>

              {/* Add new link form */}
              <div className="flex mb-2">
                <input
                  type="text"
                  placeholder="Link Text"
                  value={newLinkText}
                  onChange={(e) => setNewLinkText(e.target.value)}
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="border p-2 mr-2"
                />
                <button
                  onClick={() => addLinkToSection(sectionIndex)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Link
                </button>
              </div>

              {/* List of links */}
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-blue-500 hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Pass footerData to the Footer component */}
          <Footer footerData={footerData} />
        </div>
      </div>
    </div>
  );
};

export default AdminFooterPanel;
