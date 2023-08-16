import express from 'express';
import { getAllUsers, getUserDetails, login, logout, postNewUser } from '../controller/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all',getAllUsers)

router.get('/me',isAuthenticated,getUserDetails)

router.post('/new',postNewUser)

router.post('/login',login)

router.get('/logout',logout)

export default router;