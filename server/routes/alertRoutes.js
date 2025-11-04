import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getWeatherAlerts } from '../controllers/alertController.js';

const router = express.Router();

router.get('/weather', protect, getWeatherAlerts);

export default router;