import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import AdminProfile from './Components/Home/Dashboard/AdminPanel/AdminProfile.jsx';
import Reviewsq from './Components/Home/Dashboard/AdminPanel/Reviews.jsx';
import TestimonialPage from './Components/Home/Dashboard/AdminPanel/FeaturedTestinomials.jsx';
import Login from './Components/Auth/Login';
import JobPostManagement from './Components/Home/DashboardEmployer/EditJobsEmployer.jsx';
import EditTutor from './Components/Home/Dashboard/AdminPanel/TeacherEdit.jsx';
import StudentEdit from './Components/Home/Dashboard/AdminPanel/StudentEdit.jsx';
import InstituteProfileView from './Components/Home/Dashboard/AdminPanel/FeaturedInstitute.jsx';
import DemoForm from './Components/Home/DemoForm.jsx';
import EmployerProfileView from './Components/Home/Dashboard/AdminPanel/OrganisationProfile.jsx';
import Home from './Components/Home/Home';
import FAQ from './Components/Home/FAQs.jsx'
import Error404 from './Components/Home/Error.jsx';
import Sidebar from './Components/Home/Dashboard/AdminPanel/AdminSidebar.jsx';
import SignUp from './Components/Auth/SignUp';
import JobPostPage from './Components/Home/Dashboard/AdminPanel/FeaturedJobPost.jsx';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Home/Footer';
import JobPost from './Components/Home/Jobpost';
import AdminHeader from './Components/Home/Dashboard/AdminPanel/FeaturedHeader.jsx';
import TutorFinder from './Components/Home/Findtutor.jsx';
import LearningNeedsView from './Components/Home/Dashboard/AdminPanel/LearningNeeds.jsx';
import MyClasses from './Components/Home/Dashboard/MyClasses.jsx';
import ContactUs from './Components/Home/ContactUs.jsx';
import EditLearningNeed from './Components/Home/Dashboard/AdminPanel/EditLearningNeeds.jsx';
import EditEmployerProfile from './Components/Home/Dashboard/AdminPanel/OrgEdit.jsx';
import TutorProfileView from './Components/Home/Dashboard/AdminPanel/TeacherProfile.jsx';
// import Dashboard from './Components/Home/Dashboard/Dashboard.jsx';
import Reviews from './Components/Home/Dashboard/Reviews.jsx';
import GoogleMap2 from './Components/Home/GoogleMap';
import PurchasedContacts from './Components/Home/Dashboard/PurchasedContacts.jsx';
import AdminFooterPanel from './Components/Home/Dashboard/AdminPanel/FeaturedFooter.jsx';
// import ResumeBuilder from './Components/Home/resume/builder.jsx';
import YourProfile from './Components/Home/Dashboard/YourProfile.jsx';
import AppliedCompany from './Components/Home/Dashboard/AppliedCompany.jsx';
import Locations from './Components/Home/DashboardEmployer/LocationsEmployer.jsx';
import ShortlistJobs from './Components/Home/Dashboard/ShortlistJobs';
import AlertsJobs from './Components/Home/Dashboard/AlertJobs';
import Messages from './Components/Home/Dashboard/Messages';
import Tag from './Components/Home/Dashboard/AdminPanel/Tags.jsx';
import Meetings from './Components/Home/Dashboard/Meetings';
// import JobDetail from './Components/Home/Jobs/JobDetail.jsx';
import JobDescription from './Components/Home/Jobs/JobDescription';
import OrgDescription from './Components/Home/OrgDetails.jsx';
import UploadResume from './Components/Home/Dashboard/UploadResume.jsx';
import FollowingEmployer from './Components/Home/Dashboard/FollowingEmployer';
// import StudentProfile from './Components/Home/Dashboard/StudentProfile.jsx';
import ChangePassword from './Components/Home/Dashboard/ChangePassword';
import DeleteProfile from './Components/Home/Dashboard/DeleteProfile';
import UserDashboard from './Components/Home/Dashboard/UserDashboard';
import Pricing from './Components/Home/Dashboard/Pricing';
// import YourProfileEmployer from './Components/Home/DashboardEmployer/YourProfileEmployer';
import AppliedCompanyEmployer from './Components/Home/DashboardEmployer/AppliedCompanyEmployer.jsx';
import LocationsEmployer from './Components/Home/DashboardEmployer/LocationsEmployer.jsx';
import ShortlistJobsEmployer from './Components/Home/DashboardEmployer/ShortlistJobsEmployer';
import SaveFilterForm from './Components/Home/DashboardEmployer/AlertJobsEmployer.jsx';
import LearningNeeds from './Components/Home/Dashboard/LearnNeeds.jsx';
import MessagesEmployer from './Components/Home/DashboardEmployer/MessagesEmployer';
import MeetingsEmployer from './Components/Home/DashboardEmployer/MeetingsEmployer';
import UploadResumeEmployer from './Components/Home/DashboardEmployer/SubmitJob.jsx';
import ChangePasswordEmployer from './Components/Home/DashboardEmployer/ChangePasswordEmployer.jsx';
import DeleteProfileEmployer from './Components/Home/DashboardEmployer/DeleteProfileEmployer';
import UserDashboardEmployer from './Components/Home/DashboardEmployer/UserDashboardEmployer';
import PricingEmployer from './Components/Home/DashboardEmployer/PricingEmployer';
import MyJobs from './Components/Home/DashboardEmployer/MyJobs.jsx';
import EditJobs from './Components/Home/DashboardEmployer/EditJobs.jsx';
import CategoryEdit from './Components/Home/Dashboard/AdminPanel/CategoryEdit.jsx';
import Wallet from './Components/Home/Dashboard/Wallet.jsx';
import Logout from './Components/Home/Dashboard/LogOut.jsx';
import AboutUs from './Components/Home/AboutUs';
import OrganizationFinder from './Components/Home/FindOrganization.jsx';
import BlogPage from './Components/Home/Dashboard/AdminPanel/FeaturedBlogs.jsx';
import Blog from './Components/Home/Dashboard/Blogs.jsx';
import TransactionHistory from './Components/Home/Dashboard/Transactions.jsx';
import EditTags from './Components/Home/Dashboard/AdminPanel/EditTags.jsx';
import BlogContent from './Components/Home/BlogContent.jsx';
import Catagories from './Components/Home/Catagories';
import EditBlogPage from './Components/Home/Dashboard/AdminPanel/EditBlogs.jsx';
import TeachingDescription from './Components/Home/Jobs/TeachingDescription.jsx';
import NeedsFinder from './Components/Home/FindNeeds.jsx';
import ResumeBuilder from './Components/Home/resume/builder.jsx'
import TermsAndConditions from './Components/Home/Terms.jsx';
// import WidgetCatagory from './Components/Home/Dashboard/AdminPanel/WidgetCatagory.jsx';
import StudentProfileView from './Components/Home/Dashboard/AdminPanel/StudentProfile.jsx';
import RefundPolicy from './Components/Home/Refund.jsx';
import Category from './Components/Home/Dashboard/AdminPanel/Category.jsx';
import HeroSectionManager from './Components/Home/Dashboard/AdminPanel/FeaturedHero.jsx';
import FeaturedCategoryPage from './Components/Home/Dashboard/AdminPanel/FeaturedCategory.jsx';
import EditJobPost from './Components/Home/Dashboard/AdminPanel/EditJobPost.jsx';
import AddLearning from './Components/Home/Dashboard/AdminPanel/LearningForm.jsx';
import NeedDescription from './Components/Home/NeedDetails.jsx';
import WalletManager from './Components/Home/Dashboard/AdminPanel/Wallet.jsx';
import EditJob from './Components/Home/Dashboard/AdminPanel/Editjobs.jsx';
import DpEditDelete from './Components/Home/Dashboard/AdminPanel/DP.jsx';
import Doc from './Components/Home/Dashboard/AdminPanel/DocVerify.jsx';
import PrivacyPolicy from './Components/Home/Privacy.jsx';

