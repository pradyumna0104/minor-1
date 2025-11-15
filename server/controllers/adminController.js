import WeatherAlert from '../models/WeatherAlert.js';
import MandiPrice from '../models/MandiPrice.js';
import User from '../models/User.js'; // 1. Import the User model

// @desc    Create a weather alert
// @route   POST /api/admin/weather-alert
export const createWeatherAlert = async (req, res) => {
  const { title, message } = req.body;

  try {
    const alert = new WeatherAlert({
      title,
      message,
      createdBy: req.user._id,
    });

    const createdAlert = await alert.save();
    res.status(201).json(createdAlert);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Set or update a mandi price
// @route   POST /api/admin/mandi-price
export const setMandiPrice = async (req, res) => {
  const { productName, price, trend } = req.body;

  try {
    // Find if it exists
    let mandiProduct = await MandiPrice.findOne({ productName });

    if (mandiProduct) {
      // Update existing
      mandiProduct.price = price;
      mandiProduct.trend = trend;
      mandiProduct.priceHistory.push({ price });
      const updatedProduct = await mandiProduct.save();
      res.status(200).json(updatedProduct);
    } else {
      // Create new
      const newMandiProduct = new MandiPrice({
        productName,
        price,
        trend,
        priceHistory: [{ price }],
      });
      const createdProduct = await newMandiProduct.save();
      res.status(201).json(createdProduct);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ... (keep createWeatherAlert and setMandiPrice)

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};