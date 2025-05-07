import express from 'express';
import {login, register, viewUsers} from '../controllers/userController.js';
import { adminOnly, protect } from '../context/authcontext.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, adminOnly, viewUsers)

export default router;