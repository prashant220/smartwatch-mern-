// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

export default function Cart() {
  const { user, token } = useAuth();
  const { removeFromCart, fetchCart } = useCart();
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`, {
          headers: { "x-auth-token": token },
        });
        setCart(res.data);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    if (user && token) fetchCart();
  }, [user, token]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId); 
      await fetchCart(user._id);  
      window.location.reload();     
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    const item = cart.items.find(item => item.product?._id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) return handleRemove(productId);

    try {
      const res = await axios.post('http://localhost:5000/api/cart/add', {
        userId: user._id,
        productId,
        quantity: newQty
      }, {
        headers: { 'x-auth-token': token }
      });
      setCart(res.data);
    } catch (err) {
      console.error('Quantity update error:', err.response?.data || err.message);
    }
  };

  const getTotal = () => {
    return cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4 fw-bold">Your Basket</h3>
      <Row>
        <Col md={8}>
          {cart.items.map((item) => (
            <Card key={item.product._id} className="mb-4 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <img src={item.product.image} alt={item.product.name} style={{ width: '120px', height: 'auto' }} className="me-3 rounded" />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold mb-1">{item.product.name}</h5>
                      <small className="text-muted">Ref: {item.product._id}</small><br />
                      <span className="text-success me-2">✔ Click & Collect</span>
                      <span className="text-success">✔ Home Delivery</span>
                    </div>
                    <Button variant="light" size="sm" onClick={() => handleRemove(item.product._id)}>✕</Button>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <span className="me-2 fw-semibold">Qty:</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.product._id, -1)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.product._id, 1)}>+</Button>
                    <div className="ms-auto fw-bold fs-5">
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <Form.Check 
              type="radio"
              label="Home Delivery"
              name="deliveryMethod"
              defaultChecked
              className="mb-2"
            />
            <Form.Check 
              type="radio"
              label="Click & Collect"
              name="deliveryMethod"
              className="mb-3"
            />
            <div className="d-flex justify-content-between">
              <span className="text-muted">Subtotal:</span>
              <span>£{getTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Delivery:</span>
              <span>£0.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>£{getTotal().toFixed(2)}</span>
            </div>
            <Button className="mt-3 btn-success w-100" onClick={() => navigate("/checkout")}>Checkout</Button>
            <small className="text-muted mt-2 text-center d-block">
              This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
            </small>
          </Card>

          <Card className="p-3 mt-4 shadow-sm">
            <h6 className="fw-bold">Delivery Information:</h6>
            <p className="mb-1">Standard Delivery is <strong>2-4 working days</strong>.</p>
            <p className="mb-1">
              <strong>Need it faster?</strong><br />
              You can upgrade to <strong>Next Day Delivery</strong> during Checkout.
            </p>
            <p className="mb-1">
              <strong>Delivery is Monday to Friday, excluding public holidays</strong>.
            </p>
            <p className="mb-1">
              Any orders placed after 10pm Friday and over the weekend will not be dispatched until Monday.
            </p>
            <p className="mb-1">FREE returns to any Smartwear store near you.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
