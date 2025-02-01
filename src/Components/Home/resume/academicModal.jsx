import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';

function AcademicDetails({ academic, setAcademic, isOpen, setIsOpen }) {
  const [editableAcademic, setEditableAcademic] = useState([]);
  // Fetching academic data from API
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
      setEditableAcademic(tutorData.education || []);
      // Set fetched academic data to state
      const formattedEducation = tutorData.education.map(item => ({
        ...item,
        year: new Date(item.year).toLocaleDateString()  // Format the year
      }));
      setAcademic(formattedEducation || []);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);  // Fetch data when the component mounts

  const handleChange = (index, field, value) => {
    const updatedAcademic = [...editableAcademic];
    updatedAcademic[index][field] = value;
    setEditableAcademic(updatedAcademic);
  };

  const handleAddRow = () => {
    setEditableAcademic([...editableAcademic, { year: '', title: '', academy: '', description: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedAcademic = [...editableAcademic];
    updatedAcademic.splice(index, 1);
    setEditableAcademic(updatedAcademic);
  };

  const handleSubmit = () => {
    setAcademic(editableAcademic);
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)} size="md">
      <Modal.Header>
        Edit Academic Details
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {editableAcademic?.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 items-center">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.year}
                onChange={(e) => handleChange(index, 'year', e.target.value)}
                placeholder="Year"
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Degree / Board"
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.academy}
                onChange={(e) => handleChange(index, 'academy', e.target.value)}
                placeholder="Institute"
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder="Description"
              />
              <MdDelete onClick={() => handleDeleteRow(index)} className="text-red-500 cursor-pointer text-3xl" />
            </div>
          ))}
          <button onClick={handleAddRow} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Row
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button color="gray" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AcademicDetails;
