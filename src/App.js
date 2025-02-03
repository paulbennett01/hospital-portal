import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On first load, check for token in localStorage
  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []); // Only run once on component mount

  return (
    <>
      <Router>
        <Navigation isLoggedIn={isLoggedIn} />
        <main>
          <Routes>
            {/* Pass setIsLoggedIn as a prop to the Login component */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            {/* Protect the dashboard route */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
