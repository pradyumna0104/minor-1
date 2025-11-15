import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import WeatherAlertDisplay from '../common/WeatherAlertDisplay';
import MandiPriceDisplay from '../common/MandiPriceDisplay';
import MyOrders from './MyOrders'; // 1. Import new component

const BuyerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 2. State for purchase request message
  const [purchaseMessage, setPurchaseMessage] = useState('');

  useEffect(() => {
    // ... (fetchProducts function remains the same) ...
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 3. Function to handle the purchase request
  const handlePurchaseRequest = async (product) => {
    setPurchaseMessage('Sending request...');
    try {
      await axios.post('/api/orders', {
        productId: product._id,
        quantity: product.quantity, // Sending the full quantity
      });
      setPurchaseMessage('Purchase request sent successfully!');
      // Hide message after 3 seconds
      setTimeout(() => setPurchaseMessage(''), 3000);
    } catch (err) {
      setPurchaseMessage('Failed to send request.');
      setTimeout(() => setPurchaseMessage(''), 3000);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
      {user && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Welcome, {user.name}!
        </h2>
      )}

      {/* 4. Display the purchase message */}
      {purchaseMessage && (
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
          {purchaseMessage}
        </div>
      )}

      <WeatherAlertDisplay />
      <MandiPriceDisplay />

      {/* 5. Add "My Orders" section */}
      <MyOrders />

      {/* Browse Products Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Browse Products</h2>
        {/* ... (product loading/error/empty messages) ... */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* ... (product image) ... */}
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.cropName}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                {/* ... (product details) ... */}
                <div className="p-4 flex-grow">
                  <h3 className="text-2xl font-bold text-slack-primary">{product.cropName}</h3>
                  <p className="text-lg font-semibold">${product.price} / kg</p>
                  <p className="text-gray-600">{product.quantity} kg available</p>
                  <p className="mt-2 text-gray-700">{product.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Seller: <strong>{product.farmer.name}</strong>
                  </p>
                </div>
                
                {/* 6. Update button to call handlePurchaseRequest */}
                <button
                  onClick={() => handlePurchaseRequest(product)}
                  className="w-full bg-slack-accent text-white p-3 font-bold hover:bg-opacity-90"
                >
                  Request to Purchase
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;