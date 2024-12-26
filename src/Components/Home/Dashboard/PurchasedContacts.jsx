import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PurchasedContacts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedContacts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
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
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedContacts();
  }, []);

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
      <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 bg-gray-100 lg:space-x-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Purchased Contacts</h2>
          {data?.purchasedContacts?.length > 0 ? (
            data.purchasedContacts.map((contact, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-500">Contact Type: {contact.contactType}</p>
                <div className="mt-2">
                  <p className="text-gray-700">Email: {contact.contactInfo.email || "N/A"}</p>
                  <p className="text-gray-700">Contact Number: {contact.contactInfo.contactNumber || "N/A"}</p>
                  {contact.contactInfo.socialMediaLinks?.platform &&
                    contact.contactInfo.socialMediaLinks?.link && (
                      <p className="text-gray-700">
                        Social Media ({contact.contactInfo.socialMediaLinks.platform}):{" "}
                        <a
                          href={`https://${contact.contactInfo.socialMediaLinks.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {contact.contactInfo.socialMediaLinks.link}
                        </a>
                      </p>
                    )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No purchased contacts found.</p>
          )}

          
{data?.purchasedJobs?.length > 0 ? (
  <>
    <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">Purchased Jobs</h2>
    {data.purchasedJobs.map((job, index) => (
      <div key={index} className="border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
        <p className="text-sm text-gray-500">Employer: {job.employer}</p>
        <div className="mt-2">
          <p className="text-gray-700">Email: {job.contactInfo?.email || "N/A"}</p>
          <p className="text-gray-700">Contact Number: {job.contactInfo?.contactNumber || "N/A"}</p>
        </div>
      </div>
    ))}
  </>
) : (
  <p className="text-gray-600">No purchased jobs found.</p>
)}

        </div>
      </div>
    </div>
  );
};

export default PurchasedContacts;
