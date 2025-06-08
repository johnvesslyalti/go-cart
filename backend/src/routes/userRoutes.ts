import express, { Router } from 'express';
import {login, register, viewUsers} from '../controllers/userController';
import { adminOnly, protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, adminOnly, viewUsers)

export default router;