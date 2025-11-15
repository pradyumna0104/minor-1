import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import WeatherAlertDisplay from '../common/WeatherAlertDisplay';
import MandiPriceDisplay from '../common/MandiPriceDisplay';
import ProductForm from './ProductForm';
import OrderManagement from './OrderManagement'; // 1. Import new component

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  
  // 3. States for analytics
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);
  
  const [loading, setLoading] = useState(true);
  
  // 4. Combined fetch function
  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      // Use Promise.all to fetch products and orders simultaneously
      const [productsRes, ordersRes] = await Promise.all([
        axios.get('/api/products/myproducts'),
        axios.get('/api/orders/farmer')
      ]);
      
      setMyProducts(productsRes.data);
      setMyOrders(ordersRes.data);
      
      // 5. Calculate analytics from orders
      const completedOrders = ordersRes.data.filter(
        (order) => order.status === 'completed'
      );
      
      const revenue = completedOrders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );
      
      setTotalRevenue(revenue);
      setTotalDeals(completedOrders.length);
      
    } catch (err) {
      console.error('Failed to fetch farmer data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
      {user && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Hello, {user.name}!
        </h2>
      )}

      <WeatherAlertDisplay />
      <MandiPriceDisplay />

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          {/* 6. Show real data */}
          <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Deals</h2>
          {/* 7. Show real data */}
          <p className="text-3xl font-bold mt-2">{totalDeals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Products Listed</h2>
          <p className="text-3xl font-bold mt-2">{myProducts.length}</p>
        </div>
      </div>

      {/* Product & Order Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 8. Add OrderManagement component */}
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <OrderManagement
            orders={myOrders}
            onUpdateOrder={fetchFarmerData} // Pass the refetch function
          />
        )}
        
        {/* Product Form */}
        <div>
          <ProductForm onProductListed={fetchFarmerData} />
        </div>
        
        {/* My Listed Products */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">My Listed Products</h2>
          {/* ... (Your existing code to list products) ... */}
          {myProducts.length > 0 ? (
            <div className="space-y-4">
              {myProducts.map((product) => (
                <div key={product._id} className="border p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">{product.cropName}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity} kg</p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not listed any products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;