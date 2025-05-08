import express from 'express';
import { adminOnly, protect } from '../context/authcontext.js';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, adminOnly, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.put('/:id', protect, editProduct);

export default router;