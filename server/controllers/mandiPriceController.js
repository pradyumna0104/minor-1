import MandiPrice from '../models/MandiPrice.js';

// @desc    Get all mandi prices
// @route   GET /api/prices/mandi
// @access  Private (all logged-in users)
export const getMandiPrices = async (req, res) => {
  try {
    const prices = await MandiPrice.find({}).sort({ productName: 1 });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};