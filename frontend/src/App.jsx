// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import './App.css'
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import OrderSuccess from './pages/OrderSuccess.jsx';
import { useRef } from 'react';
import Contact from './pages/Contact.jsx';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  );
}

export default App;
