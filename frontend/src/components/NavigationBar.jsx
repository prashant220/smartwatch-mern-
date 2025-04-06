// src/components/NavigationBar.jsx
import { Navbar, Nav, Container, Badge, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useEffect, useRef, useState } from 'react';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const { cartItems, fetchCart } = useCart();
  const navigate = useNavigate();
  const badgeRef = useRef();
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleCartClick = () => {
    if (!user) {
      alert('Please log in to view your cart.');
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  // useEffect(() => {
  //   if (user?._id) {
  //     fetchCart(user._id);
  //   }
  // }, [user, shouldRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldRefresh(prev => !prev);
    }, 2000); // Polling every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (badgeRef.current) {
      badgeRef.current.classList.add('animate__animated', 'animate__bounceIn');
      const timer = setTimeout(() => {
        badgeRef.current.classList.remove('animate__bounceIn');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Smartwear</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-cart" style={{ position: 'relative' }}>
                Cart{' '}
                <Badge ref={badgeRef} bg="warning" text="dark" pill style={{ position: 'absolute', top: 2, right: -10 }}>
                  {totalItems}
                </Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: '300px' }}>
                {cartItems.length === 0 ? (
                  <Dropdown.Item disabled>Your cart is empty</Dropdown.Item>
                ) : (
                  cartItems.slice(0, 3).map((item) => (
                    <Dropdown.Item key={item.product?._id || item._id} className="d-flex align-items-center gap-2">
                      <Image src={item.product?.image} alt={item.product?.name} width={40} height={40} rounded />
                      <div className="flex-grow-1">
                        <div className="fw-semibold small">{item.product?.name || 'Item'}</div>
                        <div className="text-muted small">${item.product?.price} x {item.quantity}</div>
                      </div>
                    </Dropdown.Item>
                  ))
                )}
                {cartItems.length > 0 && (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item disabled className="text-end">
                      Subtotal: <strong>${subtotal.toFixed(2)}</strong>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleCartClick} className="text-center text-primary">View Cart</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {user ? (
              <>
                <Nav.Link disabled>Welcome, {user.name.split(' ')[0]}</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
