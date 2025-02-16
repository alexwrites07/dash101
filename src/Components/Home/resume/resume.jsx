import React from "react";
import watermarkImage from "../../../assets/ad.png.jpeg";

const Resume = ({ name, address, academics, experiences, awards, renderPDF, watermark }) => {
  const formatText = (text) => text; // Format text if needed

  return (
    <div className="relative p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg" id="resume">
      {/* Watermark Image */}
    
      <div
      id="resume"
      className="p-6 bg-white relative"
      style={{
        position: "relative",
        height: "10vh",
        backgroundImage: `url(${watermark})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity:0.15 // Adjust transparency of watermark
      }}
    >
      
      </div>
      {/* Profile Image */}
     

      {/* Name Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{name.toUpperCase()}</h1>
        <h3 className="text-2xs  text-gray-800">{address}</h3><br></br>
        <div className="w-24 h-2 bg-blue-800 mx-auto mt-0"></div>
      </div>

      {/* Academic Details */}
      <section className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-800 text-white font-semibold text-2xs px-2 pb-3 inline-block rounded-md">
            <strong>ACADEMIC DETAILS</strong>
          </div>
          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4 font-bold text-blue-800">
            <div>Year</div>
            <div>Title</div>
            <div>Academy</div>
            <div>Description</div>
          </div>
          {academics?.map((academic, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mt-2">
              <div>{new Date(academic.year).getFullYear()}</div>
              <div>{academic.title}</div>
              <div>{academic.academy}</div>
              <div>{academic.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="inline-block bg-blue-800 text-white font-semibold text-2xs px-3 pb-3 rounded-md">
            <strong>WORK EXPERIENCE</strong>
          </div>
          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          {experiences?.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 text-blue-800 px-4 pb-3 rounded-md font-semibold">
                {formatText(experience.title)} at {formatText(experience.company)}
                {experience.year ? ` (${new Date(experience.year).getFullYear()})` : ""}
              </div>
              <div className="ml-4 mt-2">
                <p>{formatText(experience.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-800 text-white font-semibold text-2xs px-2 pb-3 inline-block rounded-md">
            <strong>AWARDS & ACHIEVEMENTS</strong>
          </div>
          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          {awards?.map((award, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 text-blue-800 px-4 pb-3 rounded-md font-semibold">
                {formatText(award.title)} ({new Date(award.year).getFullYear()})
              </div>
              <div className="ml-4">
                <p>{formatText(award.organization)}</p>
                <p>{formatText(award.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
   
  );
};

export default Resume;
