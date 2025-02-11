import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';



function Login({ setIsLoggedIn }) { // setIsLoggedIn comes from props here
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with:", hospitalNumber, password);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        hospital_number: hospitalNumber,
        password: password,
      });

      console.log("Response Status:", response.status); // Should be 200 if successful
      console.log("Response Data:", response.data); // Should contain the user object

      if (response.status === 200) {
        console.log("Login successful. Storing user data.");
        const { user } = response.data;

        // Store the logged-in user's data in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Update isLoggedIn state
        setIsLoggedIn(true); // This should now work as it's passed properly

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Handle any unexpected status codes
        console.error("Unexpected response status:", response.status);
        setError('An unexpected error occurred. Please try again later.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response) {
        // If we have a response from the backend
        console.error('Error response status:', err.response.status);
        console.error('Error response data:', err.response.data);
      } else if (err.request) {
        // If request was made but no response received
        console.error('No response received:', err.request);
      } else {
        // Any other error
        console.error('Error message:', err.message);
      }
      setError('An error occurred. Please try again later.');
    }
  };

  return (  
  <div className="login">
    <div className="login2">
    
        <div className="loginarea1">
          <a href="javascript:void(0)">
         
          </a>
          <div className="login3">
            <h2 className="signintext">Sign in</h2>
            <form className="hospitalnumber" onSubmit={handleSubmit}>
              <label className="inputhospitalnumber">
                Hospital Number
                <input
                  type="text"
                  value={hospitalNumber}
                  onChange={(e) => setHospitalNumber(e.target.value)}
                  className="hospitalnumberbox"
                  required
                />
              </label>
              <label className="password">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="passwordbox"
                  required
                />
              </label>
              {error && <div>{error}</div>}
              <button type="submit" className='loginbutton'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
