import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categoriesList from './categories.json'
import Map from '../../MapDemo';
const EditTutor = () => {
    const {id}=useParams();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        dob: '',
        username: '',
        contactCost: '',
        rating: '',
        teachingLevels:'',
        video:'',
        highestQualification:'',
        gender:'',
        identityVerified:false,
        emailVerified:false,
        contactNumberVerified:false,
        location: {
            type: '',
            coordinates: ["set location", "set location"],
            address: '',
            city: '',
            state: '',
            pinCode: '',
        },
        jobAlerts: {
            alertDistance: '',
            privateTutor: { distance: '' },
            organizationEducator: { distance: '' },
            minExpectedSalary: { value: '' , period: ''},
            maxExpectedSalary: { value: '', period: '' },
        },
        pastExperiences: [],
        classCost:'',
        awards: [],
        tags: [],
        categories: [],
        education:[],
        profileViews: [],
    });
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [inputText, setInputText] = useState('');
    const [inputText1, setInputText1] = useState(''); // Separate state for input text
    const allTags = ['At my place', 'At tutors place', 'Urgent', 'Full time', 'Part Time', 'Online'];
    const [suggestions, setSuggestions] = useState([]);
    const [suggestions1, setSuggestions1] = useState([]);
    const [formData1, setFormData1] = useState({ categories: [] });
    const handleCategoryInputChange = (e) => {
        const input = e.target.value;
        setInputText1(input); // Update the input text for categories
        
        // Filter categories based on input text
        const filteredSuggestions = categoriesList.filter((category) =>
            category.toLowerCase().includes(input.toLowerCase()) && !formData.categories.includes(category)
        );
        setSuggestions1(filteredSuggestions);
    };

    const handleCategorySelect = (category) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            categories: [...prevFormData.categories, category],
        }));
        setInputText1(''); // Clear input text after selecting a category
        setSuggestions1([]); // Clear suggestions after selecting a category
    };

    const handleCategoryRemove = (categoryToRemove) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            categories: prevFormData.categories.filter(category => category !== categoryToRemove),
        }));
    };
  
    const handleTagInputChange = (e) => {
      const input = e.target.value;
      setInputText(input); // Update input text
      // Filter tags based on input
      const filteredSuggestions = allTags.filter(tag => 
        tag.toLowerCase().includes(input.toLowerCase()) && !formData.tags.includes(tag)
      );
      setSuggestions(filteredSuggestions);
    };
  
    const handleTagSelect = (tag) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        tags: [...prevFormData.tags, tag],
      }));
      setInputText(''); // Clear input text after selecting a tag
      setSuggestions([]); // Clear suggestions after selecting a tag
    };
    const handleTagRemove = (tagToRemove) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          tags: prevFormData.tags.filter(tag => tag !== tagToRemove),
        }));
      };
      console.log(coordinates);
    useEffect(() => {
        const fetchTutorData = async () => {
            const token = localStorage.getItem('token');
            const url = `https://server.avyudha.com/getTutor/${id}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tutor data');
                }

                const data = await response.json();
                setFormData(data); 
                const fetchedCoordinates = data.location.coordinates;
                if (fetchedCoordinates && fetchedCoordinates.length === 2) {
                    setCoordinates([parseFloat(fetchedCoordinates[0]), parseFloat(fetchedCoordinates[1])]);
                }
            } catch (error) {
                console.error('Error fetching tutor data:', error);
            }
        };

        fetchTutorData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith('location.')) {
            const fieldName = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [fieldName]: value,
                },
            }));
        } else if (name.startsWith('jobAlerts.')) {
            const [_, mainField, subField] = name.split('.'); // Splits `jobAlerts.minExpectedSalary.period` into `jobAlerts`, `minExpectedSalary`, `period`
            
            setFormData((prevData) => ({
                ...prevData,
                jobAlerts: {
                    ...prevData.jobAlerts,
                    [mainField]: {
                        ...prevData.jobAlerts[mainField],
                        [subField]: value, // Dynamically sets the nested field
                    },
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'tags' || name === 'categories'|| name==='teachingLevelss' ? value.split(',').map(tag => tag.trim()) : value,
                [name]: name === 'identityVerified' || name === 'emailVerified' || name === 'contactNumberVerified' 
                ? value === 'true' // Convert to boolean
                : name === 'tags' || name === 'categories' || name === 'teachingLevels' 
                ? value.split(',').map(tag => tag.trim()) // Handle multiple values for tags, categories, etc.
                : value,

            }));
        }
    };
    
    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, location: { ...formData.location, [name]: value } });
    };
    const handleMapChange = (updatedCoordinates) => {
        setCoordinates(updatedCoordinates);  
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: updatedCoordinates,
          },
        }));
      };
    const handleCoordinatesChange = (index, value) => {
        const newCoordinates = [...formData.location.coordinates];
        newCoordinates[index] = value;
        setFormData({ ...formData, location: { ...formData.location, coordinates: newCoordinates } });
        setCoordinates(updatedCoordinates); 
    };
// Education State Management
const [education, setEducation] = useState([]);

const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
        const updatedEducation = [...prevState.education];
        updatedEducation[index][name] = value;
        return { ...prevState, education: updatedEducation };
    });
};

const addEducation = () => {
    const updatedEducation = [
        ...formData.education,
        { title: '', year: '', academy: '', description: '' },
    ];
    setFormData({ ...formData, education: updatedEducation });
};

// Remove an education entry by index
const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
};

// Past Experiences State Management
const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
        const updatedExperiences = [...prevState.pastExperiences];
        updatedExperiences[index][name] = value;
        return { ...prevState, pastExperiences: updatedExperiences };
    });
};

const addExperience = () => {
    const updatedExperiences = [
        ...formData.pastExperiences,
        { title: '', start_date: '', end_date: '', company: '', description: '' },
    ];
    setFormData({ ...formData, pastExperiences: updatedExperiences });
};

const removeExperience = (index) => {
    const updatedExperiences = formData.pastExperiences.filter((_, i) => i !== index);
    setFormData({ ...formData, pastExperiences: updatedExperiences });
};

// Qualifications State Management
const handleQualificationChange = (index, e) => {
    const { value } = e.target;
    setFormData((prevState) => {
        const updatedQualifications = [...prevState.qualifications];
        updatedQualifications[index] = value;
        return { ...prevState, qualifications: updatedQualifications };
    });
};

const addQualification = () => {
    const updatedQualifications = [...formData.qualifications, ''];
    setFormData({ ...formData, qualifications: updatedQualifications });
};

const removeQualification = (index) => {
    const updatedQualifications = formData.qualifications.filter((_, i) => i !== index);
    setFormData({ ...formData, qualifications: updatedQualifications });
};

// Awards State Management
const handleAwardChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
        const updatedAwards = [...prevState.awards];
        updatedAwards[index][name] = value;
        return { ...prevState, awards: updatedAwards };
    });
};

const addAward = () => {
    const updatedAwards = [
        ...formData.awards,
        { title: '', year: '', description: '' },
    ];
    setFormData({ ...formData, awards: updatedAwards });
};

const removeAward = (index) => {
    const updatedAwards = formData.awards.filter((_, i) => i !== index);
    setFormData({ ...formData, awards: updatedAwards });
};


    const handleCheckboxChange = (name) => {
        setFormData((prevData) => ({
            ...prevData,
            jobAlerts: {
                ...prevData.jobAlerts,
                [name]: {
                    ...prevData.jobAlerts[name],
                    flag: !prevData.jobAlerts[name].flag,
                },
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = `https://server.avyudha.com/editUserProfile/${id}/Tutor`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send updated data
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            console.log('Profile updated successfully:', result);
            alert("Profile Changed");
            // Handle success (e.g., redirect or show a success message)
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-3xl mx-auto">
            {/* Input fields for basic tutor information */}
            <div className="mb-4">
                <label htmlFor="fullName" className="block">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="contactNumber" className="block">Contact Number:</label>
                <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

          

            <div className="mb-4">
                <label htmlFor="username" className="block">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="contactCost" className="block">Contact Cost:</label>
                <input
                    type="text"
                    id="contactCost"
                    name="contactCost"
                    value={formData.contactCost}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fullName" className="block">Introductory Video</label>
                <input
                    type="text"
                    id="video"
                    name="video"
                    value={formData.video}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div><div className="mb-4">
                <label htmlFor="fullName" className="block">Highest Qualification</label>
                <input
                    type="text"
                    id="highestQualification"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
          

            <div className="mb-4">
                <label htmlFor="rating" className="block">Rating:</label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            {/* Location Fields */}
            <h2 className="text-lg font-bold">Location</h2>
            <div className="mb-4">
                <label htmlFor="location.type" className="block">Location Type:</label>
                <input
                    type="text"
                    id="location.type"
                    name="location.type"
                    value={formData.location.type}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location.coordinates" className="block">Coordinates:</label>
                <input
                    type="text"
                    
                    value={formData.location.coordinates[0]}
                    onChange={(e) => {
                        const newCoordinates = [...formData.location.coordinates];
                        newCoordinates[0] = e.target.value;
                        setFormData((prevData) => ({
                            ...prevData,
                            location: {
                                ...prevData.location,
                                coordinates: newCoordinates
                            }
                        }));
                    }}
                    className="border p-2 w-1/2 inline-block mr-2"
                />
                <input
                    type="text"
                   
                    value={formData.location.coordinates[1]}
                    onChange={(e) => {
                        const newCoordinates = [...formData.location.coordinates];
                        newCoordinates[1] = e.target.value;
                        setFormData((prevData) => ({
                            ...prevData,
                            location: {
                                ...prevData.location,
                                coordinates: newCoordinates
                            }
                        }));
                    }}
                    className="border p-2 w-1/2 inline-block"
                />
                 <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="location.address" className="block">Address:</label>
                <input
                    type="text"
                    id="location.address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location.city" className="block">City:</label>
                <input
                    type="text"
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location.state" className="block">State:</label>
                <input
                    type="text"
                    id="location.state"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location.pinCode" className="block">Pin Code:</label>
                <input
                    type="text"
                    id="location.pinCode"
                    name="location.pinCode"
                    value={formData.location.pinCode}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            {/* Job Alerts */}


            
        
            <div className="mb-2">
  <label className="block font-medium text-gray-700">Gender Preference</label>
  <select
    name="gender"  
    value={formData.gender}  
    onChange={handleChange}  
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Gender Preference</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="No Preference">No Preference</option>
  </select>
</div>
<div className="mb-2">
  <label className="block font-medium text-gray-700">Class Cost</label>
  <input
    name="classCost"  
    value={formData.classCost}  
    onChange={handleChange}  
    className="border p-2 rounded-md w-full"
  />
   
</div>
<div className="mb-2">
  <label className="block font-medium text-gray-700">Verify  tutor Identity</label>
  <div className="flex items-center space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="identityVerified"
        value="true"
        checked={formData.identityVerified === true}  // Check if the value is true
        onChange={handleChange}
        className="mr-2"
      />
      Yes
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="identityVerified"
        value="false"
        checked={formData.identityVerified === false}  // Check if the value is false
        onChange={handleChange}
        className="mr-2"
      />
      No
    </label>
  </div>
</div>
<div className="mb-2">
  <label className="block font-medium text-gray-700">Verify  tutor Email</label>
  <div className="flex items-center space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="emailVerified"
        value="true"
        checked={formData.emailVerified === true}  // Check if the value is true
        onChange={handleChange}
        className="mr-2"
      />
      Yes
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="emailVerified"
        value="false"
        checked={formData.emailVerified === false}  // Check if the value is false
        onChange={handleChange}
        className="mr-2"
      />
      No
    </label>
  </div>
</div>
<div className="mb-2">
  <label className="block font-medium text-gray-700">Verify  tutor Contact Number</label>
  <div className="flex items-center space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="contactNumberVerified"
        value="true"
        checked={formData.contactNumberVerified === true}  // Check if the value is true
        onChange={handleChange}
        className="mr-2"
      />
      Yes
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="contactNumberVerified"
        value="false"
        checked={formData.contactNumberVerified === false}  // Check if the value is false
        onChange={handleChange}
        className="mr-2"
      />
      No
    </label>
  </div>
</div>


            <div className="mb-4">
    <h3 className="text-lg font-medium">Min Expected Salary:</h3>
    <input
        type="number"
        id="jobAlerts.minExpectedSalary.value"
        name="jobAlerts.minExpectedSalary.value"
        value={formData.jobAlerts.minExpectedSalary.value}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Enter min salary"
    />
    <select
        name="jobAlerts.minExpectedSalary.period"
        value={formData.jobAlerts.minExpectedSalary.period}
        onChange={handleChange}
        className="border p-2 w-full mt-2"
    >
        <option value="monthly">Monthly</option>
        <option value="hourly">Hourly</option>
    </select>
</div>

{/* Max Salary */}
<div className="mb-4">
    <h3 className="text-lg font-medium">Max Expected Salary:</h3>
    <input
        type="number"
        id="jobAlerts.maxExpectedSalary.value"
        name="jobAlerts.maxExpectedSalary.value"
        value={formData.jobAlerts.maxExpectedSalary.value}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Enter max salary"
    />
    <select
        name="jobAlerts.maxExpectedSalary.period"
        value={formData.jobAlerts.maxExpectedSalary.period}
        onChange={handleChange}
        className="border p-2 w-full mt-2"
    >
        <option value="monthly">Monthly</option>
        <option value="hourly">Hourly</option>
    </select>
</div>
<div className="mb-4">
                <label htmlFor="fullName" className="block">Teaching Level</label>
                <input
                    type="text"
                    id="teachingLevels"
                    name="teachingLevels"
                    value={formData.teachingLevels}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            {/* Past Experiences */}
            <h2 className="text-lg font-bold">Past Experiences</h2>
            {formData.pastExperiences.map((exp, index) => (
                <div key={index} className="mb-4 border p-4">
                    <div className="mb-2">
                        <label htmlFor={`experience-title-${index}`} className="block">Job Title:</label>
                        <input
                            type="text"
                            id={`experience-title-${index}`}
                            name="title"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`experience-startDate-${index}`} className="block">Start Date:</label>
                        <input
                            type="date"
                            id={`experience-startDate-${index}`}
                            name="start_date"
                            value={exp.start_date?.split('T')[0]}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`experience-endDate-${index}`} className="block">End Date:</label>
                        <input
                            type="date"
                            id={`experience-endDate-${index}`}
                            name="end_date"
                            value={exp.end_date?.split('T')[0]}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`experience-company-${index}`} className="block">Company:</label>
                        <input
                            type="text"
                            id={`experience-company-${index}`}
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`experience-description-${index}`} className="block">Description:</label>
                        <textarea
                            id={`experience-description-${index}`}
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="bg-red-500 text-white p-2 mt-2"
                    >
                        Remove Experience
                    </button>
                </div>
            ))}
            <button type="button" onClick={addExperience} className="mb-4 bg-blue-500 text-white p-2">
                Add Experience
            </button>

            {/* Dynamic inputs for awards */}
            <h2 className="text-lg font-bold">Awards</h2>
            {formData.awards.map((award, index) => (
                <div key={index} className="mb-4 border p-4">
                    <div className="mb-2">
                        <label htmlFor={`award-title-${index}`} className="block">Award Title:</label>
                        <input
                            type="text"
                            id={`award-title-${index}`}
                            name="title"
                            value={award.title}
                            onChange={(e) => handleAwardChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`award-year-${index}`} className="block">Year:</label>
                        <input
                            type="date"
                            id={`award-year-${index}`}
                            name="year"
                            value={award.year?.split('T')[0]}
                            onChange={(e) => handleAwardChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`award-description-${index}`} className="block">Description:</label>
                        <textarea
                            id={`award-description-${index}`}
                            name="description"
                            value={award.description}
                            onChange={(e) => handleAwardChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeAward(index)}
                        className="bg-red-500 text-white p-2 mt-2"
                    >
                        Remove Award
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAward} className="mb-4 bg-blue-500 text-white p-2">
                Add Award
            </button>


            <div className="p-4">
      <h2 className="text-lg font-bold">Qualifications</h2>

      {/* Map through qualifications and render input fields */}
      {(formData.qualifications && Array.isArray(formData.qualifications) && formData.qualifications.length > 0) ? (
        formData.qualifications.map((award, index) => (
          <div key={index} className="mb-4 border p-4">
            <div className="mb-2">
              <input
                type="text"
                id={`award-title-${index}`}
                name="title"
                value={award}
                onChange={(e) => handleQualificationChange(index, e)}
                className="border p-2 w-full"
                placeholder="Enter qualification"
              />
            </div>

            {/* Remove qualification button */}
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="text-red-500"
            >
              Remove Qualification
            </button>
          </div>
        ))
      ) : (
        <p>No qualifications added yet.</p>
      )}

      {/* Add qualification button */}
      <button
        type="button"
        onClick={addQualification}
        className="mb-4 bg-blue-500 text-white p-2"
      >
        Add Qualification
      </button>
    </div>


              {/* Dynamic inputs for awards */}
              <h2 className="text-lg font-bold">Education</h2>
            {formData.education.map((award, index) => (
                <div key={index} className="mb-4 border p-4">
                    <div className="mb-2">
                        <label htmlFor={`award-title-${index}`} className="block">Title:</label>
                        <input
                            type="text"
                            id={`award-title-${index}`}
                            name="title"
                            value={award.title}
                            onChange={(e) => handleEducationChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`award-year-${index}`} className="block">Year:</label>
                        <input
                            type="date"
                            id={`award-year-${index}`}
                            name="year"
                            value={award.year?.split('T')[0]}
                            onChange={(e) => handleEducationChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`award-academy-${index}`} className="block">academy:</label>
                        <textarea
                            id={`award-academy-${index}`}
                            name="academy"
                            value={award.academy}
                            onChange={(e) => handleEducationChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor={`award-description-${index}`} className="block">Description:</label>
                        <textarea
                            id={`award-description-${index}`}
                            name="description"
                            value={award.description}
                            onChange={(e) => handleEducationChange(index, e)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="bg-red-500 text-white p-2 mt-2"
                    >
                        Remove Education
                    </button>
                </div>
            ))}
            <button type="button" onClick={addEducation} className="mb-4 bg-blue-500 text-white p-2">
                Add Education
            </button>

            <label htmlFor="tags" className="block">Tags:</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={inputText} // Bind input value to inputText state
        onChange={handleTagInputChange}
        className="border p-2 w-full"
        placeholder="Type to search and add tags"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((tag, index) => (
            <div
              key={index}
              onClick={() => handleTagSelect(tag)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {/* Selected Tags Display */}
      <div className="flex flex-wrap mt-2">
        {formData.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="mb-4">
                <label htmlFor="dob" className="block">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob?.split('T')[0]}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
            <label htmlFor="categories" className="block">Categories:</label>
                <input
                    type="text"
                    id="categories"
                    name="categories"
                    value={inputText1}
                    onChange={handleCategoryInputChange}
                    className="border p-2 w-full"
                    placeholder="Type to search and add categories"
                />
                {/* Suggestions Dropdown for Categories */}
                {suggestions1.length > 0 && (
                    <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-lg max-h-40 overflow-y-auto">
                        {suggestions1.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleCategorySelect(category)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
                {/* Selected Categories Display */}
                <div className="flex flex-wrap mt-2">
                    {formData.categories.map((category, index) => (
                        <span
                            key={index}
                            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
                        >
                            {category}
                            <button
                                type="button"
                                onClick={() => handleCategoryRemove(category)}
                                className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2">Save Changes</button>
        </form>
    );
};

export default EditTutor;