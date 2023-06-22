import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token=localStorage.getItem('token');
  useEffect(() => {
    fetchOrders(token);
  }, [token]);

  const fetchOrders = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/order/allOrders',{
        headers: {
            Authorization: 'Bearer '+token
        },
    });
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="orders-container">
      {(orders.length)?<h1>Orders</h1>:<h1>No Orders yet!</h1>}
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Created At: {order.createdAt}</p>
          <h4>Products:</h4>
          <ul>
            {order.products.map((product) => (
              <li key={product.productId+Math.random().toString()}>
                Product ID: {product.productId}, Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
