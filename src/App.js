import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Upskill from './Upskill';
import Forum from './components/Forum';
import Contest from './components/Contest';
import Leaderboard from './components/LeaderBoard';

import Dashboard from './components/Dashboard';
import Learn from './components/Learn';


function App() {
  return (
    <Router>
      <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F1FBFF 100%)', minHeight: '100vh' }}>
        <div style={{ display: 'flex' }}>
         
          <Sidebar />

          <div style={{ flex: 1 }}>
      
            <Header />

            <main style={{  background: 'linear-gradient(180deg, #FFFFFF 0%, #F1FBFF 100%)', padding: '20px', minHeight: 'calc(100vh - 80px)' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/upskill" element={<Upskill />} />
                <Route path="/forum" element ={<Forum/>}/>
                <Route path="/contest" element ={<Contest/>}/>
                <Route path="/leaderboard" element ={<Leaderboard/>}/>

              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
