import React, { useState } from "react";
import { FaEye, FaEnvelope, FaTrash, FaMoneyBillAlt } from "react-icons/fa"; // Importing icons for actions
import { HiLocationMarker, HiCash, HiTrash } from "react-icons/hi"; // Importing location and cash icons
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";

const ShortlistJobs = () => {
  // Mocked shortlisted candidates data
  const [shortlistedCandidates, setShortlistedCandidates] = useState([
    {
      id: 1,
      name: "vikashpanjiyar2612",
      title: "Home Tutor, Online Tutor, School Tutor",
      location: "Patna",
      salary: "₹100,000 / month",
      date: "2023-08-05",
    },
    {
      id: 2,
      name: "Dominikus Yuri",
      title: "Customer",
      location: "New York",
      salary: "₹750 / month",
      date: "2023-08-03",
    },
    {
      id: 3,
      name: "John Doe",
      title: "Software Engineer",
      location: "San Francisco",
      salary: "₹150,000 / month",
      date: "2023-08-04",
    },
    {
      id: 4,
      name: "Jane Smith",
      title: "Graphic Designer",
      location: "Los Angeles",
      salary: "₹80,000 / month",
      date: "2023-08-02",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sort handler
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // View profile handler
  const handleViewProfile = (id) => {
    console.log(`Viewing profile for candidate with ID: ${id}`);
    // Implement actual view profile logic here
  };

  // Send message handler
  const handleSendMessage = (id) => {
    console.log(`Sending message to candidate with ID: ${id}`);
    // Implement actual send message logic here
  };

  // Remove candidate handler
  const handleRemoveCandidate = (id) => {
    const updatedCandidates = shortlistedCandidates.filter(
      (candidate) => candidate.id !== id
    );
    setShortlistedCandidates(updatedCandidates);
  };

  // Filter candidates based on search query
  const filteredCandidates = shortlistedCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort candidates based on selected option
  const sortedCandidates = filteredCandidates.sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "location") {
      return a.location.localeCompare(b.location);
    }
    if (sortOption === "salary") {
      return (
        parseInt(a.salary.replace(/[^0-9]/g, "")) -
        parseInt(b.salary.replace(/[^0-9]/g, ""))
      );
    }
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    return filteredCandidates;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Candidate Shortlist
          </h1>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded-lg w-full lg:w-1/3"
              />
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-lg ml-4"
              >
                <option value="default">Sort by</option>
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="salary">Salary</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="space-y-4">
              {sortedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-gray-100 p-4 rounded-lg flex items-start"
                >
                  {/* Profile Picture */}
                  <img
                    src="https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png"
                    alt="Profile"
                    className="w-12 h-12 rounded-full mr-4"
                  />

                  <div className="flex-1">
                    {/* Candidate Name and Title */}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">{candidate.title}</p>

                    {/* Location and Salary */}
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <div className="flex items-center mr-4">
                        <HiLocationMarker className="mr-1" />{" "}
                        {candidate.location}
                      </div>
                      <div className="flex items-center">
                        <FaMoneyBillAlt className="mr-1" /> {candidate.salary}
                      </div>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="ml-auto flex space-x-2">
                    <button
                      onClick={() => handleViewProfile(candidate.id)}
                      className="text-blue-400 hover:text-blue-800"
                    >
                      <FaEye className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleSendMessage(candidate.id)}
                      className="text-blue-400 hover:text-green-800"
                    >
                      <FaEnvelope className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className="text-blue-400 hover:text-red-800"
                    >
                      <FaTrash className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShortlistJobs;
