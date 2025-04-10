// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth();
  const hasFetchedCart = useRef(false);

  const fetchCart = async (userId) => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { 'x-auth-token': token }
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user || !token) {
      alert('Please log in to add items to your cart.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: user._id,
        productId: product._id,
        quantity: quantity 
      }, {
        headers: { 'x-auth-token': token }
      });
  
      fetchCart(user._id); // Refresh cart after adding
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };
  

  const removeFromCart = async (productId) => {
    if (!user || !token) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${user._id}/${productId}`, {
        headers: { 'x-auth-token': token }
      });
      fetchCart(user._id); // Manual refresh
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // Only fetch cart ONCE when user/token become available
  useEffect(() => {
    if (user?._id && token && !hasFetchedCart.current) {
      fetchCart(user._id);
      hasFetchedCart.current = true;
    }
  }, [user?._id, token]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
