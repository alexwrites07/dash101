import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Upskill from './Upskill';

// Import route components
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';


function App() {
  return (
    <Router>
      <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F1FBFF 100%)', minHeight: '100vh' }}>
        <div style={{ display: 'flex' }}>
          {/* Sidebar with specific background color */}
          <Sidebar />

          <div style={{ flex: 1 }}>
            {/* Header section */}
            <Header />

            {/* Main content area with specific background color */}
            <main style={{  background: 'linear-gradient(180deg, #FFFFFF 0%, #F1FBFF 100%)', padding: '20px', minHeight: 'calc(100vh - 80px)' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/upskill" element={<Upskill />} />

              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
