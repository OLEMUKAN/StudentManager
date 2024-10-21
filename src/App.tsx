import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Attendance } from './components/Attendance';
import { Announcements } from './components/Announcements';
import { Schedule } from './components/Schedule';
import { FileSharing } from './components/FileSharing';
import { Auth } from './components/Auth';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 text-white">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/files">File Sharing</Link></li>
            <li><button onClick={() => setToken(null)} className="text-white">Logout</button></li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/files" element={<FileSharing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;