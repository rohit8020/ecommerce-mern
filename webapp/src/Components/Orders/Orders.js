import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders'); // Replace '/api/orders' with your actual API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
