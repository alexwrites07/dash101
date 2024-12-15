import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link } from 'react-router-dom';

const ShortlistJobs = () => {
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [learningNeeds, setLearningNeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchShortlistedJobs = fetch(
      "https://server.avyudha.com/tutor/shortlists",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch shortlisted jobs");
        return response.json();
      })
      .then((data) => setShortlistedJobs(data))
      .catch((err) => setError(err.message));

    const fetchLearningNeeds = fetch(
      "https://server.avyudha.com/bookmarked-needs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch learning needs");
        return response.json();
      })
      .then((data) => setLearningNeeds(data))
      .catch((err) => setError(err.message));

    Promise.all([fetchShortlistedJobs, fetchLearningNeeds])
      .then(() => setLoading(false))
      .catch((err) => setError(err.message));
  }, [token]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredJobs = shortlistedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNeeds = learningNeeds.filter((need) =>
    need.requirement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 ml-96">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="mt-24 lg:mt-28 p-6 lg:p-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Shortlisted Jobs & Learning Needs
            </h1>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-3 border border-gray-300 rounded-lg w-full lg:w-1/3"
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full lg:w-1/4"
              >
                <option value="default">Sort by</option>
                <option value="title">Title</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {loading && (
              <p className="text-center text-gray-500">Loading data...</p>
            )}
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}

            {!loading && !error && (
              <>
                {/* Shortlisted Jobs Section */}
                <section className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Shortlisted Jobs
                  </h2>
                  {filteredJobs.length > 0 ? (
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                      {filteredJobs.map((job) => (
                          <Link to={`/getjobs/${job._id}`} className="block">
                        <li
                          key={job.id}
                          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <p className="text-gray-600">
                            Location: {job.location.address}
                          </p>
                          {/* <p className="text-gray-600">
                            Salary: {job.salary.value}
                          </p> */}
                          <p className="text-sm text-gray-500 mt-2">
                            {job.description}
                          </p>
                        </li>
                        </Link>
                      ))}
                     
                    </ul>
                  ) : (
                    <p className="text-gray-500">No shortlisted jobs found.</p>
                  )}
                </section>

                {/* Learning Needs Section */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Learning Needs
                  </h2>
                  {filteredNeeds.length > 0 ? (
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredNeeds.map((need) => (
                        <Link to={`/getNeed/${need._id}`} className="block w-full">
                        <li
                          key={need.id}
                          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {need.requirement}
                          </h3>
                          {/* <p className="text-gray-600">
                            Location: {need.location}
                          </p> */}
                          <p className="text-gray-600">
                            Address: {need.location.address}
                          </p>
                          {/* <p className="text-gray-600">
                            Landmark: {need.landmark}
                          </p> */}
                        </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No learning needs found.</p>
                  )}
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShortlistJobs;
