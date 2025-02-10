import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Slideshow from './components/Slideshow'; // Import the Slideshow component
import Home from './pages/Home';  // Assuming you have a Home component


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On first load, check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []); // Only run once on component mount

  // Handle logout functionality
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the state to reflect logout
  };

  return (
    <>
      <Router>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/slideshow" element={isLoggedIn ? <Slideshow /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />  {/* Redirect to /home */}
           <Route path="/home" element={<Home />} />
            <Route path="*" element={<App />} />  {/* Default route */}
          </Routes>
        </main>
      </Router> 
  
    </>
    
   
  );
}

export default App;
