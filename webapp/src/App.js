import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import './App.css';

const App = () => {
  
  return (
    <Router>
      <div>
        <div>
          <ul className="nav-links">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
