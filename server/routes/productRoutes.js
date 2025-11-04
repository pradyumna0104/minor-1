import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createProduct,
  getProducts,
  getMyProducts, // 1. Import getMyProducts
} from '../controllers/productController.js';
import { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, createProduct);

// 2. Add this new route
router.get('/myproducts', protect, getMyProducts);

export default router;