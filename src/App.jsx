import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import DemoForm from './Components/Home/DemoForm.jsx';
import Home from './Components/Home/Home';
import Sidebar from './Components/Home/Dashboard/AdminPanel/AdminSidebar.jsx';
import SignUp from './Components/Auth/SignUp';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Home/Footer';
import JobPost from './Components/Home/Jobpost';
import TutorFinder from './Components/Home/Findtutor.jsx';
import LearningNeeds from './Components/Home/Dashboard/LearnNeeds.jsx';
import MyClasses from './Components/Home/Dashboard/MyClasses.jsx';
import ContactUs from './Components/Home/ContactUs.jsx';

import Dashboard from './Components/Home/Dashboard/Dashboard.jsx';
import Reviews from './Components/Home/Dashboard/Reviews.jsx';
import GoogleMap2 from './Components/Home/GoogleMap';
import ResumeBuilder from './Components/Home/resume/builder.jsx';
import YourProfile from './Components/Home/Dashboard/YourProfile.jsx';
import AppliedCompany from './Components/Home/Dashboard/AppliedCompany.jsx';
import Locations from './Components/Home/DashboardEmployer/LocationsEmployer.jsx';
import ShortlistJobs from './Components/Home/Dashboard/ShortlistJobs';
import AlertsJobs from './Components/Home/Dashboard/AlertJobs';
import Messages from './Components/Home/Dashboard/Messages';
import Meetings from './Components/Home/Dashboard/Meetings';
import JobDetail from './Components/Home/Jobs/JobDetail.jsx';
import JobDescription from './Components/Home/Jobs/JobDescription';
import UploadResume from './Components/Home/Dashboard/UploadResume.jsx';
import FollowingEmployer from './Components/Home/Dashboard/FollowingEmployer';
import StudentProfile from './Components/Home/Dashboard/StudentProfile.jsx';
import ChangePassword from './Components/Home/Dashboard/ChangePassword';
import DeleteProfile from './Components/Home/Dashboard/DeleteProfile';
import UserDashboard from './Components/Home/Dashboard/UserDashboard';
import Pricing from './Components/Home/Dashboard/Pricing';
import YourProfileEmployer from './Components/Home/DashboardEmployer/YourProfileEmployer';
import AppliedCompanyEmployer from './Components/Home/DashboardEmployer/AppliedCompanyEmployer.jsx';
import LocationsEmployer from './Components/Home/DashboardEmployer/LocationsEmployer.jsx';
import ShortlistJobsEmployer from './Components/Home/DashboardEmployer/ShortlistJobsEmployer';
import AlertsJobsEmployer from './Components/Home/DashboardEmployer/AlertJobsEmployer';
import MessagesEmployer from './Components/Home/DashboardEmployer/MessagesEmployer';
import MeetingsEmployer from './Components/Home/DashboardEmployer/MeetingsEmployer';
import UploadResumeEmployer from './Components/Home/DashboardEmployer/SubmitJob.jsx';
import ChangePasswordEmployer from './Components/Home/DashboardEmployer/ChangePasswordEmployer.jsx';
import DeleteProfileEmployer from './Components/Home/DashboardEmployer/DeleteProfileEmployer';
import UserDashboardEmployer from './Components/Home/DashboardEmployer/UserDashboardEmployer';
import PricingEmployer from './Components/Home/DashboardEmployer/PricingEmployer';
import MyJobs from './Components/Home/DashboardEmployer/MyJobs.jsx';
import AboutUs from './Components/Home/AboutUs';
import Blog from './Components/Home/Dashboard/Blogs.jsx';
import BlogContent from './Components/Home/BlogContent.jsx';
import Catagories from './Components/Home/Catagories';
import TeachingDescription from './Components/Home/Jobs/TeachingDescription.jsx';
import WidgetCatagory from './Components/Home/Dashboard/AdminPanel/WidgetCatagory.jsx';

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
    return location.pathname === '/dashboard' || location.pathname === '/user-dashboard' || location.pathname === '/your-profile' || location.pathname === '/applied-company' || location.pathname === '/upload-resume' || location.pathname === '/upload-resume'|| location.pathname === '/meetings' || location.pathname === '/messages' || location.pathname === '/alerts-jobs' || location.pathname === '/shortlist-jobs'
    || location.pathname === '/pricing'|| location.pathname === '/myclasses' ||location.pathname === '/reviews'||location.pathname === '/learningneeds' ||location.pathname === '/following-employer'||location.pathname === '/update-password'||location.pathname === '/delete-profile';
  };
  

  return (
    <>
      {!shouldHideNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/learningneeds" element={<LearningNeeds />} />
        <Route path="/myclasses" element={<MyClasses/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path='/resume' element={<ResumeBuilder/>}/>
        <Route path="/demo-form" element={<DemoForm />} />
        <Route path="/findtutor" element={<TutorFinder />} />
        <Route path="/getTutor/:Id" element={<TeachingDescription />} />
        <Route path="/googlemap" element={<GoogleMap2 />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/Catagories" element={<Catagories />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/getjobs/:jobId" element={<JobDescription/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/add-category" element ={<WidgetCatagory/>}/>
        <Route path="/your-profile" element={<YourProfile />} />
        <Route path="/applied-company" element={<AppliedCompany />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/shortlist-jobs" element={<ShortlistJobs />} />
        <Route path="/following-employer" element={<FollowingEmployer />} />
        <Route path="/alerts-jobs" element={<AlertsJobs />} />
        <Route path="/admin-panel" element ={<Sidebar/>}/>
        <Route path="/messages" element={<Messages />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/update-password" element={<ChangePassword/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog/:id" element={<BlogContent />} />
        
        <Route path="/blogs" element={<Blog />} />
        <Route path="/dashboard-employer" element={<UserDashboardEmployer />} />
        <Route path="/upload-resume-employer" element={<UploadResumeEmployer />} />
        <Route path="/your-profile-employer" element={<YourProfileEmployer />} />
        <Route path="/applied-company-employer" element={<AppliedCompanyEmployer />} />
        <Route path="/locations-employer" element={<LocationsEmployer />} />
        <Route path="/shortlist-jobs-employer" element={<ShortlistJobsEmployer />} />
        <Route path="/alerts-jobs-employer" element={<AlertsJobsEmployer />} />
        <Route path="/messages-employer" element={<MessagesEmployer />} />
        <Route path="/meetings-employer" element={<MeetingsEmployer />} />
        <Route path="/update-password-employer" element={<ChangePasswordEmployer/>} />
        <Route path="/delete-profile-employer" element={<DeleteProfileEmployer />} />
        <Route path="/user-dashboard-employer" element={<UserDashboardEmployer />} />
        <Route path="/pricing-employer" element={<PricingEmployer />} />
        <Route path="/my-jobs-employer" element={<MyJobs />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
      {!shouldHideNavbarAndFooter() && <Footer />}
    </>
  );
}

export default App;
