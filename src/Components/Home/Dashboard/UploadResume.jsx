import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

const UploadResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [identityData, setIdentityData] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [identityFile, setIdentityFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch existing files (Resume and ID Proof)
  const fetchFiles = async () => {
    try {
      const dashboardResponse = await axios.get(
        "https://server.avyudha.com/dashboard/Tutor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
         
        }
      );

      const tutorId = dashboardResponse.data._id;
      console.log(tutorId);


      // Fetch resume
      const resumeResponse = await axios.get(
        `https://server.avyudha.com/tutors/${tutorId}/download-resume`,
       
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      setResumeData(URL.createObjectURL(resumeResponse.data)); 
      console.log (resumeData);// Create an object URL for the blob

      // Fetch identity proof
      const identityResponse = await axios.get(
        ` https://server.avyudha.com/tutors/download/identityProof/${tutorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      setIdentityData(URL.createObjectURL(identityResponse.data)); // Create an object URL for the blob
      console.log (identityData);// Create an object URL for the blob
    } catch (error) {
      console.error("Error fetching files", error);
    }
  };

  // Upload file helper
  const handleFileUpload = async (file, uploadUrl, fieldName) => {
    const formData = new FormData();
    formData.append(fieldName, file); // Dynamic field name

    try {
      setLoading(true);
      await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchFiles(); // Refresh the data after upload
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file", error);
      alert("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Upload Resume
  const handleResumeUpload = () => {
    if (!resumeFile) {
      alert("Please select a file to upload.");
      return;
    }
    handleFileUpload(resumeFile, "https://server.avyudha.com/tutors/upload-resume", "resume");
  };

  // Upload Identity Proof
  const handleIdentityUpload = () => {
    if (!identityFile) {
      alert("Please select a file to upload.");
      return;
    }
    handleFileUpload(identityFile, "https://server.avyudha.com/tutors/upload/identityProof", "identityProof");
  };

  // Check if a file is an image
  const isImage = (fileUrl) => /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-3xl lg:ml-80">
    <Header />
    <div className="flex-1 bg-gray-100 ">
      <Sidebar />
        <h1 className="text-3xl font-semibold mt-36 mx-4 text-gray-800 mb-8">Manage Resume and ID Proof</h1>
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Resume</h2>
          <div className="space-y-4">
            {resumeData ? (
              isImage(resumeData) ? (
                <img
                  src={resumeData}
                  alt="Resume"
                  className="w-full h-auto rounded-md border border-gray-300"
                />
              ) : (
                <a
                  href={resumeData}
                  download="resume"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Download Resume
                </a>
              )
            ) : (
              <p className="text-gray-500">No resume available.</p>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              onClick={handleResumeUpload}
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Uploading..." : "Upload/Replace Resume"}
            </button>
          </div>
        </div>

        {/* Identity Proof Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Identity Proof</h2>
          <div className="space-y-4">
            {identityData ? (
              isImage(identityData) ? (
                <img
                  src={identityData}
                  alt="Identity Proof"
                  className="w-full h-auto rounded-md border border-gray-300"
                />
              ) : (
                <a
                  href={identityData}
                  download="identityProof"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Download Identity Proof
                </a>
              )
            ) : (
              <p className="text-gray-500">No identity proof available.</p>
            )}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setIdentityFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              onClick={handleIdentityUpload}
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Uploading..." : "Upload/Replace ID"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
