import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import departments from './departments.json';

const Dashboard = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);

      // Find department info
      const department = departments.find(dep => dep.id === Number(parsedUser.department_id));
      if (department) {
        setDepartmentInfo(department);
      }
    }
  }, []);

  const handleSignOut = () => {
    handleLogout();
    navigate('/login');
  };

  // Check if user data is loaded
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Calculate the user's age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const userAge = calculateAge(userData.dob);

  const formattedDOB = new Date(userData.dob).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="dashboard">
      <div className="welcome-heading">
    <div className="font-[sans-serif] my-4">
          <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="welcome-dashboard">
                Welcome {userData.FirstName} {userData.surname}! You are: {userAge} years old.
              </h2>
            </div>

            <div className="personal-details-container">
              <h4 className="personal-details-title">Personal Details</h4>
              <div className="personal-details">
                  {/* Display Profile Picture */}
  {userData.profile_picture && (
    <div className="profile-picture-container">
      <img
        src={`/images/profile-pictures/${userData.profile_picture}`} // Ensure images are in 'public/images/profile-pictures/'
        alt="User Profile"
        className="profile-picture"
      />
    </div>
  )}
                <p className="detail-item"><strong>Full Name:</strong> {userData.FirstName} {userData.surname}</p>
                <p className="detail-item"><strong>Phone Number:</strong> {userData.telephone_number}</p>
                <p className="detail-item"><strong>Email Address:</strong> {userData.email}</p>
                <p className="detail-item"><strong>Date Of Birth:</strong> {formattedDOB}</p>
                <p className="detail-item"><strong>Age:</strong> {userAge}</p>
                {/* Display Profile Picture */}
{userData.profilePicture && (
  <div className="profile-picture-container">
    <p className="text-gray-700 text-sm"><strong>Profile Picture:</strong></p>
    <img
      src={`/images/profile-pictures/${userData.profilePicture}`} // Ensure images are in 'public/images/profile-pictures/'
      alt="User Profile"
      className="w-24 h-24 rounded-full border mt-2"
    />
  </div>
)}
              </div>

              <div className="medical-info-container">
                <h5 className="medical-info-title">Medical Info</h5>
                <p className="medical-info-item"><strong>You are coming to:</strong> {departmentInfo ? departmentInfo.name : 'Unknown'}</p>

                {/* Department Details Section */}
                {departmentInfo && (
                  <div className="">
                    {/* Doctor Info */}
                    <p className="medical-info-item"><strong>Doctor:</strong> {departmentInfo.doctor}</p>

                    {/* Nurse Info */}
                    <p className="medical-info-item"><strong>Nurse:</strong> {departmentInfo.nurse}</p>
                    <p className="medical-info-item"><strong>About This Department:</strong></p>
                    <p className='department-info'>{departmentInfo.details}</p>
                  </div>
                )}

                {/* Sign Out Button */}
                <button 
                  onClick={handleSignOut} 
                  className="signout-button-dashboard"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
