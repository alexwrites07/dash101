import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Modal, TextInput } from 'flowbite-react';
import UploadResumeEmployer from './SubmitJob';
import YourProfileEmployer from './YourProfileEmployer';
import AppliedCompanyEmployer from './AppliedCompanyEmployer';
import LocationsEmployer from './LocationsEmployer';
import ShortlistJobsEmployer from './ShortlistJobsEmployer';
import AlertsJobsEmployer from './AlertJobsEmployer';
import MessagesEmployer from './MessagesEmployer';
import MeetingsEmployer from './MeetingsEmployer';
import SidebarEmployer from './SidebarEmployer';
import HeaderEmployer from './HeaderEmployer';
import ChangePasswordEmployer from './ChangePasswordEmployer';
import DeleteProfileEmployer from './DeleteProfileEmployer';
import UserDashboardEmployer  from './UserDashboardEmployer';
import PricingEmployer  from './PricingEmployer';
import Myjobs  from './MyJobs';
import EditJobs  from './EditJobs';
import Wallet from './Wallet';
import './DashboardEmployer.css';

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
                    <Route path="/dashboard-employer" element={<UserDashboardEmployer />} />
                    <Route path="/upload-resume-employer" element={<UploadResumeEmployer />} />
                    {/* <Route path="/your-profile-employer" element={<YourProfileEmployer />} /> */}
                    <Route path="/applied-company-employer" element={<AppliedCompanyEmployer />} />
                    <Route path="/locations-employer" element={<LocationsEmployer />} />
                    <Route path="/shortlist-jobs-employer" element={<ShortlistJobsEmployer />} />
                    <Route path="/alerts-jobs-employer" element={<AlertsJobsEmployer />} />
                    <Route path="/messages-employer" element={<MessagesEmployer />} />
                    <Route path="/meetings-employer" element={<MeetingsEmployer />} />
                    <Route path="/update-password-employer" element={<ChangePasswordEmployer/>} />
                    <Route path="/delete-profile-employer" element={<DeleteProfileEmployer />} />
                    
                   
                    <Route path="/my-jobs-employer" element={<Myjobs />} />
                    <Route path="/edit-job/:jobid" element={<EditJobs />} />
                    <Route path="/wallet" element={<Wallet />} />
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
