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

  // Calculate days until the user's next birthday
  const calculateDaysUntilBirthday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Set the next birthday's date (month/day stays the same, year might change)
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // If the birthday this year has passed, use the next year
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate the difference in time (milliseconds) and convert to days
    const timeDiff = nextBirthday - today;
    const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysUntilBirthday;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Adjust age if the birthday hasn't happened yet this year
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const daysUntilBirthday = calculateDaysUntilBirthday(userData.dob);
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
              <h2 className="text-gray-800 text-4xl font-extrabold">
                Welcome, {userData.FirstName} {userData.surname}!
                You are: {userAge} years old.
              </h2>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Welcome to your hospital portal! We're so happy you're here...
              </p>
            </div>

            <div className="personal-details-container">
              <h4 className="personal-details-title">Personal Details</h4>
              <div className="personal-details">
                <p className="detail-item"><strong>Phone Number:</strong> {userData.telephone_number}</p>
                <p className="detail-item"><strong>Email Address:</strong> {userData.email}</p>
                <p className="detail-item"><strong>Date Of Birth:</strong> {formattedDOB}</p>
                <p className="detail-item"><strong>Age:</strong> {userAge}</p>
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
                    <p className="medical-info-item"><strong>About:</strong> {departmentInfo.details}</p>
                  </div>
                )}

                {/* Sign Out Button */}
                <button 
                  onClick={handleSignOut} 
                  className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
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
