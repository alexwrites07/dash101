import React from 'react';
import { Modal, Button } from 'flowbite-react';
import {MdDelete} from 'react-icons/md';
function AcademicDetails({ academic, setAcademic, isOpen, setIsOpen }) {
  const [editableAcademic, setEditableAcademic] = React.useState(academic);

  const handleChange = (index, field, value) => {
    const updatedAcademic = [...editableAcademic];
    updatedAcademic[index][field] = value;
    setEditableAcademic(updatedAcademic);
  };

  const handleAddRow = () => {
    setEditableAcademic([...editableAcademic, { year: '', degree: '', institute: '', gpa: '' }]);
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
          {editableAcademic.map((item, index) => (
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
                value={item.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="Degree / Board"
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.institute}
                onChange={(e) => handleChange(index, 'institute', e.target.value)}
                placeholder="Institute"
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={item.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                placeholder="GPA / Marks(%)"
              />
              {/* <button
                onClick={() => handleDeleteRow(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button> */}
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
