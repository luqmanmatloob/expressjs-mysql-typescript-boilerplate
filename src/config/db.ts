import mysql, { Connection, QueryError } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Define connection configuration
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD as string, 
  database: 'testdb'
};

// Create MySQL connection
const connection: Connection = mysql.createConnection(connectionConfig);

// Connect to MySQL
connection.connect((err: QueryError | null) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Export the connection
export default connection;
