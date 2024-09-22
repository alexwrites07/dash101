import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaCheck,
  FaTimes,
  FaDownload,
  FaTrash,
  FaUndo,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import SidebarEmployer from "./SidebarEmployer";
import HeaderEmployer from "./HeaderEmployer";

const AppliedCompany = () => {
  const [jobs, setJobs] = useState([]); // Store jobs with applicants here
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filterJob, setFilterJob] = useState(""); // Filter by job title
  const [statusFilter, setStatusFilter] = useState("All");

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyMzgyMDM4NH0.oqjrMP1XvsPhYn2dKpDX4AE8rxC9ZlVWlqzBP7URnHM';
  // Fetch job data including applicants
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://backend.akshayy.tech/jobs/66979a00d4e9a63603ba044f", // Replace this with your backend API
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyMzgyMDM4NH0.oqjrMP1XvsPhYn2dKpDX4AE8rxC9ZlVWlqzBP7URnHM`, // Add the token here
            },
          }
        );
        setJobs(response.data); // Set jobs with applicant data
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleFilterChange = (e) => setFilterJob(e.target.value); // Handle job title filter

  const updateApplicantStatus = async (jobId, applicantId, newStatus) => {
    try {
      const response = await axios.patch(
        `https://backend.akshayy.tech/jobs/${jobId}/applicants/${applicantId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );

      if (response.status === 200) {
        // Update the local state to reflect the change
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  applicants: job.applicants.map((applicant) =>
                    applicant._id === applicantId
                      ? { ...applicant, status: newStatus }
                      : applicant
                  ),
                }
              : job
          )
        );
      }
    } catch (error) {
      console.error(`Error updating applicant status to ${newStatus}`, error);
    }
  };

  const handleApprove = (jobId, applicantId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant._id._id === applicantId
                  ? { ...applicant, status: "Accepted" }
                  : applicant
              ),
            }
          : job
      )
    );
  };

  const handleReject = (jobId, applicantId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant._id._id === applicantId
                  ? { ...applicant, status: "Rejected" }
                  : applicant
              ),
            }
          : job
      )
    );
  };

  const handleUndo = (jobId, applicantId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant._id._id === applicantId
                  ? { ...applicant, status: "Pending" }
                  : applicant
              ),
            }
          : job
      )
    );
  };

  // const handleApprove = (jobId, applicantId) => {
  //   updateApplicantStatus(jobId, applicantId, "Accepted");
  // };

  // const handleReject = (jobId, applicantId) => {
  //   updateApplicantStatus(jobId, applicantId, "Declined");
  // };

  // const handleUndo = (jobId, applicantId) => {
  //   updateApplicantStatus(jobId, applicantId, "Pending");
  // };

  const handleRemove = (jobId, applicantId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              applicants: job.applicants.filter(
                (applicant) => applicant._id._id !== applicantId
              ),
            }
          : job
      )
    );
  };

  // Filter candidates based on search query and status
  const filteredCandidates = (applicants) =>
    applicants.filter((applicant) => {
      const matchesSearch =
        applicant._id.fullName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || applicant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  // Sort candidates
  const sortedCandidates = (applicants) => {
    return filteredCandidates(applicants).sort((a, b) => {
      if (sortOption === "name") {
        return a._id.fullName.localeCompare(b._id.fullName);
      }
      return 0;
    });
  };

  // Group applicants by job and display them under the respective job title
  const renderCandidates = (job) => {
    const total = job.applicants.length;
    const approved = job.applicants.filter(
      (applicant) => applicant.status === "Accepted"
    ).length;
    const rejected = job.applicants.filter(
      (applicant) => applicant.status === "Rejected"
    ).length;

    return (
      <div key={job._id} className="bg-white p-4 mb-6 rounded-lg shadow-md w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <div className="flex justify-between mb-4">
          <div>
            <button onClick={() => setStatusFilter("All")} className="font-bold">
              Total(s): {total}
            </button>
            <button onClick={() => setStatusFilter("Approved")} className="ml-4">
              Approved: {approved}
            </button>
            <button onClick={() => setStatusFilter("Rejected")} className="ml-4">
              Rejected: {rejected}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {sortedCandidates(job.applicants).length > 0 ? (
            sortedCandidates(job.applicants).map((applicant) => (
              <div key={applicant._id._id} className="bg-gray-100 p-4 rounded-lg flex items-start">
                <img
                  src="https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {applicant._id.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.title}{" "}
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 text-sm rounded-full ml-1">
                      {applicant.status}
                    </span>
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <div className="flex items-center mr-4">
                      <HiLocationMarker className="mr-1" /> {applicant._id.location.city}
                    </div>
                    <div className="flex items-center mr-4">
                      <FaMoneyBillAlt className="mr-1" /> {applicant._id.jobAlerts.minExpectedSalary.value} - {applicant._id.jobAlerts.maxExpectedSalary.value} {job.salary.period}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex space-x-2">
                  {applicant.status === "Pending" ? (
                    <>
                      <button className="text-blue-400 hover:text-red-800">
                        <FaPlus className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-green-800"
                        onClick={() => handleApprove(job._id, applicant._id._id)}
                      >
                        <FaCheck className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-red-800"
                        onClick={() => handleReject(job._id, applicant._id._id)}
                      >
                        <FaTimes className="w-6 h-6" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-800">
                        <FaDownload className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-gray-800"
                        onClick={() => handleRemove(job._id, applicant._id._id)}
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="text-blue-400 hover:text-red-800">
                        <FaPlus className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-orange-800"
                        onClick={() => handleUndo(job._id, applicant._id._id)}
                      >
                        <FaUndo className="w-6 h-6" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-800">
                        <FaDownload className="w-6 h-6" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-gray-800"
                        onClick={() => handleRemove(job._id, applicant._id._id)}
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

  // Filter the jobs based on the selected filter job title
  const filteredJobs = filterJob
    ? jobs.filter((job) => job.title === filterJob)
    : jobs;
  
    const handleAddMeeting = async (e) => {
      e.preventDefault();
      
      if (!meetingTitle || !meetingDate || !meetingTime || !meetingDuration) {
        setNotification('Please fill in all required fields.');
        return;
      }
    
      const meetingData = {
        repeatAfterDays,
        meetingTitle,
        participantsEmail: meetingParticipants.filter(Boolean),
        date: meetingDate.toISOString().split('T')[0],
        time: meetingTime,
        duration: parseInt(meetingDuration),
        meetingLink,
      };
    
      try {
        const url = editingMeeting !== null
          ? `https://backend.akshayy.tech/meetings/${meetings[editingMeeting]._id}`
          : 'https://backend.akshayy.tech/meetings';
    
        const method = editingMeeting !== null ? 'PUT' : 'POST';
    
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add token
          },
          body: JSON.stringify(meetingData),
        });
    
        if (response.ok) {
          const data = await response.json();
          if (editingMeeting !== null) {
            setMeetings((prevMeetings) =>
              prevMeetings.map((meeting, index) => (index === editingMeeting ? data : meeting))
            );
            setNotification('Meeting updated successfully.');
          } else {
            setMeetings([...meetings, data]);
            setNotification('Meeting added successfully.');
          }
          resetForm();
        } else {
          setNotification('Failed to add/edit meeting');
        }
      } catch (error) {
        console.error('Error:', error);
        setNotification('An error occurred while saving the meeting.');
      }
    };
    

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <SidebarEmployer />
        <div className="flex-1 bg-gray-100">
          <HeaderEmployer />
          <div className="p-4 mt-12 lg:ml-64 lg:mt-12 lg:p-28">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Job Applicants</h1>
            <div className="mb-4 flex space-x-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
              <select
                value={filterJob}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              >
                <option value="">Filter by Job Title</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job.title}>
                    {job.title}
                  </option>
                ))}
              </select>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              >
                <option value="newest">Sort by Newest</option>
                <option value="oldest">Sort by Oldest</option>
                <option value="name">Sort by Name</option>
                <option value="location">Sort by Location</option>
                <option value="salary">Sort by Salary</option>
              </select>
            </div>
            {filteredJobs.map((job) => renderCandidates(job))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedCompany;
