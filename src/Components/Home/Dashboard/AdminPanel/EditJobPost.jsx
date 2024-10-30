import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './AdminSidebar';
import axios from 'axios';

const JobsView = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [declinedJobs, setDeclinedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [editData, setEditData] = useState({ name: '', location: '', datePosted: '' });
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [newJobData, setNewJobData] = useState({
    name: '',
    location: {
      city: '',
      state: '',
      pinCode: '',
    },
    coordinates: [0, 0], // Initialize coordinates
    salary: {
      min: '',
      max: '',
      period: '',
    },
    workDetails: {
      commitment: '',
      mode: '',
    },
    experience: '',
    gender: '',
    qualification: '',
    careerLevel: '',
    description: '',
    keyResponsibilities: [],
    skillAndExperience: [],
    images: [],
    maxApplicants: '',
    datePosted: '',
    tags: [{ name: '', active: false }],
    employerId: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/admin/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedJobs = response.data.map((job) => ({
          id: job._id,
          name: job.title,
          company: job.location.city,
          datePosted: job.lastDateToApply,
          isClosed: new Date(job.lastDateToApply) < new Date(),
          postedBy: job.employername || 'Unknown Employer',
        }));
        setAllJobs(fetchedJobs);
        setAcceptedJobs(fetchedJobs.filter((job) => !job.isClosed));
        setDeclinedJobs(fetchedJobs.filter((job) => job.isClosed));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const toggleJobStatus = async (jobId) => {
    try {
      const response = await axios.patch(
        `https://backend.akshayy.tech/jobs/${jobId}/toggle-close`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedJob = response.data;
      const updatedJobs = allJobs.map((job) =>
        job.id === updatedJob._id ? { ...job, isClosed: updatedJob.isClosed } : job
      );
      setAllJobs(updatedJobs);
      setDeclinedJobs(updatedJobs.filter(job => job.isClosed));
      setAcceptedJobs(updatedJobs.filter(job => !job.isClosed));
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/jobs/edit/${jobId}`);
  };
  
  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `https://backend.akshayy.tech/jobs/${jobToEdit.id}`,
        { title: editData.name, location: { city: editData.location }, lastDateToApply: editData.datePosted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      setJobToEdit(null);
      const updatedJobs = allJobs.map((job) =>
        job.id === response.data._id ? { ...job, ...response.data } : job
      );
      setAllJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post(
        'https://backend.akshayy.tech/create-job-admin',
        {
          title: newJobData.name,
          location: {
            type: 'Point',
            coordinates: newJobData.coordinates,
            city: newJobData.location.city,
            state: newJobData.location.state,
            pinCode: newJobData.location.pinCode,
          },
          salary: {
            min: newJobData.salary.min,
            max: newJobData.salary.max,
            period: newJobData.salary.period,
          },
          workDetails: {
            commitment: newJobData.workDetails.commitment,
            mode: newJobData.workDetails.mode,
          },
          experience: newJobData.experience,
          gender: newJobData.gender,
          qualification: newJobData.qualification,
          careerLevel: newJobData.careerLevel,
          description: newJobData.description,
          keyResponsibilities: newJobData.keyResponsibilities,
          skillAndExperience: newJobData.skillAndExperience,
          images: newJobData.images,
          maxApplicants: newJobData.maxApplicants,
          lastDateToApply: newJobData.datePosted,
          tags: newJobData.tags.filter(tag => tag.active),
          employerId: newJobData.employerId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form data
      setNewJobData({
        name: '',
        location: { city: '', state: '', pinCode: '' },
        coordinates: [0, 0], // Reset coordinates to initial state
        salary: { min: '', max: '', period: '' },
        workDetails: { commitment: '', mode: '' },
        experience: '',
        gender: '',
        qualification: '',
        careerLevel: '',
        description: '',
        keyResponsibilities: [],
        skillAndExperience: [],
        images: [],
        maxApplicants: '',
        datePosted: '',
        tags: [{ name: '', active: false }],
        employerId: '',
      });

      setAllJobs([...allJobs, { id: response.data._id, ...response.data }]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };
  

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`https://backend.akshayy.tech/deleteJob/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllJobs(allJobs.filter(job => job.id !== jobId));
      setAcceptedJobs(acceptedJobs.filter(job => job.id !== jobId));
      setDeclinedJobs(declinedJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const filteredAcceptedJobs = acceptedJobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDeclinedJobs = declinedJobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedJobs = filteredAcceptedJobs.sort((a, b) =>
    sortOrder === 'asc' ? new Date(a.datePosted) - new Date(b.datePosted) : new Date(b.datePosted) - new Date(a.datePosted)
  );

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <HiSortAscending className="w-6 h-6" />
            <span>Sort by Date</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job name..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setIsCreating(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Create Job
          </button>
        </div>

        {isCreating && (
        <div className="bg-white p-4 rounded-md shadow-md w-3/5">
          <h3 className="text-lg font-semibold">Create New Job</h3>
          
          <input
            type="text"
            placeholder="Job Name"
            value={newJobData.name}
            onChange={(e) => setNewJobData({ ...newJobData, name: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <input
            type="text"
            placeholder="City"
            value={newJobData.location.city}
            onChange={(e) => setNewJobData({ ...newJobData, location: { ...newJobData.location, city: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <input
            type="text"
            placeholder="State"
            value={newJobData.location.state}
            onChange={(e) => setNewJobData({ ...newJobData, location: { ...newJobData.location, state: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <input
            type="text"
            placeholder="Pin Code"
            value={newJobData.location.pinCode}
            onChange={(e) => setNewJobData({ ...newJobData, location: { ...newJobData.location, pinCode: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Coordinates</h4>
          <input
            type="text"
            placeholder="Latitude"
            value={newJobData.coordinates[0] || ''}
            onChange={(e) => setNewJobData({ ...newJobData, coordinates: [e.target.value, newJobData.coordinates[1] || 0] })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={newJobData.coordinates[1] || ''}
            onChange={(e) => setNewJobData({ ...newJobData, coordinates: [newJobData.coordinates[0] || 0, e.target.value] })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Salary</h4>
          <input
            type="text"
            placeholder="Minimum Salary"
            value={newJobData.salary.min}
            onChange={(e) => setNewJobData({ ...newJobData, salary: { ...newJobData.salary, min: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />
          <input
            type="text"
            placeholder="Maximum Salary"
            value={newJobData.salary.max}
            onChange={(e) => setNewJobData({ ...newJobData, salary: { ...newJobData.salary, max: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />
          <input
            type="text"
            placeholder="Salary Period (e.g., monthly, yearly)"
            value={newJobData.salary.period}
            onChange={(e) => setNewJobData({ ...newJobData, salary: { ...newJobData.salary, period: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Work Details</h4>
          <input
            type="text"
            placeholder="Commitment (e.g., full-time, part-time)"
            value={newJobData.workDetails.commitment}
            onChange={(e) => setNewJobData({ ...newJobData, workDetails: { ...newJobData.workDetails, commitment: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />
          <input
            type="text"
            placeholder="Mode of Work (e.g., in-person, remote)"
            value={newJobData.workDetails.mode}
            onChange={(e) => setNewJobData({ ...newJobData, workDetails: { ...newJobData.workDetails, mode: e.target.value } })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Experience Required</h4>
          <input
            type="text"
            placeholder="Experience"
            value={newJobData.experience}
            onChange={(e) => setNewJobData({ ...newJobData, experience: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Gender Preference</h4>
          <input
            type="text"
            placeholder="Gender Preference"
            value={newJobData.gender}
            onChange={(e) => setNewJobData({ ...newJobData, gender: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Qualification Required</h4>
          <input
            type="text"
            placeholder="Qualification"
            value={newJobData.qualification}
            onChange={(e) => setNewJobData({ ...newJobData, qualification: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Career Level</h4>
          <input
            type="text"
            placeholder="Career Level"
            value={newJobData.careerLevel}
            onChange={(e) => setNewJobData({ ...newJobData, careerLevel: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Job Description</h4>
          <textarea
            placeholder="Description"
            value={newJobData.description}
            onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Key Responsibilities</h4>
          <textarea
            placeholder="Key Responsibilities"
            value={newJobData.keyResponsibilities}
            onChange={(e) => setNewJobData({ ...newJobData, keyResponsibilities: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Skills and Experience Required</h4>
          <textarea
            placeholder="Skills and Experience"
            value={newJobData.skillAndExperience}
            onChange={(e) => setNewJobData({ ...newJobData, skillAndExperience: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Images</h4>
          <input
            type="text"
            placeholder="Image URLs (comma separated)"
            value={newJobData.images}
            onChange={(e) => setNewJobData({ ...newJobData, images: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Maximum Applicants</h4>
          <input
            type="text"
            placeholder="Max Applicants"
            value={newJobData.maxApplicants}
            onChange={(e) => setNewJobData({ ...newJobData, maxApplicants: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Last Date to Apply</h4>
          <input
            type="date"
            value={newJobData.datePosted}
            onChange={(e) => setNewJobData({ ...newJobData, datePosted: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <h4 className="text-md font-semibold mt-4">Tags</h4>
          {newJobData.tags.map((tag, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                placeholder="Tag Name"
                value={tag.name}
                onChange={(e) => {
                  const newTags = [...newJobData.tags];
                  newTags[index].name = e.target.value;
                  setNewJobData({ ...newJobData, tags: newTags });
                }}
                className="block w-full border border-gray-300 rounded-md p-2 mr-2"
              />
              <input
                type="checkbox"
                checked={tag.active}
                onChange={() => {
                  const newTags = [...newJobData.tags];
                  newTags[index].active = !newTags[index].active;
                  setNewJobData({ ...newJobData, tags: newTags });
                }}              />

</div>
          ))}
          <h4 className="text-md font-semibold mt-4">Employer ID</h4>
          <input
            type="text"
            placeholder="Employer ID"
            value={newJobData.employerId}
            onChange={(e) => setNewJobData({ ...newJobData, employerId: e.target.value })}
            className="block w-full border border-gray-300 rounded-md mb-2 p-2"
          />

          <div className="mt-4">
            <button
              onClick={handleCreateSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Job
            </button>
          </div>
        </div>
      )}



        <div className="flex flex-col space-y-6 w-3/5">
          {/* Accepted Jobs Section */}
          <div className="space-y-4">
            {/* <h2 className="text-2xl font-semibold">Accepted Jobs (Open)</h2> */}
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <div>
                      <h3 className="text-lg font-medium">{job.name}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-600">{job.datePosted}</p>
                    </div>
                    <div className="flex space-x-4">
                      {/* <button onClick={() => toggleJobStatus(job.id)} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                        Close
                      </button> */}
                      <button onClick={() => handleEdit(job.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No accepted jobs available.</p>
            )}
          </div>

          {/* Declined Jobs Section */}
          <div className="space-y-4">
            {/* <h2 className="text-2xl font-semibold">Declined Jobs (Closed)</h2> */}
            {declinedJobs.length > 0 ? (
              declinedJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <div>
                      <h3 className="text-lg font-medium">{job.name}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-600">{job.datePosted}</p>
                    </div>
                    <div className="flex space-x-4">
                      {/* <button onClick={() => toggleJobStatus(job.id)} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                        Reopen
                      </button> */}
                        <button onClick={() => handleEdit(job.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No declined jobs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsView;
