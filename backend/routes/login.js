// Import necessary modules
const express = require('express'); // Express framework for routing and middleware
const mysql = require('mysql2'); // MySQL library for connecting to the database
const bcrypt = require('bcrypt'); // Library for hashing and comparing passwords
const fs = require('fs'); // File system module for reading files
const path = require('path'); // Module for working with file and directory paths
require('dotenv').config(); // Load environment variables from a .env file

const router = express.Router(); // Create a new Express router for handling routes

// Load departments.json
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'json', 'departments.json'), 'utf-8')
); 
// Synchronously read and parse the contents of departments.json file into a JavaScript object

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host from environment variables
  user: process.env.DB_USER, // Database user from environment variables
  password: process.env.DB_PASSWORD, // Database password from environment variables
  database: process.env.DB_NAME, // Database name from environment variables
  port: process.env.DB_PORT, // Database port from environment variables
});

// Test the connection to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err); 
    // Log an error if the connection fails
  } else {
    console.log('Connected to the MySQL database.'); 
    // Log success if the connection is established
  }
});

// Log in route
router.post('/', (req, res) => {
  const { hospital_number, password } = req.body;

  console.log("Request Body:", req.body);  // Log the data sent by frontend

  const query = 'SELECT * FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      console.log('No user found for hospital_number:', hospital_number);  // Log if no user found
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    console.log("User data from database:", user);  // Log user data from the database

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);  // Log if password matched

    if (isMatch) {
      const department = departments.find((dept) => dept.id === Number(user.department_id)) || { name: 'Unknown', details: 'No details available' };
      console.log("Department data:", department);  // Log the department data

      // Remove the password from the user object for security
      const { password, ...userWithoutPassword } = user;

      const responseData = { ...userWithoutPassword, ...department };

      console.log('Response Data:', responseData);  // Log the response data

      if (isMatch) {
        console.log("Sending successful response");
      return res.status(200).json({
        message: 'Login successful',
        user: responseData,
      });
    } else {
      console.log('Password mismatch for user:', hospital_number);  // Log if password does not match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  });
});


// Export the router
module.exports = router; 
// Export the router to be used in the main application