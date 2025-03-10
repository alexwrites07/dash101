import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailRedirect = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        try {
            const response = await axios.post('https://server.avyudha.com/online-tutor/google',
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.message) {
                window.location.href = response.data.message; // Redirect to the link in response
            } else {
                alert('Invalid response from server');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Email ID
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmailRedirect;