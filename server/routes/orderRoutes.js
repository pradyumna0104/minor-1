import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getFarmerOrders,
  getBuyerOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder); // Buyer creates order
router.get('/farmer', protect, getFarmerOrders); // Farmer gets their orders
router.get('/buyer', protect, getBuyerOrders); // Buyer gets their orders
router.put('/:id/status', protect, updateOrderStatus); // Farmer updates status

export default router;