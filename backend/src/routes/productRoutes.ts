import express, { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from '../controllers/productController';
import { adminOnly, protect } from '../middleware/authMiddleware';
import { upload } from '../utils/multer';

const router: Router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.put('/:id', protect, editProduct);

export default router;