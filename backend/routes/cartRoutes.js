import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import { protect } from '../context/authcontext.js';

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);

export default router;