import React, { useState, useEffect } from "react";
import Sidebar from "./SidebarEmployer";
import Header from "./HeaderEmployer";

const AlertsJobs = () => {
  const [candidateAlerts, setCandidateAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [error, setError] = useState(null);
  
  // Fetch candidate alerts from the backend when the component mounts
  useEffect(() => {
    const fetchCandidateAlerts = async () => {
      try {
        const response = await fetch('https://backend.akshayy.tech/getFilters', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNDUwODMzNH0.Sgq8sctSRhXY3IX4JwDg5Y0JOyE7xa3YNjJtATRhwOA' // Replace with the actual token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidate alerts');
        }

        const data = await response.json();
        
        // Transform the data to match the existing candidateAlerts structure
        const transformedAlerts = data.map((item, index) => ({
          id: index + 1, // Generating a unique ID for each alert
          alertId: item.id, // Storing the alert ID for deletion
          title: item.filter.title.join(', '),
          alertQuery: [
            `City: ${item.filter.location.city}`,
            `Date Posted: ${new Date(item.filter.datePosted.$gte).toLocaleDateString()}`,
            `Category: ${item.filter.category.join(', ')}`,
            `Gender: ${item.filter.gender}`,
            `Experience: ${item.filter.experienceTime.join(', ')}`,
            `Qualification: ${item.filter.qualification.join(', ')}`,
          ],
          numberCandidates: item.tutorCount,
          frequency: "Daily", // This field can be set dynamically or kept static as needed
        }));

        setCandidateAlerts(transformedAlerts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCandidateAlerts();
  }, []);

  // Remove alert handler (updated)
  const handleRemoveAlert = async (alertId) => {
    console.log("Deleting alert with ID:", alertId); // Log the alertId for debugging

    try {
      const response = await fetch('https://backend.akshayy.tech/deleteFilter', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNDUwODMzNH0.Sgq8sctSRhXY3IX4JwDg5Y0JOyE7xa3YNjJtATRhwOA' // Use the actual token
        },
        body: JSON.stringify({
          alertId: alertId  // Sending the alertId to the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete the alert');
      }

      const result = await response.json();

      // Update the UI after successful deletion
      setCandidateAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.alertId !== alertId)
      );
      console.log(result.message); // Log success message

    } catch (error) {
      setError(error.message);  // Show the error message in the UI
      console.error("Error deleting the alert:", error);  // Log the error for debugging
    }
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sort handler
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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
    return 0;
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
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleRemoveAlert(alert.alertId)}
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
