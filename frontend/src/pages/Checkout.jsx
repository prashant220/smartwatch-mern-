// src/pages/Checkout.jsx
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

export default function Checkout() {
  const { user, token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zip: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`, {
          headers: { 'x-auth-token': token }
        });
        setCart(res.data);
      } catch (err) {
        console.error('Cart fetch error:', err);
      }
    };
    if (user && token) fetchCart();
  }, [user, token]);

  const getTotal = () => cart.items.reduce((total, item) => total + item.quantity * (item.product?.price || 0), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const shippingInfo = form;
      const total = getTotal();
  
      await axios.post('http://localhost:5000/api/orders/place', {
        shippingInfo,
        total
      }, {
        headers: { 'x-auth-token': token }
      });
  
      alert('Order submitted successfully!');
      navigate('/order-success');
    } catch (err) {
      console.error('Order error:', err);
      alert('Failed to place order.');
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
        quantity: newQty  // 🔧 Send new total quantity instead of delta
      }, {
        headers: { 'x-auth-token': token }
      });
  
      setCart(res.data);
    } catch (err) {
      console.error('Quantity update error:', err.response?.data || err.message);
    }
  };
  

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/remove/${user._id}/${productId}`, {
        headers: { 'x-auth-token': token }
      });
      setCart(res.data);
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  return (
    <>
    <NavigationBar/>
     <Container className="py-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <Row>
        <Col md={7}>
          <Card className="p-4 shadow-sm">
            <h5 className="mb-4">Shipping Information</h5>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country" value={form.country} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" value={form.city} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value={form.state} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formZip">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control type="text" name="zip" value={form.zip} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formCheck" className="mb-3">
                <Form.Check type="checkbox" label="I agree to the terms and conditions" required />
              </Form.Group>
              <Button type="submit" className="w-100 btn-dark">Place Order</Button>
            </Form>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h5 className="mb-3">Review Your Cart</h5>
            {cart.items.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-2">
                <div className="flex-grow-1">
                  <strong>{item.product?.name || 'Product Name'}</strong>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <Button size="sm" variant="outline-secondary" onClick={() => handleQuantityChange(item.product._id, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleQuantityChange(item.product._id, 1)}>+</Button>
                  </div>
                  <small className="text-muted">${(item.product?.price || 0).toFixed(2)} each</small>
                </div>
                <div className="text-end">
                  <div>${(item.quantity * (item.product?.price || 0)).toFixed(2)}</div>
                  <Button size="sm" variant="danger" onClick={() => handleRemove(item.product._id)}>Remove</Button>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <div>Total</div>
              <div>${getTotal().toFixed(2)}</div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
   
  );
}
