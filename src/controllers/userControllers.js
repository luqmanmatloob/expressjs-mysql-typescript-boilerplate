import connection from '../config/db.js';

// Controller to get all users
export const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error querying the database');
    }
    res.json(results);
  });
};

// Controller to create a new user
export const createUser = (req, res) => {
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
};
