import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PurchasedContacts = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPurchasedContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }

        const response = await fetch("https://server.avyudha.com/purchasedContacts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedContacts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (data) {
      const filtered = {
        purchasedContacts: data.purchasedContacts?.filter((contact) =>
          (contact.contactInfo?.email || "").toLowerCase().includes(query.toLowerCase()) ||
        (contact.contactInfo?.name || "").toLowerCase().includes(query.toLowerCase()) ||
          (contact.contactInfo?.contactNumber || "").includes(query)
        ),
        purchasedJobs: data.purchasedJobs?.filter((job) =>
          (job.contactInfo?.email || "").toLowerCase().includes(query.toLowerCase()) ||
        (job.contactInfo?.name || "").toLowerCase().includes(query.toLowerCase()) ||
          (job.contactInfo?.contactNumber || "").includes(query)
        ),
      };
      setFilteredData(filtered);
    }
  };

  const downloadResume = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server.avyudha.com/tutors/${id}/download-resume`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert(err.message || "Failed to download resume");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-blue-600 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 bg-gray-100 lg:space-x-8 mt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Purchased Contacts</h2>
          <input
            type="text"
            placeholder="Search by email or name or phone number"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
          />
          {filteredData?.purchasedContacts?.length > 0 ? (
            filteredData.purchasedContacts.map((contact, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link
                    to={
                      contact.contactType === "Organization"
                        ? `/getOrg/${contact.contactInfo?.id}`
                        : contact.contactType === "LearningNeeds"
                        ? `/getNeed/${contact.contactInfo?.id}`
                        : contact.contactType === "Tutor"
                        ? `/getTutor/${contact.contactInfo?.id}`
                        : `/getjobs/${contact.contactInfo?.id}`
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {contact.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">Contact Type: {contact.contactType}</p>
                <div className="mt-2">
                  <p className="text-gray-700">Email: {contact.contactInfo?.email || "N/A"}</p>
                  <p className="text-gray-700">Name: {contact.contactInfo?.name || "N/A"}</p>
                  <p className="text-gray-700">
                    Contact Number: {contact.contactInfo?.contactNumber || "N/A"}
                  </p>
                  {contact.contactType === "Tutor" && (
                    <button
                      onClick={() => downloadResume(contact.contactInfo?.id)}
                      className="mt-2 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Download Resume
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No purchased contacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedContacts;
