import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        location: {
            type: '',
            coordinates: ['', ''],
            address: '',
            city: '',
            state: '',
            pinCode: '',
        },
        jobAlerts: {
            alertDistance: '',
            privateTutor: { distance: '' },
            organizationEducator: { distance: '' },
            minExpectedSalary: { value: '' },
            maxExpectedSalary: { value: '' },
        },
        pastExperiences: [],
        awards: [],
        tags: [],
        categories: [],
        profileViews: [],
    });

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
                setFormData(data); // Assuming the API returns the data in the expected format
            } catch (error) {
                console.error('Error fetching tutor data:', error);
            }
        };

        fetchTutorData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested fields
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
            const fieldName = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                jobAlerts: {
                    ...prevData.jobAlerts,
                    [fieldName]: {
                        ...prevData.jobAlerts[fieldName],
                        value: value,
                    },
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'tags' || name === 'categories' ? value.split(',').map(tag => tag.trim()) : value
            }));
        }
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
                <label htmlFor="dob" className="block">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
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
                <label htmlFor="location.coordinates" className="block">Coordinates (lat, long):</label>
                <input
                    type="text"
                    placeholder="Latitude"
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
                    placeholder="Longitude"
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
            <h2 className="text-lg font-bold">Job Alerts</h2>
         

            <div className="mb-4">
                <label className="block">Private Tutor Alert:</label>
                {/* <input
                    type="checkbox"
                    checked={formData.jobAlerts.privateTutor.flag}
                    onChange={() => handleCheckboxChange('privateTutor')}
                /> */}
                {/* <input
                    type="text"
                    placeholder="Distance"
                    value={formData.jobAlerts.privateTutor.distance}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            jobAlerts: {
                                ...prevData.jobAlerts,
                                privateTutor: {
                                    ...prevData.jobAlerts.privateTutor,
                                    distance: e.target.value,
                                },
                            },
                        }));
                    }}
                    className="border p-2 ml-2"
                /> */}
            </div>

            <div className="mb-4">
                <label className="block">Organization Educator Alert:</label>
                {/* <input
                    type="checkbox"
                    checked={formData.jobAlerts.organizationEducator.flag}
                    onChange={() => handleCheckboxChange('organizationEducator')}
                /> */}
                {/* <input
                    type="text"
                    placeholder="Distance"
                    value={formData.jobAlerts.organizationEducator.distance}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            jobAlerts: {
                                ...prevData.jobAlerts,
                                organizationEducator: {
                                    ...prevData.jobAlerts.organizationEducator,
                                    distance: e.target.value,
                                },
                            },
                        }));
                    }}
                    className="border p-2 ml-2"
                /> */}
            </div>

            <div className="mb-4">
                <label htmlFor="jobAlerts.minExpectedSalary" className="block">Min Expected Salary:</label>
                <input
                    type="text"
                    id="jobAlerts.minExpectedSalary"
                    name="jobAlerts.minExpectedSalary.value"
                    value={formData.jobAlerts.minExpectedSalary.value}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                {/* <input
                    type="checkbox"
                    checked={formData.jobAlerts.minExpectedSalary.flag}
                    onChange={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            jobAlerts: {
                                ...prevData.jobAlerts,
                                minExpectedSalary: {
                                    ...prevData.jobAlerts.minExpectedSalary,
                                    flag: !prevData.jobAlerts.minExpectedSalary.flag,
                                },
                            },
                        }));
                    }}
                /> */}
            </div>

            <div className="mb-4">
                <label htmlFor="jobAlerts.maxExpectedSalary" className="block">Max Expected Salary:</label>
                <input
                    type="text"
                    id="jobAlerts.maxExpectedSalary"
                    name="jobAlerts.maxExpectedSalary.value"
                    value={formData.jobAlerts.maxExpectedSalary.value}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                {/* <input
                    type="checkbox"
                    checked={formData.jobAlerts.maxExpectedSalary.flag}
                    onChange={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            jobAlerts: {
                                ...prevData.jobAlerts,
                                maxExpectedSalary: {
                                    ...prevData.jobAlerts.maxExpectedSalary,
                                    flag: !prevData.jobAlerts.maxExpectedSalary.flag,
                                },
                            },
                        }));
                    }}
                /> */}
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
                            value={exp.start_date}
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
                            value={exp.end_date}
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
                            type="number"
                            id={`award-year-${index}`}
                            name="year"
                            value={award.year}
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
                </div>
            ))}
            <button type="button" onClick={addAward} className="mb-4 bg-blue-500 text-white p-2">
                Add Award
            </button>

            {/* Tags and Categories Fields */}
            <div className="mb-4">
                <label htmlFor="tags" className="block">Tags:</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags.join(', ')}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Comma-separated tags"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="categories" className="block">Categories:</label>
                <input
                    type="text"
                    id="categories"
                    name="categories"
                    value={formData.categories.join(', ')}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Comma-separated categories"
                />
            </div>

            {/* Profile Views */}
            {/* <div className="mb-4">
                <label htmlFor="profileViews" className="block">Profile Views:</label>
                <input
                    type="text"
                    id="profileViews"
                    name="profileViews"
                    value={formData.profileViews.join(', ')}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div> */}

            <button type="submit" className="bg-blue-500 text-white p-2">Save Changes</button>
        </form>
    );
};

export default EditTutor;
