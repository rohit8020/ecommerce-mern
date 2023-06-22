import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const token=localStorage.getItem('token');
  useEffect(() => {
    fetchCartItems(token);
  }, [token]);

  const fetchCartItems = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/cart/cartItems', {
        headers: {
          Authorization: 'Bearer '+token,
          'Content-Type': 'application/json',
        },
      }); // Replace with your API endpoint
      const data = response.data;
      setCartItems(data.data);
      console.log(data.data);
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
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json',
        },
    });

    console.log(response)
    window.location.href = '/orders'
  }

  return (
    <div className="cart-items-container">
      {(cartItems.length)?(<h2>Cart Items</h2>):null}
      {cartItems.map((item) => (
        <div className="cart-item" key={item.cartItemId}>
          <h3 className="item-name">Title : {item.name}</h3>
          <p className="item-quantity">Quantity: {item.quantity}</p>
          <p className="item-price">Price: ${item.price}</p>
          <p className="item-total">Total: ${item.quantity * item.price}</p>
        </div>
      ))}
      {(cartItems.length)?(<button onClick={placeOrder}>Place Order</button>):(<h2>Cart is Empty!</h2>)}
    </div>
  );
};

export default Cart;