function AdminRoute({ element: Component, ...rest }) {
  const userType = localStorage.getItem('type'); // Get userType from localStorage

  // Check if userType exists and is "admin"
  if (userType && userType === 'admin') {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/error" />;  // Redirect to /error if not admin
  }
}

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
    return location.pathname === '/dashboard' || location.pathname === '/user-dashboard' 
    || location.pathname === '/your-profile' || location.pathname === '/applied-company'
     || location.pathname === '/upload-resume' || location.pathname === '/upload-resume'
     || location.pathname === '/meetings' || location.pathname === '/messages'
     || location.pathname === '/alerts-jobs' || location.pathname === '/shortlist-jobs'
    || location.pathname === '/pricing'|| location.pathname === '/myclasses' 
    ||location.pathname === '/reviews'||location.pathname === '/learningneeds' 
    ||location.pathname === '/following-employer'||location.pathname === '/update-password'
    ||location.pathname === '/delete-profile' ||location.pathname === '/student-profiles'
    ||location.pathname === '/delete-profile'||location.pathname === '/delete-profile'||location.pathname === '/widgets/featured-jobs'
    ||location.pathname === '//widgets/featured-institution'||location.pathname === '/widgets/featured-testimonials'
    ||location.pathname === '/widgets/featured-institution'||location.pathname === '/dashboard-employer' 
    || location.pathname === '/alerts-jobs-employer' || location.pathname === '/messages-employer' 
    || location.pathname === '/meetings-employer' || location.pathname === '/update-password-employer'
    || location.pathname === '/upload-resume-employer' || location.pathname === '/your-profile-employer' 
    || location.pathname === '/locations-employer' || location.pathname === '/shortlist-jobs-employer'
    || location.pathname === '/wallet' ||location.pathname === '/edit-job/:jobid'||location.pathname === '/edit-job-employer/:jobId'
    || location.pathname === '/learning-need-posts'|| location.pathname === '/reviews-rating'
    || location.pathname === '/pricing-employer'||location.pathname === '/user-dashboard-employer'
    ||location.pathname === '/applied-company-employer'|| location.pathname === '/delete-profile-employer'||Location.pathname === '/edit-job'
    || location.pathname === "/add-tags"
    || location.pathname === "/add-category"
    ||location.pathname==="/transactions"
    ||location.pathname==="/logout"
    || location.pathname === "/blogs-admin"
    || location.pathname === "/student-profiles"
    || location.pathname === "/tutor-profiles"
    || location.pathname === "/organization-profiles"
    || location.pathname === "/widgets/featured-institution"
    || location.pathname === "/widgets/featured-testimonials"
    || location.pathname === "/widgets/featured-jobs"
    || location.pathname === "/widgets/featured-category"
    || location.pathname === "/widgets/footer"
    || location.pathname === "/purchasedcontacts"
    || location.pathname === "/widgets/headers" 
     || location.pathname === "/my-jobs-employer"
    || location.pathname === "/reviews-rating"
    || location.pathname === "/edit-job-post"
    || location.pathname === "/add-learning-need";;
  };
  

  return (
    <>
      {!shouldHideNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-tags/:id" element={<EditTags />} />
        <Route path="/learningneeds" element={<LearningNeeds />} />
        <Route path="/myclasses" element={<MyClasses/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<TermsAndConditions/>} />
        <Route path='/resume' element={<ResumeBuilder/>}/>
        {/* <Route path='/resume' element={<ResumeBuilder/>}/> */}
        <Route path="/demo-form" element={<DemoForm />} />
        <Route path="/organizationpost" element={<OrganizationFinder />} />
        <Route path="/findtutor" element={<TutorFinder />} />
        <Route path="/getTutor/:Id" element={<TeachingDescription />} />
        <Route path="/googlemap" element={<GoogleMap2 />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/dpchange" element={<DpEditDelete />} />
        <Route path="/docchange" element={<Doc />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/Catagories" element={<Catagories />} />
        <Route path="/jobs/edit/:id" element={<EditJob />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/getjobs/:jobId" element={<JobDescription/>} />
        <Route path="/getOrg/:iid" element={<OrgDescription/>} />

        <Route path="/getNeed/:IId" element={<NeedDescription/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/purchasedcontacts" element={<PurchasedContacts />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/needpost" element={<NeedsFinder />} />
        <Route path="/wallet-admin" element={<WalletManager />} />
        <Route path="/widgets/hero-section" element={<HeroSectionManager/>}/>
        {/* <Route path="/add-category" element ={<WidgetCatagory/>}/> */}
        <Route path="/your-profile" element={<YourProfile />} />
        <Route path="/learning-need-posts" element={<LearningNeedsView />} />
        <Route path="/applied-company" element={<AppliedCompany />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/shortlist-jobs" element={<ShortlistJobs />} />
        <Route path="/following-employer" element={<FollowingEmployer />} />
        <Route path="/alerts-jobs" element={<AlertsJobs />} />
        
        <Route path="/messages" element={<Messages />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/update-password" element={<ChangePassword/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog/:id" element={<BlogContent />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/dashboard-employer" element={<UserDashboardEmployer />} />
        <Route path="/upload-resume-employer" element={<UploadResumeEmployer />} />
        {/* <Route path="/your-profile-employer" element={<YourProfileEmployer />} /> */}
        <Route path="/applied-company-employer" element={<AppliedCompanyEmployer />} />
        <Route
          path="/admin-panel"
          element={<AdminRoute element={Sidebar} />} // Protected route for admin-panel
        />
           <Route path="/edit-learning-need/:id" element={<EditLearningNeed/>} />
        {/* Catch-all route for undefined paths */}
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/error" />} />  
        <Route path="/locations-employer" element={<LocationsEmployer />} />
        <Route path="/shortlist-jobs-employer" element={<ShortlistJobsEmployer />} />
        <Route path="/alerts-jobs-employer" element={<SaveFilterForm />} />
        <Route path="/messages-employer" element={<MessagesEmployer />} />
        <Route path="/meetings-employer" element={<MeetingsEmployer />} />
        <Route path="/update-password-employer" element={<ChangePasswordEmployer/>} />
        <Route path="/delete-profile-employer" element={<DeleteProfileEmployer />} />
        <Route path="/user-dashboard-employer" element={<UserDashboardEmployer />} />
        <Route path="/pricing-employer" element={<PricingEmployer />} />
        <Route path="/edit-category/:id" element={<CategoryEdit />}  />
        <Route path="/my-jobs-employer" element={<MyJobs />} />
        <Route path="/edit-job/:jobid" element={<EditJobs />} />
        <Route path="/edit-job-employer/:jobId" element={<JobPostManagement />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/add-tags" element={<Tag/>}/>
        <Route path="/edit-job-post" element={<EditJobPost/>}/>
        <Route path="/add-learning-need" element={<AddLearning/>}/>
        <Route path="/add-category" element={<FeaturedCategoryPage/>}/>
        <Route path="/blogs-admin" element={<BlogPage/>}/>
        {/* <Route path="/student-profile" element={<StudentProfile />} /> */}
        <Route path="/student-profiles" element={<StudentProfileView/>}/>
        <Route path="/edit-student/:studentId" element={<StudentEdit />} />
        <Route path="/edit-tutor/:id" element={<EditTutor />} /> {/* Add this route */}
        <Route path="/edit-employer/:id" element={<EditEmployerProfile />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        <Route path="/tutor-profiles" element={<TutorProfileView/>}/>
        <Route path="/organization-profiles" element={<EmployerProfileView/>}/>
        <Route path="/widgets/featured-institution" element={<InstituteProfileView/>}/>
        <Route path="/widgets/featured-testimonials" element ={<TestimonialPage/>}/>
        <Route path="/widgets/featured-jobs" element ={<JobPostPage/>}/>
        <Route path="/widgets/featured-category" element={<FeaturedCategoryPage/>}/>
        <Route path ="/widgets/footer" element={<AdminFooterPanel/>}/>
        <Route path ="/widgets/headers" element ={<AdminHeader/>}/>
        <Route path ="/reviews-rating" element ={<Reviewsq/>}/>
      </Routes>
      {!shouldHideNavbarAndFooter() && <Footer />}
    </>
  );
}

export default App;