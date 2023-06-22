import React,{useState,useEffect} from 'react';
import './Products.css';
import Product from './Product/Product';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/allProducts'); // Replace with your API endpoint
      const data = response.data;
      setProducts(data.data.products);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };
  return (
    <div className="products-container">
      {products.map((product) => (
        <Product product={product}/>
      ))}
    </div>
  );
};

export default Products;
