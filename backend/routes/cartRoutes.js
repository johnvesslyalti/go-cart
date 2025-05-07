import express from 'express';
import cartController from '../controllers/cartController.js';
import { protect } from '../context/authcontext.js';

const router = express.Router();

router.post('/', protect, cartController);

export default router;