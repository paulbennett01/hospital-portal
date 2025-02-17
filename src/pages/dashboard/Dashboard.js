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
        <div className='flex flex-col flex-wrap items-center justify-evenly'>
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
              <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-8 justify-center mt-12'>
                <div className='border rounded-md overflow-hidden max-md:max-w-[300px]'>
                  <Link to='/account'>
                    <img src='/assets/images/account.png' className='w-full h-60 object-contain object-top bg-gray-200' />
                  </Link>
                  <div className='p-4'>
                    <h4 className='text-gray-800 text-base font-bold'>{userData.FirstName}'s Details</h4>
                    <div className='mt-4'>
                      <p className='text-gray-600 text-sm'><strong>Phone Number:</strong> {userData.telephone_number}</p>
                      <p className='text-gray-600 text-sm'><strong>Email Address:</strong> {userData.email}</p>
                      <p className='text-gray-600 text-sm'><strong>Date Of Birth:</strong> {userData.dob}</p>
                    </div>
                    <div className='mt-4'>
                      <h5 className='text-gray-800 text-lg font-bold'>Medical Info</h5>
                      <p className='text-gray-600 text-sm'><strong>Department:</strong> {departmentName || 'Unknown'}</p>
                    </div>
                  </div>
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
