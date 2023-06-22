import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import './App.css';
import Auth from './Components/Auth/Auth';

const App = () => {
  let token=localStorage.getItem('token');
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
            <li>
              {(token)?<Link to="/" onClick={()=>{localStorage.removeItem('token');window.location.reload()}}>Logout</Link>:<Link to="/auth">Login/Signup</Link>}
            </li>
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/cart" element={(token)?<Cart/>:<Auth/>} />
            <Route path="/orders" element={(token)?<Orders/>:<Auth/>} />
            <Route path="/auth" element={<Auth/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
