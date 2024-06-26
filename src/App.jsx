import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);


  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
          
  
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

  
          
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );  
}

export default App;
