import React, { useState, useEffect } from 'react';
import Resume from './resume.jsx';
import AcademicDetails from './academicModal.jsx';
import ExperienceModal from './ExperienceModal.jsx';
import AwardsModal from './AwardsModal.jsx';
import html2pdf from 'html2pdf.js';

function ResumeBuilder() {
  const [name, setName] = useState('XYZ');
  const [profileImage, setProfileImage] = useState("/economist.png");
  const [open, setOpen] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openAwards, setOpenAwards] = useState(false);
  const [academic, setAcademic] = useState([
    { year: '2022', degree: 'B.Tech in Electrical Engineering', institute: 'XYZ Institute', gpa: '9' },
    { year: '2020', degree: 'CBSE', institute: 'ABC School', gpa: '499' }
  ]);
  const [experiences, setExperiences] = useState([]);
  const [awards, setAwards] = useState([]);

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
          "Authorization": `Bearer ${token}`,
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
    const element = document.getElementById('resume');
    html2pdf().from(element).set({
      html2canvas: { scale: 4, letterRendering: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    }).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'));
    }).save();
  };

  return (
    <div className="flex flex-col h-screen">
      <AcademicDetails academic={academic} setAcademic={setAcademic} isOpen={open} setIsOpen={setOpen} />
      <ExperienceModal
        experience={experiences[0] || { title: '', company: '', duration: '', description: '' }} 
        setExperience={setExperiences}
        isOpen={openExperience}
        setIsOpen={setOpenExperience}
      />
      <AwardsModal
        award={awards[0] || { title: '', description: '', year: '' }} 
        setAward={setAwards}
        isOpen={openAwards}
        setIsOpen={setOpenAwards}
      />

      <div className="flex-grow p-8 overflow-auto">
        <div className="flex gap-8">
          <div className="w-full max-w-lg space-y-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md"
              onClick={() => setOpen(true)}
            >
              Edit Academic Details
            </button><br></br>
            <button
              className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md"
              onClick={() => setOpenExperience(true)}
            >
              Edit Experience
            </button><br></br>
            <button
              className="w-64 ml-6 mb-2 p-2 bg-[#041F96] text-white rounded-md"
              onClick={() => setOpenAwards(true)}
            >
              Edit Awards
            </button><br></br>
            <div className="flex justify-between">
              <div className="w-5"></div>
              <button
                className="w-full p-2 bg-green-500 text-white rounded-md"
                onClick={renderPDF}
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="flex-grow border-l border-gray-300 pl-8">
            <Resume 
              name={name} 
              profileImage={profileImage} 
              academics={academic} 
              experiences={experiences} 
              awards={awards} 
              renderPDF={renderPDF} // Passing renderPDF function here
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
