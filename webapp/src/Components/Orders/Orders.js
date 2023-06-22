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
      const response = await axios.get('http://localhost:8080/order/allOrders',{
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkzMmE0YTkxNzc2MWI1MzY2NTYyY2EiLCJ1c2VybmFtZSI6InJvaGl0ODAyMCIsImlhdCI6MTY4NzQ0MTE0MX0.Sa0FQI8OUdo6IMUHcYYwF9UV1Nqsvae7WgIml0lmHt8'
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
              <li key={product.productId}>
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
