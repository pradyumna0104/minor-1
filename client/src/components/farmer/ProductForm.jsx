import React, { useState } from 'react';
import axios from 'axios'; // 1. Import axios

// 2. Accept a new prop 'onProductListed'
const ProductForm = ({ onProductListed }) => {
  const [cropName, setCropName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');

  // 3. Add loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 4. This is the API call to your backend
      const productData = { cropName, description, price, quantity, photo };
      await axios.post('/api/products', productData);

      // 5. Clear the form
      setCropName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setPhoto('');
      
      // 6. Call the prop to tell the dashboard to refresh its list
      onProductListed();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">List a New Product</h3>
      {/* 7. Show error message if it exists */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      {/* ... (all your form inputs remain the same) ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cropName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Crop Name
          </label>
          <input
            type="text"
            id="cropName"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price (per unit, e.g., kg)
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
        <div>
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quantity (e.g., kg)
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="photo"
            className="block text-gray-700 font-semibold mb-2"
          >
            Photo URL
          </label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-slack-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        disabled={loading} // 8. Disable button while loading
      >
        {loading ? 'Listing...' : 'List Product'}
      </button>
    </form>
  );
};

export default ProductForm;