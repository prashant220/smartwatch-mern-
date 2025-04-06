// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { user, token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
 const navigate=useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${user._id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setCart(res.data);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    if (user && token) fetchCart();
  }, [user, token]);

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${user._id}/${productId}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    const item = cart.items.find((item) => item.product._id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) return handleRemove(productId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId,
          quantity: delta,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Quantity update error:", err);
    }
  };

  const getTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Your Cart</h3>
      <Row>
        {cart.items.map((item) => (
          <Col md={4} key={item.product._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.product.image} />
              <Card.Body>
                <Card.Title>{item.product.name}</Card.Title>
                <Card.Text>
                  Quantity:
                  <Button
                    size="sm"
                    variant="light"
                    onClick={() => handleQuantityChange(item.product._id, -1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={() => handleQuantityChange(item.product._id, 1)}
                  >
                    +
                  </Button>
                </Card.Text>
                <Card.Text>Price: ${item.product.price}</Card.Text>
                <Card.Text>
                  Total: ${item.quantity * item.product.price}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {cart.items.length > 0 && (
        <div className="mt-4 text-end">
          <h4>Total: ${getTotal().toFixed(2)}</h4>
          <Button variant="success" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </Container>
  );
}
