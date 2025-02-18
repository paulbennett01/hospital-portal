import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import departments data (Assuming it's stored locally in /assets/data)
import departments from './departments.json';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);


      // Find the department name using department_id
      const department = departments.find(dep => dep.id === Number(parsedUser.department_id));
      if (department) {
        setDepartmentName(department.name);
      }
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className='dashboard'>
        <div className='welcome-heading'>
          <div className='font-[sans-serif] my-4'>
            <div className='max-w-5xl max-lg:max-w-2xl mx-auto'>
              <div className='max-w-2xl mx-auto text-center'>
                <h2 className='text-gray-800 text-4xl font-extrabold'>
                  Welcome, {userData.FirstName} {userData.surname}!
                </h2>
                <p className='text-gray-600 text-sm mt-4 leading-relaxed'>
                  Welcome to your hospital portal! We're so happy you're here...
                </p>
              </div>
                <div className='personal-details-container'>
  <h4 className='personal-details-title'>Personal Details</h4>
  <div className='personal-details'>
    <p className='detail-item'><strong>Phone Number:</strong> {userData.telephone_number}</p>
    <p className='detail-item'><strong>Email Address:</strong> {userData.email}</p>
    <p className='detail-item'><strong>Date Of Birth:</strong> {userData.dob}</p>
  </div>
  <div className='medical-info-container'>
    <h5 className='medical-info-title'>Medical Info</h5>
    <p className='medical-info-item'><strong>Department:</strong> {departmentName || 'Unknown'}</p>
  </div>
</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
