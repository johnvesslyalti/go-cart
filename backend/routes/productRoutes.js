import express from 'express';
import { adminOnly, protect } from '../context/authcontext.js';
import { createProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, adminOnly, createProduct);
router.get('/', getProducts);

export default router;