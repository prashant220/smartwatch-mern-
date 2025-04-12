// src/components/NavigationBar.jsx
import { Navbar, Nav, Container, Badge, Dropdown, Image, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { FaShoppingCart } from 'react-icons/fa';



export default function NavigationBar({onProductsClick }) {
  const { user, logout,token } = useAuth();
  const { cartItems, fetchCart } = useCart();
  const navigate = useNavigate();
  const badgeRef = useRef();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
       window.location.reload() 
      }
    }
  }, [token]);
  const handleCartClick = () => {
    if (!user) {
      alert('Please log in to view your cart.');
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldRefresh(prev => !prev);
    }, 2000);
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
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom py-3 shadow-sm">
      <Container>
     
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-4">Smartwear</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} onClick={onProductsClick}  className="text-white fw-semibold">Products</Nav.Link>
            <Nav.Link as={Link} className="text-white fw-semibold" to="/contact">Contact</Nav.Link>
          </Nav>

          
          <Nav className="align-items-center gap-3">
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-cart" className="position-relative">
              <FaShoppingCart className="fs-5 text-white" />
                <Badge ref={badgeRef} bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
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
              <NavDropdown title={<FaUserCircle className="text-white fs-4" />} id="user-nav" align="end">
                <NavDropdown.Item disabled>Welcome, {user.name.split(' ')[0]}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white fw-semibold">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-danger px-3 py-1 text-white rounded-pill">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
