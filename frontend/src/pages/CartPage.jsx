// src/pages/CartPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { user, token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`, {
        headers: { 'x-auth-token': token }
      });
      setCart(res.data);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) fetchCart();
  }, [user, token]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${user.id}/${productId}`, {
        headers: { 'x-auth-token': token }
      });
      fetchCart();
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedItems = cart.items.map(item => {
      if (item.product._id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart({ ...cart, items: updatedItems });
  };

  const total = cart?.items?.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Cart</h2>
      {cart?.items?.length > 0 ? (
        <>
          {cart.items.map(item => (
            <Card className="mb-3" key={item.product._id}>
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <img src={item.product.image} alt={item.product.name} className="img-fluid rounded" />
                  </Col>
                  <Col md={6}>
                    <h5>{item.product.name}</h5>
                    <p className="text-muted">${item.product.price}</p>
                  </Col>
                  <Col md={4} className="d-flex align-items-center justify-content-end gap-2">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.product._id, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.product._id, 1)}>+</Button>
                    <Button variant="danger" onClick={() => handleRemove(item.product._id)}>Remove</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <h4>Total: ${total.toFixed(2)}</h4>
          <Button variant="success" className="mt-3">Proceed to Checkout</Button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
}
