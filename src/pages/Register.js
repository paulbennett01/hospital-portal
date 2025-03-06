import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to fetch available profile pictures
const getAvailableProfilePictures = () => {
  return [
    "bicycle.webp",
    "bmw-suv.webp",
    "bmw.webp",
    "cat.webp",
    "dog.webp",
    "ferrari.webp",
    "helicopter.webp",
    "horse.webp",
    "land-rover-suv.webp",
    "lion.webp",
    "motorcycle.webp",
    "plane.webp",
    "truck.webp"
  ]; // Manually list available images in 'src/images/profile-pictures'
};

const registerUser = async (userData, navigate) => {
  try {
    const response = await axios.post('http://localhost:5000/register', userData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    navigate('/login'); // Navigate to login after successful registration
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    alert('Error during registration. Please try again.');
  }
};

function Register() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    hospital_number: '',
    email: '',
    department_id: '',
    dob: '',
    telephone_number: '',
    password: '',
    confirm_password: '',
    profilePicture: '', // New state for profile picture selection
  });

  const [departments, setDepartments] = useState([]);
  const availableProfilePictures = getAvailableProfilePictures(); // Get list of images

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error.message);
        alert('Error fetching departments.');
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.profilePicture) {
      alert("Please select a profile picture.");
      return;
    }

    const { password, confirm_password, ...userData } = formData;
    
    if (Object.values(formData).some((value) => !value)) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    userData.password = password;
    await registerUser(userData, navigate);
  };

  
  
  
  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-12">
        <h4 className="text-white-600 text-base mt-6">
          Sign up to access the hospital portal
        </h4>
      </div>
      
      <div className="container-register">
        <form>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">First Name</label>
              <input
                name="firstName"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Surname</label>
              <input
                name="surname"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>

           {/* Profile Picture Selection Grid */}
<div>
  <label className="text-gray-600 text-sm mb-2 block">Profile Picture</label>
  <div className="grid grid-cols-4 gap-4">
    {getAvailableProfilePictures().map((pic) => (
      <div key={pic} className="flex flex-col items-center">
        {/* Clickable Profile Picture */}
        <img
          src={`/images/profile-pictures/${pic}`} // Ensure images are in 'public/images/profile-pictures'
          alt={pic}
          className={`w-16 h-16 rounded-full border cursor-pointer hover:opacity-80 ${
            formData.profilePicture === pic ? "ring-4 ring-blue-500" : ""
          }`}
          onClick={() => setFormData({ ...formData, profilePicture: pic })}
        />
      </div>
    ))}
  </div>

  {/* Show Selected Profile Picture */}
  {formData.profilePicture && (
    <div className="mt-4">
      <p className="text-gray-700 text-sm">Selected Picture:</p>
      <img
        src={`/images/profile-pictures/${formData.profilePicture}`}
        alt="Selected Profile Preview"
        className="w-16 h-16 rounded-full border mt-2"
      />
    </div>
  )}


            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Date of Birth</label>
            <input
              name="dob"
              type="date"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Hospital Number</label>
            <input
              name="hospital_number"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="EG: CHI25121900"
              value={formData.hospital_number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Department</label>
            <select
              name="department_id"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="text-gray-600 text-sm mb-2 block">Telephone No.</label>
            <input
              name="telephone_number"
              type="number"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
              value={formData.telephone_number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Confirm password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </div>
     

          <div className="button-wrapper">
            <button
              type="button"
              className="submit-register-button"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
