import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';

function ExperienceModal({ experience, setExperience, isOpen, setIsOpen }) {
  const [currentExperience, setCurrentExperience] = useState([]);

  // Fetching experience data from API
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
        throw new Error("Failed to fetch experience data");
      }

      const tutorData = await response.json();
      console.log(tutorData);  // Log the response to check its structure

      // Make sure experience is an array
      setCurrentExperience(Array.isArray(tutorData.pastExperiences) ? tutorData.pastExperiences : []);
    } catch (error) {
      console.error("Error fetching experience data:", error);
    }
  };

  useEffect(() => {
    loadData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to run only once on mount

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...currentExperience];
    updatedExperience[index][name] = value;
    setCurrentExperience(updatedExperience);
  };

  const handleAddRow = () => {
    setCurrentExperience([
      ...currentExperience,
      { title: '', company: '', start_date: '', end_date: '' },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedExperience = [...currentExperience];
    updatedExperience.splice(index, 1);
    setCurrentExperience(updatedExperience);
  };

  const handleSave = () => {
    setExperience(currentExperience); // Update parent component's state
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>Edit Experience</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {currentExperience.map((exp, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 items-center">
              <input
                type="text"
                name="title"
                value={exp.title}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Company"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="start_date"
                value={exp.start_date}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Start Date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="end_date"
                value={exp.end_date}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="End Date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MdDelete
                onClick={() => handleDeleteRow(index)}
                className="text-red-500 cursor-pointer text-3xl"
              />
            </div>
          ))}
          <button
            onClick={handleAddRow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExperienceModal;
