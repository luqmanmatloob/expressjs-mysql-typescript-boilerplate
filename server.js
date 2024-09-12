// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();  
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: process.env.DB_PASSWORD,
  database: 'testdb' 
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  // Create the users table if it does not exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )
  `;
  
  connection.query(createTableQuery, err => {
    if (err) {
      console.error('Error creating the table:', err);
      return;
    }
    console.log('Users table is ready');
  });
});

// Define a route to get users
app.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

// Define a route to create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = [name, email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).send('Error inserting data into the database');
    }
    res.status(201).send('User created successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
