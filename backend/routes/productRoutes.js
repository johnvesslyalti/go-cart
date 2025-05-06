import express from 'express';
import { adminOnly, protect } from '../context/authcontext.js';
import { createProduct, getProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, adminOnly, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;