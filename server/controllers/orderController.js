import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create a new order (Buyer action)
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = new Order({
      buyer: req.user._id,
      farmer: product.farmer,
      product: product._id,
      productName: product.cropName,
      price: product.price,
      quantity,
      totalPrice: product.price * quantity,
      status: 'pending',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get orders for the logged-in farmer
// @route   GET /api/orders/farmer
export const getFarmerOrders = async (req, res) => {
  try {
    // Find orders where the farmer is the logged-in user
    const orders = await Order.find({ farmer: req.user._id })
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get orders for the logged-in buyer
// @route   GET /api/orders/buyer
export const getBuyerOrders = async (req, res) => {
  try {
    // Find orders where the buyer is the logged-in user
    const orders = await Order.find({ buyer: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an order status (Farmer action)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body; // 'completed' or 'rejected'

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if logged-in user is the farmer for this order
    if (order.farmer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    // In a real app, you would also decrease product quantity here
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};