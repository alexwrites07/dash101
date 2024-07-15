import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import Home from './Components/Home/Home';
import SignUp from './Components/Auth/SignUp';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Home/Footer';
import JobPost from './Components/Home/Jobpost';
import FindTutor from './Components/Home/Findtutor.jsx';
import Dashboard from './Components/Home/Dashboard/Dashboard.jsx';
import GoogleMap2 from './Components/Home/GoogleMap';
import UploadResume from './Components/Home/Dashboard/UploadResume.jsx';
import YourProfile from './Components/Home/Dashboard/YourProfile.jsx';
import AppliedCompany from './Components/Home/Dashboard/AppliedCompany.jsx';
import Locations from './Components/Home/Dashboard/Locations.jsx';
import ShortlistJobs from './Components/Home/Dashboard/ShortlistJobs';
import AlertsJobs from './Components/Home/Dashboard/AlertJobs';
import Messages from './Components/Home/Dashboard/Messages';
import Meetings from './Components/Home/Dashboard/Meetings';
import ResumeBuilder from './Components/Home/resume/builder.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Function to determine if Navbar and Footer should be hidden
  const shouldHideNavbarAndFooter = () => {
    return location.pathname === '/dashboard' || location.pathname === '/your-profile' || location.pathname === '/applied-company' || location.pathname === '/upload-resume' || location.pathname === '/upload-resume'|| location.pathname === '/meetings' || location.pathname === '/messages' || location.pathname === '/alerts-jobs' || location.pathname === '/shortlist-jobs';
  };

  return (
    <>
      {shouldHideNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/findtutor" element={<FindTutor />} />
        <Route path="/googlemap" element={<GoogleMap2 />} />
        <Route path="/dashboard" element={<YourProfile />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/your-profile" element={<YourProfile />} />
        <Route path="/applied-company" element={<AppliedCompany />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/shortlist-jobs" element={<ShortlistJobs />} />
        <Route path="/alerts-jobs" element={<AlertsJobs />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/meetings" element={<Meetings />} />
      </Routes>
      {shouldHideNavbarAndFooter() && <Footer />}
    </>
  );
}

export default App;
