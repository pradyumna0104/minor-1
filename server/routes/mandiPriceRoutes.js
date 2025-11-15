import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMandiPrices } from '../controllers/mandiPriceController.js';

const router = express.Router();

// Route for all users to get prices
router.get('/mandi', protect, getMandiPrices);

export default router;