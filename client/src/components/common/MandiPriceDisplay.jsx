import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa'; // Import icons

const MandiPriceDisplay = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get('/api/prices/mandi');
        setPrices(data);
      } catch (err) {
        console.error('Failed to fetch mandi prices');
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === 'upward') {
      return <FaArrowUp className="text-green-500" />;
    }
    if (trend === 'downward') {
      return <FaArrowDown className="text-red-500" />;
    }
    return <FaMinus className="text-gray-500" />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Live Mandi Prices</h2>
      {loading && <p>Loading prices...</p>}
      {!loading && prices.length === 0 && (
        <p>No mandi prices have been set by the admin yet.</p>
      )}
      {!loading && prices.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prices.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg">{item.productName}</h3>
              <p className="text-2xl font-semibold">${item.price}</p>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                {getTrendIcon(item.trend)}
                <span>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MandiPriceDisplay;