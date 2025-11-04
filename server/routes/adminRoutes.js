import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createWeatherAlert,
  setMandiPrice,
  getAllUsers,
} from '../controllers/adminController.js';

const router = express.Router();

// @desc    Create a weather alert
// @route   POST /api/admin/weather-alert
// @access  Private/Admin
router.post('/weather-alert', protect, admin, createWeatherAlert);

// @desc    Set/Update a mandi price
// @route   POST /api/admin/mandi-price
// @access  Private/Admin
router.post('/mandi-price', protect, admin, setMandiPrice);

// 2. Add this new route
router.get('/users', protect, admin, getAllUsers);

export default router;