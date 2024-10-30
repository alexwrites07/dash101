import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TutorProfile = () => {
    const { id } = useParams(); // Get tutor ID from the URL
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        fullName: '',
        gender: '',
        dob: '',
        description: '',
        location: {
            type: 'Point',
            coordinates: [],
            address: '',
            city: '',
            state: '',
            pinCode: ''
        },
        jobAlerts: {
            alertDistance: {
                privateTutor: { distance: 10, flag: true },
                organizationEducator: { distance: 20, flag: true }
            },
            minExpectedSalary: { value: 0, flag: false, period: 'monthly' },
            maxExpectedSalary: { value: 0, flag: false, period: 'monthly' }
        },
        education: [],
        pastExperiences: [],
        awards: [],
        categories: {
            qualifications: [],
            languages: [],
            preferredClasses: [],
            hobbies: [],
            itProgrammingCourses: [],
            examCoaching: [],
            topicBasedLearning: [],
            teachingLevels: [],
            subjectsTaught: []
        }
    });

    // Function to fetch tutor details
    const getTutorDetails = async (id) => {
        const token = localStorage.getItem('token');
        const url = `https://backend.akshayy.tech/getTutor/${id}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTutor(data);
            setUpdatedData((prev) => ({
                ...prev,
                fullName: data.fullName,
                gender: data.gender,
                dob: data.dob,
                description: data.description,
                location: { ...data.location },
                jobAlerts: { ...data.jobAlerts },
                education: data.education || [],
                pastExperiences: data.pastExperiences || [],
                awards: data.awards || [],
                categories: { ...data.categories }
            }));
        } catch (error) {
            setError('Error fetching tutor details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to update tutor profile
    const updateTutorProfile = async () => {
        const token = localStorage.getItem('token');
        const url = `https://backend.akshayy.tech/editUserProfile/${id}/Tutor`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Profile updated successfully:', data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating tutor profile:', error);
            alert('Error updating profile');
        }
    };

    useEffect(() => {
        getTutorDetails(id);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value
        });
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            location: {
                ...updatedData.location,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTutorProfile();
    };

    // Functions to add/remove categories, education, experience, and awards
    const addEducation = () => {
        setUpdatedData((prev) => ({
            ...prev,
            education: [...prev.education, { title: '', academy: '', year: '', description: '' }]
        }));
    };

    const removeEducation = (index) => {
        const newEducation = updatedData.education.filter((_, i) => i !== index);
        setUpdatedData((prev) => ({ ...prev, education: newEducation }));
    };

    const addExperience = () => {
        setUpdatedData((prev) => ({
            ...prev,
            pastExperiences: [...prev.pastExperiences, { title: '', start_date: '', end_date: '', company: '', description: '' }]
        }));
    };

    const removeExperience = (index) => {
        const newExperiences = updatedData.pastExperiences.filter((_, i) => i !== index);
        setUpdatedData((prev) => ({ ...prev, pastExperiences: newExperiences }));
    };

    const addAward = () => {
        setUpdatedData((prev) => ({
            ...prev,
            awards: [...prev.awards, { title: '', year: '', description: '' }]
        }));
    };

    const removeAward = (index) => {
        const newAwards = updatedData.awards.filter((_, i) => i !== index);
        setUpdatedData((prev) => ({ ...prev, awards: newAwards }));
    };

    // Render functions for education, experience, and awards
    const renderEducation = () => updatedData.education.map((edu, index) => (
        <div key={index} className="border p-2 rounded mb-2">
            <input type="text" placeholder="Title" value={edu.title} onChange={(e) => {
                const newEducation = [...updatedData.education];
                newEducation[index].title = e.target.value;
                setUpdatedData({ ...updatedData, education: newEducation });
            }} className="border rounded w-full p-1" />
            <input type="text" placeholder="Academy" value={edu.academy} onChange={(e) => {
                const newEducation = [...updatedData.education];
                newEducation[index].academy = e.target.value;
                setUpdatedData({ ...updatedData, education: newEducation });
            }} className="border rounded w-full p-1 mt-1" />
            <input type="date" value={edu.year} onChange={(e) => {
                const newEducation = [...updatedData.education];
                newEducation[index].year = e.target.value;
                setUpdatedData({ ...updatedData, education: newEducation });
            }} className="border rounded w-full p-1 mt-1" />
            <textarea placeholder="Description" value={edu.description} onChange={(e) => {
                const newEducation = [...updatedData.education];
                newEducation[index].description = e.target.value;
                setUpdatedData({ ...updatedData, education: newEducation });
            }} className="border rounded w-full p-1 mt-1" rows="2" />
            <button type="button" onClick={() => removeEducation(index)} className="text-red-500 mt-1">Remove</button>
        </div>
    ));

    const renderExperiences = () => updatedData.pastExperiences.map((exp, index) => (
        <div key={index} className="border p-2 rounded mb-2">
            <input type="text" placeholder="Title" value={exp.title} onChange={(e) => {
                const newExperiences = [...updatedData.pastExperiences];
                newExperiences[index].title = e.target.value;
                setUpdatedData({ ...updatedData, pastExperiences: newExperiences });
            }} className="border rounded w-full p-1" />
            <input type="date" value={exp.start_date} onChange={(e) => {
                const newExperiences = [...updatedData.pastExperiences];
                newExperiences[index].start_date = e.target.value;
                setUpdatedData({ ...updatedData, pastExperiences: newExperiences });
            }} className="border rounded w-full p-1 mt-1" />
            <input type="date" value={exp.end_date} onChange={(e) => {
                const newExperiences = [...updatedData.pastExperiences];
                newExperiences[index].end_date = e.target.value;
                setUpdatedData({ ...updatedData, pastExperiences: newExperiences });
            }} className="border rounded w-full p-1 mt-1" />
            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => {
                const newExperiences = [...updatedData.pastExperiences];
                newExperiences[index].company = e.target.value;
                setUpdatedData({ ...updatedData, pastExperiences: newExperiences });
            }} className="border rounded w-full p-1 mt-1" />
            <textarea placeholder="Description" value={exp.description} onChange={(e) => {
                const newExperiences = [...updatedData.pastExperiences];
                newExperiences[index].description = e.target.value;
                setUpdatedData({ ...updatedData, pastExperiences: newExperiences });
            }} className="border rounded w-full p-1 mt-1" rows="2" />
            <button type="button" onClick={() => removeExperience(index)} className="text-red-500 mt-1">Remove</button>
        </div>
    ));

    const renderAwards = () => updatedData.awards.map((award, index) => (
        <div key={index} className="border p-2 rounded mb-2">
            <input type="text" placeholder="Title" value={award.title} onChange={(e) => {
                const newAwards = [...updatedData.awards];
                newAwards[index].title = e.target.value;
                setUpdatedData({ ...updatedData, awards: newAwards });
            }} className="border rounded w-full p-1" />
            <input type="date" value={award.year} onChange={(e) => {
                const newAwards = [...updatedData.awards];
                newAwards[index].year = e.target.value;
                setUpdatedData({ ...updatedData, awards: newAwards });
            }} className="border rounded w-full p-1 mt-1" />
            <textarea placeholder="Description" value={award.description} onChange={(e) => {
                const newAwards = [...updatedData.awards];
                newAwards[index].description = e.target.value;
                setUpdatedData({ ...updatedData, awards: newAwards });
            }} className="border rounded w-full p-1 mt-1" rows="2" />
            <button type="button" onClick={() => removeAward(index)} className="text-red-500 mt-1">Remove</button>
        </div>
    ));

    return (
        <div className="p-4 max-w-3xl mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4">Tutor Profile</h2>
                    <input type="text" name="fullName" placeholder="Full Name" value={updatedData.fullName} onChange={handleInputChange} className="border rounded w-full p-2 mb-2" required />
                    <select name="gender" value={updatedData.gender} onChange={handleInputChange} className="border rounded w-full p-2 mb-2">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="date" name="dob" value={updatedData.dob} onChange={handleInputChange} className="border rounded w-full p-2 mb-2" required />
                    <textarea name="description" value={updatedData.description} onChange={handleInputChange} placeholder="Description" className="border rounded w-full p-2 mb-2" rows="3" />
                    
                    <h3 className="text-xl mt-4 mb-2">Location</h3>
                    <input type="text" name="address" placeholder="Address" value={updatedData.location.address} onChange={handleLocationChange} className="border rounded w-full p-2 mb-2" required />
                    <input type="text" name="city" placeholder="City" value={updatedData.location.city} onChange={handleLocationChange} className="border rounded w-full p-2 mb-2" required />
                    <input type="text" name="state" placeholder="State" value={updatedData.location.state} onChange={handleLocationChange} className="border rounded w-full p-2 mb-2" required />
                    <input type="text" name="pinCode" placeholder="Pin Code" value={updatedData.location.pinCode} onChange={handleLocationChange} className="border rounded w-full p-2 mb-2" required />

                    <h3 className="text-xl mt-4 mb-2">Education</h3>
                    {renderEducation()}
                    <button type="button" onClick={addEducation} className="bg-blue-500 text-white rounded p-2 mb-4">Add Education</button>

                    <h3 className="text-xl mt-4 mb-2">Experience</h3>
                    {renderExperiences()}
                    <button type="button" onClick={addExperience} className="bg-blue-500 text-white rounded p-2 mb-4">Add Experience</button>

                    <h3 className="text-xl mt-4 mb-2">Awards</h3>
                    {renderAwards()}
                    <button type="button" onClick={addAward} className="bg-blue-500 text-white rounded p-2 mb-4">Add Award</button>

                    <button type="submit" className="bg-green-500 text-white rounded p-2">Update Profile</button>
                </form>
            )}
        </div>
    );
};

export default TutorProfile;
