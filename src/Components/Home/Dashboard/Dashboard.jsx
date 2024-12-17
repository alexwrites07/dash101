import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Modal, TextInput } from 'flowbite-react';
import UploadResume from './UploadResume';
import YourProfile from './YourProfile';
import AppliedCompany from './AppliedCompany';
import Locations from './Locations';
import ShortlistJobs from './ShortlistJobs';
import FollowingEmployer from './FollowingEmployer';
import AlertsJobs from './AlertJobs';
import Messages from './Messages';
import Meetings from './Meetings';
import Sidebar from './Sidebar';
import Header from './Header';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import UserDashboard  from './UserDashboard';
import Pricing  from './Pricing';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('/dashboard'); // Initial active tab (dashboard)
    const [openModal, setOpenModal] = useState(false);
    const [openModalReset, setOpenModalReset] = useState(false);

    // Function to navigate to different tabs
    const handleNavigate = (path) => {
        navigate(path);
        setActiveTab(path); // Update active tab
    };

    // Handle logout
    const handleLogOut = async () => {
        try {
            // Log out logic
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };

    // Handle reset password
    const handleResetPassword = async () => {
        // Reset password logic
    };

    return (
        <div className="flex h-screen">
            <Header />
            <div className="flex w-full">
                <Sidebar activeTab={activeTab} />
                <div className="main-content flex-1 p-6 min-h-screen pt-16">
                    <h2 className="text-black text-2xl font-semibold mb-4">Main Content</h2>
                    {/* Route content based on activeTab */}
                    <Routes>
                        <Route path="/dashboard" element={<UserDashboard />} />
                       
                        <Route path="/upload-resume" element={<UploadResume />} />
                        <Route path="/your-profile" element={<YourProfile />} />
                        <Route path="/applied-company" element={<AppliedCompany />} />
                        <Route path="/locations" element={<Locations />} />
                        <Route path="/shortlist-jobs" element={<ShortlistJobs />} />
                        <Route path="/following-employer" element={<FollowingEmployer />} />
                        <Route path="/alerts-jobs" element={<AlertsJobs />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/meetings" element={<Meetings />} />
                        <Route path="/update-password" element={<ChangePassword/>} />
                        <Route path="/delete-profile" element={<DeleteProfile />} />
                        <Route path="/pricing" element={<Pricing />} />
                    </Routes>
                </div>
            </div>

            {/* Logout Modal */}
            <Modal className="bg-[#041F96] border-gray-700" dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Logout</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Are you sure you want to logout?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-[#041F96] border-gray-700" onClick={handleLogOut}>Logout</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Stay In
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reset Password Modal */}
            <Modal className="bg-[#041F96] border-gray-700" dismissible show={openModalReset} onClose={() => setOpenModalReset(false)}>
                <Modal.Header>Reset Password</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Enter the new password</h3>
                        <div>
                            <div className="mb-2 block">
                                {/* Input fields for reset password */}
                            </div>
                            <TextInput id="password" type="password" required />
                            <div className="mb-2 mt-2 block">
                                {/* Confirm password */}
                            </div>
                            <TextInput id="confirmPassword" type="password" required />
                        </div>
                        <div className="w-full">
                            <Button onClick={handleResetPassword}>Reset Password</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Dashboard;
