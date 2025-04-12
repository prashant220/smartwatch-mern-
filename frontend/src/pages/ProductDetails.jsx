// src/pages/ProductDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import NavigationBar from "../components/NavigationBar";

export default function ProductDetails({ product }) {
  const { id } = useParams();
  const { user, token } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [products, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!user || !token) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    if (!products || !products._id) {
      alert("Product data not available yet.");
      return;
    }
  
    try {
      const existingItem = cartItems.find(
        (item) => item.product._id === products._id
      );
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
  
      await addToCart(products, newQuantity);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add product to cart.");
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!products) {
    return <div className="text-center py-5">Product not found.</div>;
  }
  console.log(products);

 return (
  <>
    <NavigationBar />
    <section className="py-5 bg-light">
      <Container>
        <Row className="g-5 align-items-start">
          {/* Thumbnails */}
          <Col md={1} className="d-none d-md-flex flex-column gap-3">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={`http://localhost:5000/${products.image}`}
                alt={`thumb-${i}`}
                className={`img-thumbnail p-1 rounded shadow-sm ${
                  selectedImage === `http://localhost:5000/${products.image}` ? "border border-dark" : ""
                }`}
                style={{ width: 55, height: 55, cursor: "pointer", objectFit: "cover" }}
                onClick={() => setSelectedImage(`http://localhost:5000/${products.image}`)}
              />
            ))}
          </Col>

          {/* Main image */}
          <Col md={5} className="text-center">
            <img
              src={`http://localhost:5000/${products.image}`}
              alt={products.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: 500, objectFit: "contain", borderRadius: "10px" }}
            />
          </Col>

          {/* Details */}
          <Col md={6}>
            <h2 className="fw-bold mb-3 text-dark">{products.name}</h2>
            <Badge bg="warning" text="dark" className="mb-3 px-3 py-1 rounded-pill">
              Customizable
            </Badge>

            <div className="mb-3">
              <h3 className="fw-bold text-success">${products.price}</h3>
              <small className="text-muted">(Discount for bulk orders available)</small>
            </div>

            <div className="mb-3">
              <h6 className="fw-semibold mb-1">Size:</h6>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm">42mm</Button>
                <Button variant="outline-secondary" size="sm">44mm</Button>
              </div>
            </div>

            <p className="mt-4 text-muted" style={{ lineHeight: 1.6 }}>{products.description}</p>

            <div className="d-grid gap-2 mt-4">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                variant="dark"
                className="px-4 py-2 rounded-pill fw-semibold"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => navigate("/checkout")}
                variant="outline-primary"
                className="px-4 py-2 rounded-pill fw-semibold"
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <RelatedProducts />
    <Testimonials />
    <Newsletter />
    <Footer />
  </>
);
}
