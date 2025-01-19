import React, { useState } from 'react';
import Resume from './resume.jsx';
import Section from './section.jsx';
import html2pdf from 'html2pdf.js';
import { Modal,Button } from 'flowbite-react';
import AcademicDetails from './academicModal.jsx';
function FormattingHelp() {
  return (
    <div style={styles.helpSection}>
      <h2 style={styles.helpTitle}>Formatting Text</h2>
      <p style={styles.helpText}>Enhance your text with simple markdown-like formatting:</p>
      <ul style={styles.helpList}>
        <li ><span style={styles.boldText}>*Bold*</span> - Enclose text in  asterisks to make it <b>Bold</b>.</li>
        <li><span style={styles.italicText}>~Italic~</span> - Use  tildes to italicize your text.</li>
        <li><span style={styles.underlineText}>_Underline_</span> - Enclose text in underscores to <u>Underline</u> it.</li>
        <li><span style={styles.linkText}>[Link Text](http://example.com)</span> - Create a hyperlink by using square brackets for the text followed by the URL in parentheses.</li>
      
      </ul>
    </div>
  );
}
const styles = {
  helpSection: {
    backgroundColor: '#ffebee', // Light red background
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #f44336', // Red border
    color: '#d32f2f', // Dark red text
    margin: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  helpTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#b71c1c' // Darker red for the title
  },
  helpText: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  helpList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  boldText: {
    color: '#c62828', // Red text for emphasis
    fontWeight: 'bold',
  },
  italicText: {
    color: '#c62828', // Red text for emphasis
    fontStyle: 'italic',
  },
  underlineText: {
    color: '#c62828', // Red text for emphasis
    // textDecoration: 'underline',
  },
  linkText: {
    color: '#c62828', // Red text for emphasis
    textDecoration: 'underline',
  }
};




function ResumeBuilder() {
  const [name, setName] = useState('XYZ');
  const [profileImage, setProfileImage] = useState("/economist.png");
  const [open,setOpen] = useState(false); 
  const [academic, setAcademic] = useState([  { year: '2022', degree: 'B.Tech in Electrical Engineering', institute: 'XYZ Institute', gpa: '9' },
    { year: '2020', degree: 'CBSE', institute: 'ABC School', gpa: '499' }])
  const [sections, setSections] = useState([
  
    {
        "title": "INTERNSHIP",
        "subheadings": [
            {
                "subtitle": "*Company Name , Remote* (Jan 2022-Feb 2022) : ~Developer~",
                "bullets": [
                    "Created Intuitive UI using Material Design"
                ],
                "lines": []
            },
            {
                "subtitle": "*Company Name , Remote* (Jan 2022-Feb 2022)",
                "bullets": [
                    "Developed a comprehensive ERP portal"
                ],
                "lines": []
            }
        ]
    },
    {
        "title": "PROJECTS",
        "subheadings": [
            {
                "subtitle": "*ABC Project*",
                "bullets": [
                    "Implemented a real-time results feature "
                ],
                "lines": []
            }
        ]
    },
    {
        "title": "EXTRA CURRICULAR ACTIVITIES",
        "subheadings": [
            {
                "subtitle": " *Hackathon Participation*",
                "bullets": [
                    "Participated in the Smart India Hackathon organized by the Government of India"
                ],
                "lines": []
            }
        ]
    }
]);

  const addSection = () => {
    setSections([...sections, { title: '', subheadings: [{ subtitle: '', bullets: [''],lines:[] }] }]);
  };

  const handleInputChange = (index, field, value) => {
    const newSections = sections.slice();
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleSubheadingChange = (sectionIndex, subheadingIndex, field, value) => {
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings[subheadingIndex][field] = value;
    setSections(newSections);
  };

  const handleBulletChange = (sectionIndex, subheadingIndex, bulletIndex, value) => {
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings[subheadingIndex].bullets[bulletIndex] = value;
    setSections(newSections);
  };

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const addSubheading = (sectionIndex) => {
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings.push({ subtitle: '', bullets: [''],lines:[] });
    setSections(newSections);
  };

  const addBullet = (sectionIndex, subheadingIndex) => {
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings[subheadingIndex].bullets.push('');
    setSections(newSections);
  };

  const renderPDF = () => {
    const element = document.getElementById('resumePreview');
    html2pdf().from(element).set({
        html2canvas: { scale: 4, letterRendering: true },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      }).toPdf().get('pdf').then(function (pdf) {
        window.open(pdf.output('bloburl')); // For testing output quality
      }).save();

  };
  const addLine = (sectionIndex,subheadingIndex) => {
    const newSections = sections.slice();
    if (!newSections[sectionIndex].lines) {
      newSections[sectionIndex].subheadings[subheadingIndex].lines = [];
    }
    newSections[sectionIndex].subheadings[subheadingIndex].lines.push('');
    setSections(newSections);
  };
  const deleteSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };
  
  const deleteSubheading = (sectionIndex, subheadingIndex) => {
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings = newSections[sectionIndex].subheadings.filter((_, i) => i !== subheadingIndex);
    setSections(newSections);
  };
  
  const deleteBullet = (sectionIndex, subheadingIndex, bulletIndex) => {
    console.log(sections)
    const newSections = sections.slice();
    newSections[sectionIndex].subheadings[subheadingIndex].bullets = newSections[sectionIndex].subheadings[subheadingIndex].bullets.filter((_, i) => i !== bulletIndex);
    setSections(newSections);
  };


  return (
    <div className="flex flex-col h-screen">
 <AcademicDetails
        academic={academic}
        setAcademic={setAcademic}
        isOpen={open}
        setIsOpen={setOpen}
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
            <input
              type="file"
              className="p-2 border border-gray-300 rounded-md"
              onChange={handleImageChange}
            /><br/>
            <button
          className="w-90 mb-2 p-2 bg-[#041F96] text-white rounded-md"
          onClick={() =>setOpen(true)}
        >
          edit academic details
        </button>
            <div>
              {sections.map((section, index) => (
                <Section
                key={index}
                addLine={addLine}
                index={index}
                section={section}
                handleInputChange={handleInputChange}
                handleSubheadingChange={handleSubheadingChange}
                handleBulletChange={handleBulletChange}
                addSubheading={addSubheading}
                addBullet={addBullet}
                deleteSection={deleteSection}
                deleteSubheading={deleteSubheading}
                deleteBullet={deleteBullet}
              />
              ))}
            </div>
            <div className="flex justify-between">

            <button
              className="w-full p-2 bg-[#041F96] text-white rounded-md"
              onClick={addSection}
            >
              Add Section
            </button>
            <div className="w-5"></div>
            <button
              className="w-full p-2 bg-green-500 text-white rounded-md"
              onClick={renderPDF}
            >
              Download PDF
            </button>
            </div>
          <FormattingHelp/>
          </div>
          <div className="flex-grow border-l border-gray-300 pl-8">
            <Resume name={name} profileImage={profileImage} sections={sections} academic={academic}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;


