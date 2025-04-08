import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import '@fontsource/poppins';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { AuthProvider } from './context/AuthContext.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
