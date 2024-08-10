import React, { useState } from "react";
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";

const AlertsJobs = () => {
  // Mocked Candidate Alerts Data
  const [candidateAlerts, setCandidateAlerts] = useState([
    {
      id: 1,
      title: "Software Engineer",
      alertQuery: [
        "Posted Date: All",
        "Qualification: Bachelor Degree",
        "Qualification: Master’s Degree",
      ],
      numberCandidates: 10,
      frequency: "Daily",
    },
    {
      id: 2,
      title: "Data Scientist",
      alertQuery: [
        "Posted Date: All",
        "Qualification: Doctorate Degree",
        "Qualification: Bachelor Degree",
      ],
      numberCandidates: 8,
      frequency: "Weekly",
    },
    {
      id: 3,
      title: "Product Manager",
      alertQuery: [
        "Posted Date: Last 30 days",
        "Qualification: Master’s Degree",
      ],
      numberCandidates: 5,
      frequency: "Monthly",
    },
    {
      id: 4,
      title: "UX Designer",
      alertQuery: [
        "Posted Date: Last 7 days",
        "Qualification: Bachelor Degree",
      ],
      numberCandidates: 15,
      frequency: "Daily",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [error, setError] = useState(null);

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sort handler
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Remove alert handler
  const handleRemoveAlert = (alertId) => {
    setCandidateAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  // Filter alerts based on search query
  const filteredAlerts = candidateAlerts.filter((alert) =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort alerts based on selected option
  const sortedAlerts = filteredAlerts.sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "numberCandidates") {
      return b.numberCandidates - a.numberCandidates;
    }
    return filteredAlerts;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Candidate Alerts
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
                <option value="title">Title</option>
                <option value="numberCandidates">Number of Candidates</option>
              </select>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Active Candidate Alerts
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : sortedAlerts.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Alert Query</th>
                    <th className="py-2 px-4 border-b">Number Candidates</th>
                    <th className="py-2 px-4 border-b">Frequency</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="py-2 px-4 border-b">{alert.title}</td>
                      <td className="py-2 px-4 border-b">
                        {alert.alertQuery.map((query, index) => (
                          <div key={index}>{query}</div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {alert.numberCandidates}
                      </td>
                      <td className="py-2 px-4 border-b">{alert.frequency}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleRemoveAlert(alert.id)}
                          className="py-1 px-3 bg-blue-600 text-white rounded-lg hover:bg-red-700"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Candidate Alerts</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlertsJobs;
