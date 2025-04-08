// src/components/ProductCard.jsx
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { user, token } = useAuth();
  const{addToCart}=useCart();
  const handleAddToCart = async () => {
    if (!user || !token) {
      alert('Please log in to add items to your cart.');
      return;
    }
  
    try {
      await addToCart(product); // ✅ pass product here
      alert('Product added to cart!');
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add product to cart.');
    }
  };
  

  return (
    <Card className="product-card border-0 p-2" style={{ borderRadius: '12px' }}>
      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
        <div className="overflow-hidden rounded">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="w-100"
            style={{ height: '320px', objectFit: 'contain' }}
          />
        </div>
        <Card.Body>
          <small className="text-uppercase text-muted fw-semibold">{product.brand || 'Brand'}</small>
          <Card.Title className="fs-6 fw-bold mt-1 mb-2">
            {product.name.length > 60 ? product.name.slice(0, 60) + '...' : product.name}
          </Card.Title>

          <div className="d-flex justify-content-between align-items-center">
            <span className="text-dark fw-bold">${product.price.toFixed(2)}</span>
            <Button
              variant="outline-dark"
              size="sm"
              className="rounded-pill px-3 py-1"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}
