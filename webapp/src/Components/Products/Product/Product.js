import React, { useState } from 'react'
import axios from 'axios';
import './Product.css'

function Product({ product }) {
    const [quantity, setquantity] = useState(1);
    const handleChange = (e) => {
        let value = e.target.value
        if(value>=1 && value<=4)
        setquantity(e.target.value);
    };

    const token=localStorage.getItem('token');

    const addToCart = async (productId, quantity) => {
        try {
            console.log(productId, quantity);
            const response = await axios.post(
                'http://localhost:8080/cart/addItem',
                { productId, quantity },
                {
                    headers: {
                        Authorization: 'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            window.alert("Item Added to the Cart!");
            console.log(response.data); // Optional: Handle the response from the backend
        } catch (error) {
            console.log('Error adding item to cart:', error);
        }
    };
    return (

        <div className="product-card" key={product._id}>
            <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-info">
                <span className="product-price">${product.price}</span>
                <span className="product-stock">Stock: {product.stock}</span>
                <span className="product-brand">Brand: {product.brand}</span>
            </div>
            <div className="product-rating">Rating: {product.rating}</div>
            <button style={{ marginTop: "20px" }} onClick={() => addToCart(product._id, quantity)}>Add to Cart</button>
            <input type="number" id="quantity" name="quantity" min={1} max={4} value={quantity} onChange={handleChange} />
        </div>
    )
}

export default Product