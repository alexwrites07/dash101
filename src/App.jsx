import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import Home from './Components/Home/Home'
import SignUp from './Components/Auth/SignUp';
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Home/Footer';
import JobPost from './Components/Home/Jobpost';
import FindTutor from './Components/Home/Findtutor.jsx';
import GoogleMap2 from './Components/Home/GoogleMap';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);


  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Navbar/>
          <Routes>
         
  
            <Route path="/" element={<Home />} />
            <Route path="/login" element ={<Login/>}/>
            <Route path="/signup" element ={<SignUp/>}/>
            <Route path="/jobpost" element ={<JobPost/>}/>
            <Route path="/findtutor" element ={<FindTutor/>}/>
            <Route path="/googlemap" element ={<GoogleMap2/>}/>
      
          
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );  
}

export default App;
