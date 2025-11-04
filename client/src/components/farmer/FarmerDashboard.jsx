import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext'; // 1. Import useAuth
import axios from 'axios'; // 2. Import axios
import ProductForm from './ProductForm';
import WeatherAlertDisplay from '../common/WeatherAlertDisplay'; // 1. Import

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth(); // 3. Get the logged-in user

  // 4. State for products
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 5. Function to fetch products
  const fetchMyProducts = async () => {
    try {
      const { data } = await axios.get('/api/products/myproducts');
      setMyProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // 6. Fetch products when the component loads
  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
      {/* 7. Greet the user! */}
      {user && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Hello, {user.name}!
        </h2>
      )}

      {/* 2. Add the alert display here */}
      <WeatherAlertDisplay />

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ... (Analytics boxes remain the same) ... */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Deals</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Products Listed</h2>
          {/* 8. Show real product count */}
          <p className="text-3xl font-bold mt-2">{myProducts.length}</p>
        </div>
      </div>

      {/* Product Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* 9. Pass the fetch function as a prop */}
          <ProductForm onProductListed={fetchMyProducts} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">My Listed Products</h2>
          {/* 10. Display the products */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && myProducts.length === 0 && (
            <p>You have not listed any products yet.</p>
          )}
          {myProducts.length > 0 && (
            <div className="space-y-4">
              {myProducts.map((product) => (
                <div key={product._id} className="border p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">{product.cropName}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity} kg</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;