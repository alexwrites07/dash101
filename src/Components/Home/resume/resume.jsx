import React from 'react';

const Resume = ({ name, profileImage, academics, experiences, awards, renderPDF }) => {
  const formatText = (text) => {
    return text; // Format text if needed (bold, italic, etc.)
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg" id="resume">
      {/* Name Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-800">{name.toUpperCase()}</h1>
        <div className="w-24 h-2 bg-blue-800 mx-auto mt-4"></div>
      </div>

      {/* Academic Details */}
      
<section className="mb-8">
        <div className="flex items-center space-x-4">
        <div className="bg-blue-800 text-white font-semibold text-2xs p-4 inline-block">
  <strong>ACADEMIC DETAILS</strong>
</div>

          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="font-bold text-blue-800">Year</div>
            <div className="font-bold text-blue-800">Title</div>
            <div className="font-bold text-blue-800">Academy</div>
            <div className="font-bold text-blue-800">Description</div>
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
          <div className="bg-blue-800 text-white font-semibold text-2xs p-4 inline-block">
            <strong>EXPERIENCE</strong>
          </div>
          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          {experiences?.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-semibold">
                {formatText(experience.title)}
              </div>
              <div className="ml-8 mt-2">
                <div>{formatText(experience.company)}</div>
                <div>{formatText(experience.duration)}</div>
                <div>{formatText(experience.description)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-800 text-white font-semibold text-2xs p-4 inline-block">
           <strong> AWARDS</strong>
          </div>
          <div className="flex-grow border-b-2 border-blue-800"></div>
        </div>
        <div className="mt-4">
          {awards?.map((award, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-semibold">
                {formatText(award.title)}
              </div>
              <div className="ml-8 mt-2">
                <div>{formatText(award.organization)}</div>
                <div>{formatText(award.year)}</div>
                <div>{formatText(award.description)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Button */}
      <div className="mt-8 text-center">
        <button 
          className="p-2 bg-green-500 text-white rounded-md"
          onClick={renderPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default Resume;


