import React from 'react';
import axios from 'axios';

const OrderManagement = ({ orders, onUpdateOrder }) => {
  
  const handleUpdate = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
      onUpdateOrder(); // Tell dashboard to refetch
    } catch (err) {
      console.error('Failed to update order');
    }
  };

  const pendingOrders = orders.filter((order) => order.status === 'pending');

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
      {pendingOrders.length === 0 && <p>You have no pending orders.</p>}
      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{order.productName}</h3>
            <p>Buyer: {order.buyer.name} ({order.buyer.email})</p>
            <p>Quantity: {order.quantity} kg</p>
            <p>Total Price: ${order.totalPrice}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleUpdate(order._id, 'completed')}
                className="bg-green-500 text-white px-4 py-1 rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdate(order._id, 'rejected')}
                className="bg-red-500 text-white px-4 py-1 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;