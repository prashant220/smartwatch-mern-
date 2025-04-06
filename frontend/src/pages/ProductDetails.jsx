// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-5">Product not found.</div>;
  }

  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row>
            {/* Left thumbnails */}
            <Col
              md={1}
              className="d-none d-md-flex flex-column gap-2 align-items-center"
            >
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt="thumb"
                  className={`img-thumbnail border-0 shadow-sm ${
                    selectedImage === product.image ? "border border-dark" : ""
                  }`}
                  style={{ width: 50, cursor: "pointer" }}
                  onClick={() => setSelectedImage(product.image)}
                />
              ))}
            </Col>

            {/* Main image */}
            <Col md={5} className="text-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded shadow"
                style={{ maxHeight: 480, objectFit: "contain" }}
              />
            </Col>

            {/* Product details */}
            <Col md={6}>
              <h4 className="fw-bold mb-2">{product.name}</h4>
              <Badge bg="warning" text="dark" className="mb-3">
                Customizable
              </Badge>

              <div className="mb-3">
                <h3 className="text-dark fw-bold">${product.price}</h3>
                <small className="text-muted">
                  (Discount for bulk orders available)
                </small>
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Color:</h6>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="rounded-circle p-2"
                    style={{ backgroundColor: "#000" }}
                  ></Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-circle p-2"
                    style={{ backgroundColor: "#eee" }}
                  ></Button>
                </div>
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Size:</h6>
                <div className="d-flex gap-2">
                  <Button variant="outline-dark" size="sm">
                    42mm
                  </Button>
                  <Button variant="outline-dark" size="sm">
                    44mm
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-muted">{product.description}</p>

              <div className="d-grid gap-2 mt-3">
                <Button variant="dark" className="px-4 py-2 rounded-pill">
                  Add to Cart
                </Button>
                <Button
                  variant="outline-primary"
                  className="px-4 py-2 rounded-pill"
                >
                  Buy Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <RelatedProducts/>
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
