import React, { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaDownload, FaTrash, FaUndo, FaMoneyBillAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi"; 
import SidebarEmployer from "./SidebarEmployer";
import HeaderEmployer from "./HeaderEmployer";

const AppliedCompany = () => {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([
    {
      id: 1,
      name: "vikashpanjiyar2612",
      title: "Chemistry Tutor for IIT JEE",
      location: "Patna",
      salary: "₹100,000 / month",
      status: "Pending",
      appliedDate: "2024-08-01",
    },
    {
      id: 2,
      name: "abcde",
      title: "Chemistry Tutor for IIT JEE",
      location: "Patna",
      salary: "₹100,000 / month",
      status: "Approved",
      appliedDate: "2024-08-02",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filterJob, setFilterJob] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleFilterChange = (e) => setFilterJob(e.target.value);

  const handleApprove = (id) => {
    setShortlistedCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: "Approved" } : candidate
      )
    );
  };

  const handleReject = (id) => {
    setShortlistedCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: "Rejected" } : candidate
      )
    );
  };

  const handleUndo = (id) => {
    setShortlistedCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: "Pending" } : candidate
      )
    );
  };

  const handleRemove = (id) => {
    setShortlistedCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.id !== id)
    );
  };

  const filteredCandidates = shortlistedCandidates.filter(
    (candidate) => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            candidate.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJob = filterJob === "" || candidate.title === filterJob;
      const matchesStatus = statusFilter === "All" || candidate.status === statusFilter;

      return matchesSearch && matchesJob && matchesStatus;
    }
  );

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
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    }
    if (sortOption === "oldest") {
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    }
    return 0;
  });

  const renderCandidates = (jobTitle) => {
    const candidates = sortedCandidates.filter(
      (candidate) => candidate.title === jobTitle
    );

    return (
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">{jobTitle}</h2>
        <div className="flex justify-between mb-4">
          <div>
            <button onClick={() => setStatusFilter("All")} className="font-bold">
              Total(s): {candidates.length}
            </button>
            <button onClick={() => setStatusFilter("Approved")} className="ml-4">
              Approved: {candidates.filter(c => c.status === "Approved").length}
            </button>
            <button onClick={() => setStatusFilter("Rejected")} className="ml-4">
              Rejected: {candidates.filter(c => c.status === "Rejected").length}
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-lg w-full lg:w-1/3"
            />
            <select
              value={filterJob}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg ml-4"
            >
              <option value="">Filter by Job</option>
              <option value="Chemistry Tutor for IIT JEE">Chemistry Tutor for IIT JEE</option>
              <option value="Physics Tutor for IIT JEE">Physics Tutor for IIT JEE</option>
            </select>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-lg ml-4"
            >
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
              <option value="salary">Sort by Salary</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="bg-gray-100 p-4 rounded-lg flex items-start">
                <img
                  src="https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.title} <span className="bg-blue-200 text-blue-800 px-2 py-1 text-sm rounded-full ml-1">{candidate.status}</span></p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <div className="flex items-center mr-4">
                      <HiLocationMarker className="mr-1" /> {candidate.location}
                    </div>
                    <div className="flex items-center mr-4">
                      <FaMoneyBillAlt className="mr-1" /> {candidate.salary}
                    </div>
                    <div className="flex items-center">
                      Applied Date: {candidate.appliedDate}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex space-x-2">
                  {candidate.status === "Pending" ? (
                    <>
                      <button
                        className="text-blue-400 hover:text-red-800"
                      >
                        <FaPlus className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-green-800"
                        onClick={() => handleApprove(candidate.id)}
                      >
                        <FaCheck className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-red-800"
                        onClick={() => handleReject(candidate.id)}
                      >
                        <FaTimes className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-blue-800"
                        onClick={() => console.log("Download", candidate.id)}
                      >
                        <FaDownload className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-gray-800"
                        onClick={() => handleRemove(candidate.id)}
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-400 hover:text-red-800"
                      >
                        <FaPlus className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-orange-800"
                        onClick={() => handleUndo(candidate.id)}
                      >
                        <FaUndo className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-blue-800"
                        onClick={() => console.log("Download", candidate.id)}
                      >
                        <FaDownload className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-gray-800"
                        onClick={() => handleRemove(candidate.id)}
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No candidates found.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row">
      <SidebarEmployer />
      <div className="flex-1 bg-gray-100">
        <HeaderEmployer />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Applied Candidates</h1>
          {["Chemistry Tutor for IIT JEE", "Physics Tutor for IIT JEE"].map(
            (jobTitle) => (
              <div
                className="w-full"
                key={jobTitle}
              >
                {renderCandidates(jobTitle)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  </>
  
  );
};

export default AppliedCompany;
