import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const UploadResume = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Upload Resume</h1>
          <p className="text-lg mb-12 text-gray-700">This is where you upload your resume.</p>

          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Upload Your Resume</h2>
            <div className="flex  mb-4">
              <label htmlFor="resume-upload" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Choose File
              </label>
              <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
            <p className="text-sm text-gray-600">Accepted file formats: PDF, DOC, DOCX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
