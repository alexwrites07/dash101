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

      
          
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );  
}

export default App;
