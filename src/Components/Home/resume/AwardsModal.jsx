import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';

function AwardsModal({ award, setAward, isOpen, setIsOpen }) {
  const [currentAwards, setCurrentAwards] = useState([]);

  // Fetch awards data from the server
  const loadData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('https://server.avyudha.com/dashboard/Tutor', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch awards data');
      }

      const awardsData = await response.json();
      setCurrentAwards(awardsData.awards || []); // Set the fetched awards data to state
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  // Load awards data when the modal opens
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Handle input change for each award in the array
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAwards = [...currentAwards];
    updatedAwards[index][name] = value;
    setCurrentAwards(updatedAwards);
  };

  // Add a new award to the array
  const handleAddRow = () => {
    setCurrentAwards([
      ...currentAwards,
      { title: '', description: '', year: '' },
    ]);
  };

  // Delete an award from the array
  const handleDeleteRow = (index) => {
    const updatedAwards = [...currentAwards];
    updatedAwards.splice(index, 1);
    setCurrentAwards(updatedAwards);
  };

  // Save the updated awards
  const handleSave = () => {
    setAward(currentAwards); // Update parent component's state
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>Edit Awards</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {currentAwards.map((award, index) => (
            <div key={index} className="grid grid-cols-4 gap-3 items-center">
              <input
                type="text"
                name="title"
                value={award.title}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Award Title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="year"
                value={award.year}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Year"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="description"
                value={award.description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Description"
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
            Add Award
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

export default AwardsModal;
