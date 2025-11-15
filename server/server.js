import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import alertRoutes from './routes/alertRoutes.js'; // 1. Import
import mandiPriceRoutes from './routes/mandiPriceRoutes.js'; // 1. Import
import orderRoutes from './routes/orderRoutes.js'; // 1. Import

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/alerts', alertRoutes); // 2. Add this line
app.use('/api/prices', mandiPriceRoutes); // 2. Add this line
app.use('/api/orders', orderRoutes); // 2. Add this line

// Simple root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));