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
            setUpdatedData({
                ...updatedData,
                fullName: data.fullName,
                gender: data.gender,
                dob: data.dob,
                description: data.description,
                location: { ...data.location },
                jobAlerts: { ...data.jobAlerts }
            });
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

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-4">Tutor Profile</h1>
            {tutor && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={updatedData.fullName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <select
                            name="gender"
                            value={updatedData.gender}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={updatedData.dob ? updatedData.dob.split('T')[0] : ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={updatedData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            rows="4"
                        />
                    </div>
                    <h3 className="text-lg font-semibold mt-6">Location</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={updatedData.location.address}
                            onChange={handleLocationChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={updatedData.location.city}
                            onChange={handleLocationChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State:</label>
                        <input
                            type="text"
                            name="state"
                            value={updatedData.location.state}
                            onChange={handleLocationChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pin Code:</label>
                        <input
                            type="text"
                            name="pinCode"
                            value={updatedData.location.pinCode}
                            onChange={handleLocationChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <h3 className="text-lg font-semibold mt-6">Job Alerts</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Minimum Expected Salary:</label>
                        <input
                            type="number"
                            name="minExpectedSalary"
                            value={updatedData.jobAlerts.minExpectedSalary.value}
                            onChange={(e) => {
                                setUpdatedData({
                                    ...updatedData,
                                    jobAlerts: {
                                        ...updatedData.jobAlerts,
                                        minExpectedSalary: {
                                            ...updatedData.jobAlerts.minExpectedSalary,
                                            value: e.target.value
                                        }
                                    }
                                });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Maximum Expected Salary:</label>
                        <input
                            type="number"
                            name="maxExpectedSalary"
                            value={updatedData.jobAlerts.maxExpectedSalary.value}
                            onChange={(e) => {
                                setUpdatedData({
                                    ...updatedData,
                                    jobAlerts: {
                                        ...updatedData.jobAlerts,
                                        maxExpectedSalary: {
                                            ...updatedData.jobAlerts.maxExpectedSalary,
                                            value: e.target.value
                                        }
                                    }
                                });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-500 text-white font-bold py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
                    >
                        Update Profile
                    </button>
                </form>
            )}
        </div>
    );
};

export default TutorProfile;
