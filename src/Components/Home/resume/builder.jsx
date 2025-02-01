import React, { useState, useEffect } from "react";
import Resume from "./resume.jsx";
import AcademicDetails from "./academicModal.jsx";
import ExperienceModal from "./ExperienceModal.jsx";
import AwardsModal from "./AwardsModal.jsx";
import html2pdf from "html2pdf.js";

function ResumeBuilder() {
  const [name, setName] = useState("XYZ");
  const [profileImage, setProfileImage] = useState("/economist.png");
  const [openAcademic, setOpenAcademic] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openAwards, setOpenAwards] = useState(false);
  const [academic, setAcademic] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [awards, setAwards] = useState([]);
  const [showPreview, setShowPreview] = useState(false); // Toggle for preview modal

  const loadData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch("https://server.avyudha.com/dashboard/Tutor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch resume data");
      }

      const tutorData = await response.json();
      setName(tutorData.fullName);
      setAcademic(tutorData.education || []);
      setExperiences(tutorData.pastExperiences || []);
      setAwards(tutorData.awards || []);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderPDF = () => {
    const element = document.getElementById("resume");

    html2pdf()
      .from(element)
      .set({
        margin: [15, 10, 25, 10], // Increased bottom margin to 20
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true }, // Ensures better rendering
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"], before: ".section" }, // Moves sections to the next page properly
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        window.open(pdf.output("bloburl"));
      })
      .save();
};


  return (
    <div className="flex flex-col h-screen">
      <AcademicDetails
        academic={academic[0] || { year: "", title: "", academy: "", description: "" }}
        setAcademic={setAcademic}
        isOpen={openAcademic}
        setIsOpen={setOpenAcademic}
      />
      <ExperienceModal
        experience={experiences[0] || { title: "", company: "", duration: "", description: "" }}
        setExperience={setExperiences}
        isOpen={openExperience}
        setIsOpen={setOpenExperience}
      />
      <AwardsModal
        award={awards[0] || { title: "", description: "", year: "" }}
        setAward={setAwards}
        isOpen={openAwards}
        setIsOpen={setOpenAwards}
      />

      <div className="flex-grow p-8 overflow-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel: Forms and Buttons */}
          <div className="w-full max-w-lg space-y-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md" onClick={() => setOpenAcademic(true)}>
              Edit Academic Details
            </button>
            <button className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md" onClick={() => setOpenExperience(true)}>
              Edit Experience
            </button>
            <button className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md" onClick={() => setOpenAwards(true)}>
              Edit Awards
            </button>

            {/* Mobile Preview Toggle */}
            <div className="md:hidden flex justify-center mt-4">
              <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setShowPreview(true)}>
                Preview Resume
              </button>
            </div>

            {/* Download Button */}
            <div className="flex justify-between">
              <div className="w-5"></div>
              <button className="w-full p-2 bg-green-500 text-white rounded-md" onClick={renderPDF}>
                Download PDF
              </button>
            </div>
          </div>

          {/* Desktop Preview */}
          <div className="hidden md:block flex-grow border-l border-gray-300 pl-8">
            <Resume name={name} profileImage={profileImage} academics={academic} experiences={experiences} awards={awards} renderPDF={renderPDF} />
          </div>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-lg relative">
            <button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full" onClick={() => setShowPreview(false)}>
              ✕
            </button>
            <Resume name={name} profileImage={profileImage} academics={academic} experiences={experiences} awards={awards} renderPDF={renderPDF} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;
