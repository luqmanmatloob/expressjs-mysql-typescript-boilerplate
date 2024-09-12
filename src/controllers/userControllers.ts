import { Request, Response } from 'express';
import connection from '../config/db.js';

// Controller to get all users
export const getAllUsers = (req: Request, res: Response): void => {
  connection.query('SELECT * FROM users', (err: Error | null, results: any) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
};

// Controller to create a new user
export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).send('Name and email are required');
    return;
  }

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = [name, email];

  connection.query(query, values, (err: Error | null) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).send('Error inserting data into the database');
      return;
    }
    res.status(201).send('User created successfully');
  });
};
