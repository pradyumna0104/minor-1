import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('farmer', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  // A check to ensure only farmers can list
  if (req.user.role !== 'farmer') {
    return res
      .status(401)
      .json({ message: 'Not authorized. Only farmers can list products.' });
  }

  const { cropName, description, price, quantity, photo } = req.body;

  try {
    const product = new Product({
      farmer: req.user._id,
      cropName,
      description,
      price,
      quantity,
      photo,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged in user's products
// @route   GET /api/products/myproducts
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};