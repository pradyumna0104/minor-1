import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext'; // To greet the user
import axios from 'axios'; // To fetch data
import WeatherAlertDisplay from '../common/WeatherAlertDisplay'; // 1. Import

const BuyerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth(); // Get the logged-in buyer

  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // This is the public endpoint to get ALL products
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array ensures this runs only once

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
      {/* Greet the user */}
      {user && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Welcome, {user.name}!
        </h2>
      )}

      {/* 2. Add the alert display here */}
      <WeatherAlertDisplay />

      {/* Mandi Prices (as per your requirements) */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Mandi Price Trends</h2>
        {/* Add PriceTrendGraph component here */}
        <p>Price trend graphs will be displayed here.</p>
      </div>

      {/* Browse Products Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Browse Products</h2>
        
        {loading && <p>Loading available products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && products.length === 0 && (
          <p>No products are listed for sale at the moment.</p>
        )}

        {/* Display products in a grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* Product Image */}
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
                
                {/* Product Details */}
                <div className="p-4 flex-grow">
                  <h3 className="text-2xl font-bold text-slack-primary">{product.cropName}</h3>
                  <p className="text-lg font-semibold">${product.price} / kg</p>
                  <p className="text-gray-600">{product.quantity} kg available</p>
                  <p className="mt-2 text-gray-700">{product.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Seller: <strong>{product.farmer.name}</strong>
                  </p>
                </div>
                
                {/* Contact Farmer Button (as per your requirements) */}
                <button className="w-full bg-slack-accent text-white p-3 font-bold hover:bg-opacity-90">
                  Contact Farmer
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