// Import necessary modules
const express = require('express'); // Express framework for routing and middleware
const mysql = require('mysql2'); // MySQL library for interacting with the database
const bcrypt = require('bcrypt'); // Library for hashing passwords securely
require('dotenv').config(); // Load environment variables from a .env file

const router = express.Router(); // Create an Express router to handle routes

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Database host (from environment variables)
    user: process.env.DB_USER, // Database user (from environment variables)
    password: process.env.DB_PASSWORD, // Database password (from environment variables)
    database: process.env.DB_NAME, // Database name (from environment variables)
    port: process.env.DB_PORT, // Database port (e.g., 8889 for MAMP MySQL)
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

router.post('/', async (req, res) => {
    const { firstName, surname, hospital_number, email, department_id, telephone_number, password, dob, profilePicture, appointment } = req.body;

    if (!password) {
        console.error("❌ Error: Password is missing from request body.");
        return res.status(400).json({ message: "Password is required" });
    }
    
    const formattedAppointment = appointment ? new Date(appointment).toISOString().split('T')[0] : null;


    try {
        console.log("🛠 Original Password Before Hashing:", password); // Log raw password

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Hashed Password Before Storing:", hashedPassword); // Log hashed password

        const query = `
            INSERT INTO users (firstName, surname, hospital_number, email, department_id, telephone_number, password, dob, profile_picture, appointment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [firstName, surname, hospital_number, email, department_id, telephone_number, hashedPassword, dob, profilePicture, formattedAppointment], (err, result) => {
            if (err) {
                console.error('❌ Error during registration:', err);
                return res.status(500).json({ message: 'Error during registration' });
            }
            res.status(201).json({ message: '✅ Registration successful!' });
        });
    } catch (error) {
        console.error('❌ Error hashing the password:', error);
        return res.status(500).json({ message: 'Error processing password' });
    }
});


// Export the router
module.exports = router; 
// Export the router to be used in the main application