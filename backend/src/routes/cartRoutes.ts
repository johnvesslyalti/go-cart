import express, { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { addToCart, getCart } from '../controllers/cartController';

const router: Router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);

export default router;