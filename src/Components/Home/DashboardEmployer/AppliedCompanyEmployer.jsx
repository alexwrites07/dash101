import React, { useState, useEffect } from "react";

const AppliedCompany = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://server.avyudha.com/tutor/applications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch applied jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Applied Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {job.location.city}, {job.location.state}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Salary:</strong> {job.salary.min} - {job.salary.max} {job.salary.period}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Qualification:</strong> {job.qualification}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Last Date to Apply:</strong> {new Date(job.lastDateToApply).toLocaleDateString()}
              </p>
              <img
                src={job.images[0]}
                alt="Job"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full ${
                      tag.active
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    job.isClosed
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {job.isClosed ? "Closed" : "Open"}
                </span>
                <span className="text-gray-500 text-sm">{job.workDetails.mode}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedCompany;
