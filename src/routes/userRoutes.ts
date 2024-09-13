import express from 'express';
import { getAllUsers, createUser } from '../controllers/userControllers.js';

const router = express.Router();

// Route to get all users
// router.get('/', getAllUsers);





console.log("hello")



// Route to create a new user
router.post('/', createUser);







export default router;

