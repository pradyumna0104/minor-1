import React, { useState } from 'react';
import axios from 'axios';

const MandiPriceForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [trend, setTrend] = useState('stable');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data } = await axios.post('/api/admin/mandi-price', {
        productName,
        price,
        trend,
      });
      setMessage(`Price for ${data.productName} updated to $${data.price}!`);
      // Clear form
      setProductName('');
      setPrice('');
      setTrend('stable');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Set Mandi Prices</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <div className="mb-4">
        <label htmlFor="productName" className="block font-semibold mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="trend" className="block font-semibold mb-2">
          Price Trend
        </label>
        <select
          id="trend"
          value={trend}
          onChange={(e) => setTrend(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="stable">Stable</option>
          <option value="upward">Upward</option>
          <option value="downward">Downward</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-slack-primary text-white py-2 rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Set Price'}
      </button>
    </form>
  );
};

export default MandiPriceForm;