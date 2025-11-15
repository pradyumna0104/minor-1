import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/buyer');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch buyer orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">My Purchase History</h2>
      {loading && <p>Loading order history...</p>}
      {!loading && orders.length === 0 && <p>You have no past orders.</p>}
      {!loading && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{order.productName}</h3>
                <p>Quantity: {order.quantity} kg</p>
                <p>Total: ${order.totalPrice}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;