import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import Homepage from '@/pages/Homepage';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Events from '@/pages/Events';
import Connect from '@/pages/Connect';
import Donate from '@/pages/Donate';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Profile from '@/pages/Profile';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/events"
            element={currentUser ? <Events user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/connect"
            element={currentUser ? <Connect user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/donate"
            element={currentUser ? <Donate user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={currentUser ? <About user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={currentUser ? <Contact user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={currentUser ? <Profile user={currentUser} onLogout={handleLogout} setUser={setCurrentUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;