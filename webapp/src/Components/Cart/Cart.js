import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart/cartItems', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkzMmE0YTkxNzc2MWI1MzY2NTYyY2EiLCJ1c2VybmFtZSI6InJvaGl0ODAyMCIsImlhdCI6MTY4NzQ0MTE0MX0.Sa0FQI8OUdo6IMUHcYYwF9UV1Nqsvae7WgIml0lmHt8',
          'Content-Type': 'application/json',
        },
      }); // Replace with your API endpoint
      const data = response.data;
      setCartItems(data.data);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const totalAmount = cartItems.reduce((acc, cartitem) => {
    return acc + (cartitem.price * cartitem.quantity)
  }, 0)

  const products=cartItems.map((cartitem) =>({productId:cartitem.productId,quantity:cartitem.quantity}))
  
  const placeOrder = async () => {
    const response = await axios.post('http://localhost:8080/order/placeOrder', {
        products,
        totalAmount,
      },
      {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkzMmE0YTkxNzc2MWI1MzY2NTYyY2EiLCJ1c2VybmFtZSI6InJvaGl0ODAyMCIsImlhdCI6MTY4NzQ0MTE0MX0.Sa0FQI8OUdo6IMUHcYYwF9UV1Nqsvae7WgIml0lmHt8',
            'Content-Type': 'application/json',
        },
    });

    console.log(response)
  }

  return (
    <div className="cart-items-container">
      <h2>Cart Items</h2>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.productId}>
          <h3 className="item-name">Title : {item.name}</h3>
          <p className="item-quantity">Quantity: {item.quantity}</p>
          <p className="item-price">Price: ${item.price}</p>
          <p className="item-total">Total: ${item.quantity * item.price}</p>
        </div>
      ))}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
