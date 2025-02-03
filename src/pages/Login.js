import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="text-gray-800 text-sm mb-2 block">
                Hospital Number
                <input
                  type="text"
                  value={hospitalNumber}
                  onChange={(e) => setHospitalNumber(e.target.value)}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  required
                />
              </label>
              <label className="text-gray-800 text-sm mb-2 block">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  required
                />
              </label>
              {error && <div>{error}</div>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
