// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import './App.css'
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login';
import Cart from './pages/Cart.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import Checkout from './pages/Checkout.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
